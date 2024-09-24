"use server"

import { z } from "zod"
import fs from "fs/promises"
import db from "@/lib/db"
import getSession from "@/lib/session"
import { redirect } from "next/navigation"

const productSchema = z.object({
    photo: z.string({
        required_error: "Photo is required"
    }),
    title: z.string(),
    price: z.coerce.number(),
    description: z.string(),
})

export async function uploadProduct(_: any, formData: FormData) {
    const data = {
        photo: formData.get("photo"),
        title: formData.get("title"),
        price: formData.get("price"),
        description: formData.get("description"),
    }

    console.log(data)

    const result = productSchema.safeParse(data)

    if (!result.success) {
        return result.error.flatten()
    } else {

        const session = await getSession()
        if (session.id) {
            const product = await db.product.create({
                data: {
                    title: result.data.title,
                    description: result.data.description,
                    price: result.data.price,
                    photo: result.data.photo,
                    user: {
                        connect: {
                            id: session.id
                        }
                    }
                },
                select: {
                    id: true
                }
            })
            redirect(`/products/${product.id}`)
        }
    }
}




export async function getUploadUrl() {
    const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${process.env.CLOUDFLARE_TOKEN}`
        }
    })

    const data = response.json()
    return data

}