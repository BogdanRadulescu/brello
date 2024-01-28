import { authAdminClient } from "./authConfig";
import axios from "axios";

export type EmailSigninRequest = {
    email: string,
    password: string
};

export type AuthCustomClaims = {
    isAdmin: boolean,
    isRecruiter: boolean,
} & EmailSigninRequest;

export type IdAndRefreshToken = {
    idToken: string,
    refreshToken: string,
}

export const getIdAndRefreshToken = async (request: EmailSigninRequest): Promise<IdAndRefreshToken | undefined> => {
    try {
        const existingUser = await authAdminClient.getUserByEmail(request.email);
        if (!existingUser) {
            return undefined;
        }

        const customClaims = {
            ...request,
            isAdmin: false,
            isRecruiter: false,
            appName: "brello"
        } as AuthCustomClaims;
        

        const customToken = await authAdminClient.createCustomToken(existingUser.uid, customClaims);;

        return await exchangeCustomTokenForIdAndRefreshToken(customToken);
    } catch (_) {
        return undefined;
    }

}

const exchangeCustomTokenForIdAndRefreshToken = async (token: string): Promise<IdAndRefreshToken | undefined> => {
    const tokens = await axios.post<IdAndRefreshToken>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_WEB_KEY}`, {
        token,
        returnSecureToken: true
    });

    return tokens.data;
}

export const validateIdTokenAndRefresh = async (tokens: IdAndRefreshToken): Promise<IdAndRefreshToken | undefined> => {
    let idToken = tokens.idToken
    let refreshToken = tokens.refreshToken;

    if (idToken) {
        try {
            await authAdminClient.verifyIdToken(idToken, true);
        } catch(_) {
            return undefined;
        }
    } else if (refreshToken) {
        try {
            const response = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_WEB_KEY}`, {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });

            if (response.status === 200) {
                idToken = response.data["id_token"];
            } else {
                return undefined;
            }
        } catch(_) { 
            return undefined;
        }
    } else {
        return undefined;
    }

    return {
        idToken: idToken ?? "",
        refreshToken: refreshToken ?? ""
    };
}