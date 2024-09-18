"use server";



import twilio from "twilio"
import { z } from "zod"
import validator from "validator"
import { redirect } from "next/navigation"; // Import the correct redirect function for server actions
import db from "@/lib/db";
import crypto from "crypto"
import loginUser from "@/lib/login";
const phoneSchema = z.string().trim().refine(phone => validator.isMobilePhone(phone, "ja-JP"), "Wrong phone format")


async function tokenExists(token: number) {
    const exists = await db.sMSToken.findUnique({
        where: {
            token: token.toString()
        },
        select: {
            id: true
        }
    })
    return Boolean(exists)
}

const tokenSchema = z.coerce.number().min(100000).max(999999).refine(tokenExists, "This token does not exists")//string을 number로 강제



interface ActionState {
    token: boolean
}


async function getToken() {
    const token = crypto.randomInt(100000, 999999).toString()
    const exists = await db.sMSToken.findUnique({
        where: { token },
        select: {
            id: true
        }
    })
    if (exists) {
        return getToken()
    }
    return token
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
    const phone = formData.get("phone")
    const token = formData.get("token")

    if (!prevState.token) {
        // Validate phone number
        const result = phoneSchema.safeParse(phone);
        if (!result.success) {
            return { token: false, error: result.error.flatten() };
        }

        //delete prev tokens
        await db.sMSToken.deleteMany({
            where: {
                user: {
                    phone: result.data
                }
            }
        })
        //create a token
        const token = await getToken()
        await db.sMSToken.create({
            data: {
                token,
                user: {
                    connectOrCreate: {
                        where: {
                            phone: result.data // 이 번호가 없으면 생성한다
                        },
                        create: {
                            username: crypto.randomBytes(10).toString("base64"),
                            phone: result.data
                        }

                    }
                }
            }
        })
        //send token using twilio
        const client = twilio(
            process.env.TWILIO_ACOUNT_SID,
            process.env.TWILIO_AUTH_TOKEN,
        )
        await client.messages.create({
            body: `Your Carrot Verification code is : ${token}`,
            from: process.env.TWILIO_PHONE_NUMBER!,
            to: process.env.MY_PHONE_NUMBER! //result.data
        })
        return { token: true };
    }

    // Validate token
    const result = await tokenSchema.safeParseAsync(token);
    if (!result.success) {
        return { token: true, error: result.error.flatten() };
    }

    //get the userId of token
    const smsToken = await db.sMSToken.findUnique({
        where: {
            token: result.data.toString()
        },
        select: {
            id: true,
            userId: true
        }
    })

    //생성한 데이터 삭제 
    await db.sMSToken.deleteMany({
        where: {
            id: smsToken?.id
        }
    })
    // log the user in
    await loginUser(smsToken)

}