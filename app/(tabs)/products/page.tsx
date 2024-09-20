import ListProduct from "@/components/list-product";
import ProductList from "@/components/product-list";
import db from "@/lib/db";
import { PlusIcon } from "@heroicons/react/20/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";

async function InitialProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 10,
    orderBy: {
      created_at: "desc",
    },
  });
  return products;
}

export type initialProducts = Prisma.PromiseReturnType<typeof InitialProducts>;

export default async function Products() {
  const initialProducts = await InitialProducts();
  return (
    <div className="p-5">
      <ProductList initialProducts={initialProducts} />

      <Link
        href="/products/add"
        className=" bg-orange-500 flex items-center justify-center rounded-full size-16 fixed  bottom-24  right-8 text-white hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
