import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { BsBookmark, BsBookmarkCheckFill } from "react-icons/bs";
import type { Product, ProductCardType } from "../../constants/productTypes";

const ProductCard = (props: ProductCardType) => {
  const { product } = props;
  const { data: session } = useSession();
  const router = useRouter();

  return (
    // w-1/3
    <div
      className="lg:flex-auto lg:w-2/12"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="">
        <div key={product.id} className=" h-80">
          {/* <Link href={`/products/${product.id}`} key={product.id}> */}
          <div
            key={product.id}
            className="relative w-full h-72 overflow-hidden"
          >
            <Image
              src={product.img}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              loading="lazy"
              className="cursor-pointer hover:scale-105 duration-300 scale-100 object-cover pb-11"
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("hover:scale-110");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("hover:scale-105");
              }}
            />
            <h3 className="absolute left-0 bottom-5 text-xs font-semibold text-[#222]">
              {product.type}
            </h3>
            <h2 className="absolute left-0 bottom-0 text-sm font-light text-[#222]">
              {product.name}
            </h2>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
