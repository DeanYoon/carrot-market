import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
    id?: number
}

export default function getSession() {

    return getIronSession<SessionContent>(cookies(), {
        cookieName: "delicious-carrot",
        password: process.env.COOKIE_PASSWORD!// ! --> 무조건 env에 존재한다는 뜻
    })
}      