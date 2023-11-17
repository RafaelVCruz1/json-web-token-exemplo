'use server'
import { NextResponse } from "next/server";
import { validateToken } from "./app/functions/validateToken";
import Dashboard from "./app/pages/dashboard/page";

export const middleware = async (request) => {

    const token = request.cookies.get('token')?.value;
    const urlLogin = new URL('/', request.url);
    const isTokenValidated = await validateToken(token);
    const urDashboard = new URL('/pages/dashboard', request.url)
    const urRegister = new URL('/pages/register', request.url)
    const urAlter = new URL('/pages/alter', request.url)

    if (!isTokenValidated || !token) {
        if (request.nextUrl.pathname === '/pages/dashboard'  || request.nextUrl.pathname === '/pages/alter' || request.nextUrl.pathname === '/pages/register') {
            return NextResponse.redirect(urlLogin);
        }
    }

    if (isTokenValidated){
        if(request.nextUrl.pathname === '/') {
            return NextResponse.redirect(urDashboard);
        }
    }
    NextResponse.next();
};
export const config = {
    matcher: ['/', '/pages/dashboard', '/pages/register', '/pages/alter']
};

