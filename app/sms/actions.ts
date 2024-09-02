"use server";

import { z } from "zod"
import validator from "validator"
import { redirect } from "next/navigation"; // Import the correct redirect function for server actions

const phoneSchema = z.string().trim().refine(phone => validator.isMobilePhone(phone, "ja-JP"), "Wrong phone format")

const tokenSchema = z.coerce.number().min(100000).max(999999)//string을 number로 강제



interface ActionState {
    token: boolean
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
        return { token: true };
    }

    // Validate token
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
        return { token: true, error: result.error.flatten() };
    }
    console.log(phone, token);
    return redirect('/');
}