import { validateIdTokenAndRefresh } from "auth/authClient";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
    const tokens = await request.json();
    const IdAndRefreshToken = await validateIdTokenAndRefresh(tokens);

    if (!IdAndRefreshToken) {
        return NextResponse.json({
            error: "Invalid credentials"
        }, { 
            status: 401,
        });
    }

    const response = NextResponse.json({}, { status: 200 });
    response.cookies.set("idToken", IdAndRefreshToken.idToken);
    response.cookies.set("refreshToken", IdAndRefreshToken.refreshToken);

    return response;
}