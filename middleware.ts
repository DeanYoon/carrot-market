import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Routes {
    [key: string]: boolean
}


const publicOnlyUrls: Routes = {
    "/": true,
    "/login": true,
    "/sms": true,
    "/create-account": true
}


//이름 매우 중요

export async function middleware(request: NextRequest) {
    const session = await getSession()
    const exists = publicOnlyUrls[request.nextUrl.pathname]

    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
    if (exists) {
        return NextResponse.redirect(new URL("/products", request.url))

    }

}



export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}
