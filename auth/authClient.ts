import { authAdminClient } from "./authConfig";
import axios from "axios";

export type EmailSigninRequest = {
    username: string,
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
        const existingUser = await authAdminClient().getUserByEmail(request.username);
        if (!existingUser) {
            return undefined;
        }

        const customClaims = {
            ...request,
            isAdmin: false,
            isRecruiter: false,
        } as AuthCustomClaims;

        const customToken = await authAdminClient().createCustomToken(existingUser.uid, customClaims);;

        return await exchangeCustomTokenForIdAndRefreshToken(customToken);
    } catch (_) {
        return undefined;
    }

}

const exchangeCustomTokenForIdAndRefreshToken = async (token: string): Promise<IdAndRefreshToken | undefined> => {
    const tokens = await axios.post<IdAndRefreshToken>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${process.env.FIREBASE_API_KEY}`, {
        token,
        returnSecureToken: true
    });

    return tokens.data;
}