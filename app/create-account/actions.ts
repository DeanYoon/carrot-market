'use server'
import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/lib/constants'
import db from '@/lib/db';
import { redirect } from "next/navigation";
import { z } from 'zod'
import bcrypt from "bcrypt"
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import getSession from '@/lib/session';


const checkPasswords = ({ password, confirm_password }: { password: string, confirm_password: string }) => password === confirm_password


const formSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string()
    // .min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    ,
    confirm_password: z.string()
    // .min(PASSWORD_MIN_LENGTH).max(PASSWORD_MAX_LENGTH)
}).superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            username
        },
        select: {
            id: true
        }
    })
    if (user) {
        ctx.addIssue({
            code: 'custom',
            message: "This username is already taken",
            path: ["username"],
            fatal: true
        })
        return z.NEVER
    }
}).superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    if (user) {
        ctx.addIssue({
            code: 'custom',
            message: "This email is already taken",
            path: ["email"],
            fatal: true
        })
        return z.NEVER
    }
}).refine(checkPasswords, {
    message: "Password Check Failed",
    path: ["confirm_password"]
})


export async function createAccount(prevState: any, formData: FormData) {

    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    }




    const result = await formSchema.safeParseAsync(data)
    if (!result.success) {
        return result.error.flatten()
    } else {
        // hash password
        const hashedPassword = await bcrypt.hash(result.data.password, 12)
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        })

        const session = await getSession()
        session.id = user.id

        await session.save()

        return redirect('/profile')
    }



}