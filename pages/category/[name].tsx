import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";

export default function CategoryItemList({ categoryProducts }) {
  const router = useRouter();
  const category = router.query.name.toUpperCase();

  return (
    <div className="w-full px-2 py-12 text-center">
      <h1>카테고리</h1>
      <h2 className="pb-16 pt-4 font-semibold">{category}</h2>
      <div className="w-4/5 grid grid-cols-3 gap-3 mx-auto text-center">
        {categoryProducts.map((product) => (
          <div className="py-3" key={product.id}>
            <Image
              src={product.img}
              alt={product.name}
              width="380"
              height="450"
              className="hover:scale-105 duration-300"
              priority
            />
            <div className="text-xs font-extrabold mt-3">{product.type}</div>
            <div className="text-base text-[#4d4f48] pt-1">{product.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async (req) => {
  const categoryName = req.query.name;
  const res = await axios.get(
    `http://localhost:3000/api/category/${categoryName}`
  );

  const { data } = await res.data;
  return {
    props: {
      categoryProducts: data,
    },
  };
};
