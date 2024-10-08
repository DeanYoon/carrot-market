import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function SocialLogin() {
  return (
    <>
      <div className="w-full h-px bg-neutral-500" />
      <div className="flex flex-col gap-3">
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/github/start"
        >
          <span>
            <FaGithub className=" size-6" />
          </span>
          <span>Sign up with Github</span>
        </Link>
        <Link
          className="primary-btn flex h-10 items-center justify-center gap-3"
          href="/sms"
        >
          <span>
            <ChatBubbleOvalLeftEllipsisIcon className=" size-6" />
          </span>
          <span>Sign up with SMS</span>
        </Link>
      </div>
    </>
  );
}
