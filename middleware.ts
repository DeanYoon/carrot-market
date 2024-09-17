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
    "/create-account": true,
    "/github/start": true,
    "/github/complete": true
}


//이름 매우 중요 midddleware, config
export async function middleware(request: NextRequest) {
    const session = await getSession()
    const exists = publicOnlyUrls[request.nextUrl.pathname]

    if (!session.id) {
        if (!exists) {
            return NextResponse.redirect(new URL("/", request.url))
        }
    }
    else {
        if (exists) {
            return NextResponse.redirect(new URL("/profile", request.url))
        }
    }
}


//middleware는 모든 request에서 실행
//따라서  matcher 를 통해 특정 request에선 실행되지 않도록 한다
export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"]
}
