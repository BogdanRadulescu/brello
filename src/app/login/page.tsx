import { EmailSigninRequest, getIdAndRefreshToken } from "auth/authClient";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Login() {
    let error = "";

    const tryLogin = async (formData: FormData) => {
        'use server'
        const signinRequest: EmailSigninRequest = {
            email: formData.get("email")?.valueOf() as string,
            password: formData.get("password")?.valueOf() as string
        };
    
        const idAndRefreshToken = await getIdAndRefreshToken(signinRequest);
        if (!idAndRefreshToken) {
            return;
        }

        cookies().set("idToken", idAndRefreshToken.idToken);
        cookies().set("refreshToken", idAndRefreshToken.refreshToken);

        redirect("/app");
    }

    return <>
        <div>{error}</div>
        <form action={tryLogin}>
            <label htmlFor="email">Email</label><br/>
            <input type="email" id="email" name="email"/><br/>
            <label htmlFor="password">Password</label><br/>
            <input type="password" id="password" name="password"/><br/>
            <button type="submit">Login</button>
        </form>
    </>;
}