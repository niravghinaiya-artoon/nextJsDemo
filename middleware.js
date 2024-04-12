import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { commonRoutes } from "routes/common-routes";
import { publicRoutes } from "routes/public-routes";
import { privateRoutes } from "routes/private-routes";

const isPathNameValid = (pathName) => {
    return commonRoutes.some(route => {
        const regexPattern = route.replace(/:[^/]+/g, '[^/]+').replace(/\//g, '\\/');
        const regex = new RegExp(`^${regexPattern}$`);
        return regex.test(pathName);
    });
};

export async function middleware(request) {

    const { pathname } = request.nextUrl;

    const token = await getToken({ req: request });

    if (isPathNameValid(pathname)) return NextResponse.next();

    if (!!token && publicRoutes.includes(pathname)) return NextResponse.redirect(new URL('/', request.url))

    for (const r of privateRoutes) {

        if (pathname.startsWith(r)) {

            if (!token) return NextResponse.redirect(new URL('/login', request.url))
            else return NextResponse.next();

        }

    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}