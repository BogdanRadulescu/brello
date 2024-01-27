import { EmailSigninRequest, getIdAndRefreshToken } from "auth/authClient";
import { NextResponse } from "next/server";

export default async function Login() {
    let error = "";

    const tryLogin = async (formData: FormData) => {
        'use server'
        const signinRequest: EmailSigninRequest = {
            username: formData.get("username")?.valueOf() as string,
            password: formData.get("password")?.valueOf() as string
        };
    
        const idAndRefreshToken = await getIdAndRefreshToken(signinRequest);
        if (!idAndRefreshToken) {
            return;
        }

        const response = NextResponse.redirect("/app");
        response.cookies.set("idToken", idAndRefreshToken.idToken);
        response.cookies.set("refreshToken", idAndRefreshToken.refreshToken);

        return response;
    }

    return <>
        <div>{error}</div>
        <form action={tryLogin}>
            <label htmlFor="username">Username</label><br/>
            <input type="text" id="username" name="username"/><br/>
            <label htmlFor="password">Password</label><br/>
            <input type="text" id="password" name="password"/><br/>
            <button type="submit">Login</button>
        </form>
    </>;
}