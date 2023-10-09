import Image from "next/image";
import Link from "next/link";
import type { Product, ProductCardType } from "../../constants/productTypes";

const ProductCard2 = (props: ProductCardType) => {
  const { product } = props;

  return (
    // w-1/3
    <div className="w-44">
      <div>
        <div key={product.id}>
          <Link href={`/products/${product.id}`} key={product.id}>
            <div key={product.id}>
              <Image
                src={product.img}
                alt={product.name}
                width="400"
                height="300"
                className="h-60 w-full"
                loading="lazy"
              />
              <h3 className="text-xs font-semibold text-[#222] pt-2">
                {product.type}
              </h3>
              <h2 className="text-[#222] text-sm font-light md:text-sm lg:text-sm xl:text-sm">
                {product.name}
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
