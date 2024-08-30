'use server'

import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import { z } from "zod";


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
})

export async function login(prevState: any, formData: FormData) {

    const data = {
        email: formData.get("email"),
        password: formData.get("password")
    }

    const result = formSchema.safeParse(data)
    if (!result.success) {
        // console.log(result.error.flatten())
        return {
            fieldErrors: result.error.flatten().fieldErrors,
            errors: [] // Ensure errors array is always present
        };
    } else {
        console.log(result.data)
    }
    return {
        errors: ["wrong password", "password too short"],
    };
}
