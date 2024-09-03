'use server'

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt"
import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";
import getSession from "@/lib/session";


const checkEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email
        },
        select: {
            id: true
        }
    })
    return Boolean(user)
}

const formSchema = z.object({
    email: z.string().email().refine(checkEmail, "Email not exists"),
    password: z.string()
    // .min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }
    const result = await formSchema.safeParseAsync(data)
    if (!result.success) {
        return result.error.flatten()

    }
    const user = await db.user.findUnique({
        where: {
            email: result.data.email
        },
        select: {
            id: true,
            password: true
        }
    })
    const passwordMatch = await bcrypt.compare(result.data.password, user!.password ?? "")
    if (passwordMatch) {
        const session = await getSession()
        session.id = user!.id

        await session.save()
        return redirect('/profile')
    } else {
        return {
            fieldErrors: {
                password: ["Wrong password."],
                email: [],
            },
        };
    }
}
