var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "@/src/config/db";
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case "GET":
                return yield getProduct(req, res);
            default:
                break;
        }
    });
}
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result] = yield pool.query("SELECT * FROM cocktail2");
        if (!result) {
            res.json({ code: 400, is_success: false });
        }
        res.status(200).json({ code: 200, is_success: true, data: result });
    }
    catch (error) {
        console.log(error);
    }
});
