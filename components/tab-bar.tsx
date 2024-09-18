"use client";
import {
  NewspaperIcon as OutlineNewspaperIcon,
  HomeIcon as OutlineHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as OutlineChatIcon,
  VideoCameraIcon as OutlineLiveIcon,
  UserIcon as OutlineUserIcon,
} from "@heroicons/react/24/outline";
import {
  NewspaperIcon as SolidNewspaperIcon,
  HomeIcon as SolidHomeIcon,
  ChatBubbleOvalLeftEllipsisIcon as SolidChatIcon,
  VideoCameraIcon as SolidLiveIcon,
  UserIcon as SolidUserIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TabBar() {
  const pathname = usePathname();
  // console.log(pathname);
  return (
    <div className="fixed  bottom-0  border-neutral-200 w-full mx-auto max-w-screen-md grid  grid-cols-5 border-t px-5 py-3 *:text-white">
      <Link href="/products" className="flex flex-col  items-center ">
        {pathname === "/products" ? (
          <SolidHomeIcon className=" w-7" />
        ) : (
          <OutlineHomeIcon className=" w-7" />
        )}
        <span>Home</span>
      </Link>
      <Link className="flex flex-col  items-center " href="/life">
        {pathname === "/life" ? (
          <SolidNewspaperIcon className=" w-7" />
        ) : (
          <OutlineNewspaperIcon className=" w-7" />
        )}
        <span>Life</span>
      </Link>
      <Link className="flex flex-col  items-center " href="/chat">
        {pathname === "/chat" ? (
          <SolidChatIcon className=" w-7" />
        ) : (
          <OutlineChatIcon className=" w-7" />
        )}
        <span>Chat</span>
      </Link>
      <Link className="flex flex-col  items-center " href="/live">
        {pathname === "/live" ? (
          <SolidLiveIcon className=" w-7" />
        ) : (
          <OutlineLiveIcon className=" w-7" />
        )}
        <span>Live</span>
      </Link>
      <Link className="flex flex-col  items-center " href="/profile">
        {pathname === "/profile" ? (
          <SolidUserIcon className=" w-7" />
        ) : (
          <OutlineUserIcon className=" w-7" />
        )}
        <span>Profile</span>
      </Link>
    </div>
  );
}
