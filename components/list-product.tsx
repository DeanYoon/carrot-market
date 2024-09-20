import { formatToTimeAgo, formatToWon } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface ListProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function ListProduct({
  title,
  price,
  created_at,
  photo,
  id,
}: ListProductProps) {
  return (
    <Link href={`/products/${id}`} className="flex gap-5">
      <div className="relative size-40 rounded-md overflow-hidden">
        <Image
          src={photo}
          fill
          className=" object-cover"
          alt={title}
          quality={10}
        />
      </div>
      <div className="flex flex-col gap-1 *:text-white">
        <span className="text-xl font-bold">{title}</span>
        <span className="text-sm">
          {formatToTimeAgo(created_at.toString())}
        </span>
        <span className="text-xl font-bold">{formatToWon(price)}</span>
      </div>
    </Link>
  );
}
