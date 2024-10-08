import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });

    return user;
  }
  notFound();
}

export default async function Profile() {
  const user = await getUser();

  const logOut = async () => {
    //인라인 이므로 use server 사용
    "use server";
    const session = await getSession();
    await session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>welcome {user?.username}</h1>
      <form action={logOut}>
        <button>Logout</button>
      </form>
    </div>
  );
}
