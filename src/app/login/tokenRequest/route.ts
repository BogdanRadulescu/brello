import { EmailSigninRequest, getIdAndRefreshToken } from "auth/authClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const signinRequest = (await request.json()) as EmailSigninRequest;

    const idAndRefreshToken = await getIdAndRefreshToken(signinRequest);
    if (!idAndRefreshToken) {
        return NextResponse.json({
            "error": "Error fetching auth tokens"
        }, { status: 401 });
    }

    const response = NextResponse.redirect("/app");
    response.cookies.set("idToken", idAndRefreshToken.idToken);
    response.cookies.set("refreshToken", idAndRefreshToken.refreshToken);

    return response;
}