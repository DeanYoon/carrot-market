import Image from "next/image";
import Link from "next/link";
import "@/lib/db";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8">
      <div className=" my-auto flex flex-col items-center *:font-medium gap-2">
        <span className="text-8xl">🥕</span>
        <h1 className="text-4xl">당근</h1>
        <h2 className=" text-2xl">당근 마켓에 요오코소</h2>
      </div>
      <div className="flex flex-col items-center gap-3 w-full">
        <Link href="/create-account" className="primary-btn">
          Start
        </Link>
        <div className="flex gap-2">
          <span>Already have an account?</span>
          <Link href={"/login"} className="hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
