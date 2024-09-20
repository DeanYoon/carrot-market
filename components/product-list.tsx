"use client";

import { initialProducts } from "@/app/(tabs)/products/page";
import ListProduct from "./list-product";
import { useEffect, useRef, useState } from "react";
import { getMoreProducts } from "@/app/(tabs)/products/actions";

interface ProductListProps {
  initialProducts: initialProducts;
}
export default function ProductList({ initialProducts }: ProductListProps) {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const trigger = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const newProducts = await getMoreProducts(page);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setIsLoading(false);
            setProducts((prev) => [...prev, ...newProducts]);
          } else {
            setIsLastPage(true);
          }
        }
      },
      {
        threshold: 1.0,
        rootMargin: "0px 0px -100px 0px",
      }
    );
    if (trigger.current !== null) {
      observer.observe(trigger.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="flex flex-col gap-5 mb-40">
      {products.map((product) => (
        <ListProduct key={product.id} {...product} />
      ))}

      {!isLastPage && (
        <span
          ref={trigger}
          className="mb-96 text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2  rounded-md hover:opacity-90 active:scale-95"
        >
          {isLoading ? "loading" : "show more"}
        </span>
      )}
    </div>
  );
}
