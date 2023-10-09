var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Result from "@/src/components/product/Result";
import axios from "axios";
const resultPage = ({ allProductList }) => {
    return <Result allProductList={allProductList}/>;
};
export default resultPage;
export const getServerSideProps = (context) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield axios.get("http://localhost:3000/api/products");
    // const { data } = await res.data;
    const result = res.data;
    return {
        props: {
            allProductList: result.data,
        },
    };
});
