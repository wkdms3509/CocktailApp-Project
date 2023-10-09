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
                return yield getProductInfo(req, res);
            case "PATCH":
                return yield updateProduct(req, res);
            case "DELETE":
                return yield deleteProduct(req, res);
            default:
                break;
        }
    });
}
const getProductInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.query.id;
        const [product, fields] = yield pool.query("SELECT * FROM cocktail2 WHERE id = ?", productId);
        if (!product[0]) {
            res.status(404).json({
                code: 404,
                is_success: false,
                message: "해당 데이터가 존재하지 않습니다.",
            });
        }
        res.status(200).json({ code: 200, is_success: true, data: product });
    }
    catch (error) {
        console.log(error);
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const { name, description, alcohol, sugar, sourness, bitter } = req.body;
        const result = yield pool.query("UPDATE cocktail2 SET name = ?, description = ?, alcohol = ?, sugar = ?, sourness = ?, bitter = ? WHERE id = ?", [name, description, alcohol, sugar, sourness, bitter, id]);
        const affectedRows = ("affectedRows" in result[0]
            ? result[0].affectedRows
            : undefined);
        if (affectedRows === 0) {
            return res
                .status(400)
                .json({ code: 400, is_success: false, message: "failed update" });
        }
        return res
            .status(200)
            .json({ code: 200, is_success: true, message: "successfully updated" });
    }
    catch (error) {
        console.log(error);
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.query;
        const result = yield pool.query("DELETE FROM cocktail2 WHERE id = ?", id);
        console.log("delete result", result);
        const affectedRows = ("affectedRows" in result[0]
            ? result[0].affectedRows
            : undefined);
        if (affectedRows === 0) {
            return res
                .status(400)
                .json({ code: 400, is_success: false, message: "failed delete item" });
        }
        res
            .status(200)
            .json({ code: 200, is_success: true, message: "successfully deleted" });
    }
    catch (error) {
        console.log(error);
    }
});
