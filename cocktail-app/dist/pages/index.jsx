var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import MainBanner from "@/src/components/MainBanner";
import Catecory from "@/src/components/Catecory";
import AllCocktailList from "@/src/components/AllCocktailList";
import axios from "axios";
import { useSession } from "next-auth/react";
import LoginForm from "@/src/components/user/LoginForm";
import { useSelector } from "react-redux";
import wrapper from "@/src/reducer";
import { initializeItems, } from "@/src/reducer/products";
import { useDispatch } from "react-redux";
import NonAlcCocktailList from "@/src/components/product/NonAlcCocktailList";
export default function Home({ allProductList }) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
    const store = useSelector((state) => state.products.products);
    return (<>
      {status === "authenticated" ? (<div className="w-full mx-auto">
          <section>
            <MainBanner />
          </section>
          <section className="px-3 py-5">
            <Catecory />
          </section>
          <section className="p-3 md:p-5 lg:p-32">
            <AllCocktailList allProductList={store}/>
          </section>
          <section className="p-3 md:p-5 lg:p-32 md:hidden">
            <NonAlcCocktailList allProductList={store}/>
          </section>
        </div>) : (<LoginForm />)}
    </>);
}
export const getServerSideProps = wrapper.getServerSideProps((store) => (context) => __awaiter(void 0, void 0, void 0, function* () {
    const { data } = yield axios.get("http://localhost:3000/api/products");
    store.dispatch(initializeItems(data.data));
    if (!data.data) {
        return {
            notFound: true,
        };
    }
    return {
        props: {
            allProductList: data.data,
        },
    };
}));
// const store = useSelector<RootState2, RootState2["products"]>(
//   (state) => state.products
// );
// export const getStaticPaths: GetStaticPaths = async (context) => {
//   const res = await fetch("http://localhost:3000/api/products");
//   const posts = await res.json();
//   const paths = posts.data.map((post) => ({
//     params: { id: post.id },
//   }));
//   // console.log("getStaticPaths", posts.data);
//   return {
//     paths,
//     fallback: false,
//   };
// };
// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps((store) => async (context) => {
//     const res = await axios.get("http://localhost:3000/api/products");
//     if (!res.data) {
//       return {
//         notFound: true,
//       };
//     }
//     const { data } = res.data;
//     return {
//       props: {
//         allProductList: data,
//       },
//     };
//   });
