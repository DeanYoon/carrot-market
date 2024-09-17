import { getPublicEmail, getUserProfile } from "@/app/utils/githubUtils";
import db from "@/lib/db";
import loginUser from "@/lib/login";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code")
    if (!code) return notFound()

    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code
    }).toString()
    const accessTokenUrl = `https://github.com/login/oauth/access_token?${accessTokenParams}`

    const accessTokenResponse = await fetch(accessTokenUrl, {
        method: "POST",
        headers: {
            Accept: "application/json"
        }
    })
    const { error, access_token } = await accessTokenResponse.json()


    if (error) {
        return new Response(null, {
            status: 400
        })
    }



    const { id, avatar_url, login } = await getUserProfile(access_token)
    const githubId = id.toString();
    //이미 유저인지
    const user = await db.user.findUnique({
        where: {
            github_id: githubId
        },
        select: {
            id: true
        }
    })

    if (user) {
        await loginUser(user)
    }

    //새 유저라면 생성
    //근데 깃헙 이름이 이미 유저가 사용중이라면?


    const email = await getPublicEmail(access_token)
    const sameUser = await db.user.findUnique({
        where: {
            username: login
        },
        select: {
            id: true
        }
    })


    const newUser = await db.user.create({
        data: {
            username: sameUser ? login + githubId : login,
            github_id: githubId,
            avatar: avatar_url,
            email
        },
        select: {
            id: true
        }
    })

    await loginUser(newUser)







}

