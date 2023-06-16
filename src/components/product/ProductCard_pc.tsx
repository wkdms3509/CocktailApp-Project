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
      className="lg:flex-auto px-2 pb-12 lg:w-1/3"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="">
        <div key={product.id}>
          {/* <Link href={`/products/${product.id}`} key={product.id}> */}
          <div key={product.id} className="relative">
            <Image
              src={product.img}
              alt={product.name}
              width="400"
              height="300"
              className="h-100 w-full scale-100 object-cover hover:scale-105 duration-300 md:w-64 lg:w-96"
              priority
            />
            <h3 className="text-xs font-bold text-[#222] pt-3">
              {product.type}
            </h3>
            <h2 className="text-base text-[#222]">{product.name}</h2>
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
