import { PrismaClient } from "@prisma/client";


const db = new PrismaClient()


async function test() {



    const user = await db.user.create({
        data: {
            username: "123456",
        }
    })
    console.log(user)

    const token = await db.sMSToken.create({
        data: {
            token: "123456",
            user: {
                connect: {
                    id: 4
                }
            }
        }
    })

    // const token = await db.sMSToken.findUnique({
    //     where: {
    //         id: 1
    //     },
    //     include: {
    //         user: true
    //     }
    // })
    // console.log(token)


}

test()

export default db