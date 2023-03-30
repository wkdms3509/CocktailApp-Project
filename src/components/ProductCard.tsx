import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCardType } from "../constants/productTypes";

const ProductCard = (props: ProductCardType) => {
  const { product } = props;

  return (
    <div className="w-1/3 px-2 pb-12">
      <div className="">
        <div key={product.id}>
          <Link href={`/`} key={product.id}>
            <div className="" key={product.id}>
              <Image
                src={product.img}
                alt={product.name}
                width={400}
                height={500}
                className="hover:scale-105 duration-300"
                priority
              />
              <h3 className="text-xs text-[#4d4f48] pt-1">{product.type}</h3>
              <h2 className="text-base font-extrabold">{product.name}</h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
