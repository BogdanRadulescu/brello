"use server"

import { IdAndRefreshToken } from 'auth/authClient';
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const middleware = async (request: NextRequest): Promise<NextResponse> => {
    if (request.nextUrl.pathname === "/") {
        return NextResponse.redirect(new URL('/app', request.url));
    }

    if (request.nextUrl.pathname.startsWith("/app")) {
        const url = new URL('/login/tokenRequest', request.url);
        const body: IdAndRefreshToken = {
            idToken: request.cookies.get("idToken")?.value ?? "",
            refreshToken: request.cookies.get("refreshToken")?.value ?? ""
        };

        const response = await fetch(url, { method: "POST", credentials: "include", body: JSON.stringify(body) });
        if (response.status !== 200) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/:path*',
}