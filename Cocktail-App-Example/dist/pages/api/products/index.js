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
                return yield getAllProductList(req, res);
                break;
            case "POST":
                return yield postNewCocktail(req, res);
            default:
                break;
        }
    });
}
const getAllProductList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [result, fields] = yield pool.query("SELECT * FROM cocktail2");
        if (result.length === 0) {
            res.status(400).json({
                code: 400,
                is_success: false,
                message: "데이터가 존재하지 않습니다.",
            });
        }
        res.status(200).json({ code: 200, is_success: true, data: result });
    }
    catch (error) {
        console.log(error);
    }
});
const postNewCocktail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description, alcohol, sugar, sourness, bitter, type, img } = req.body;
        const result = yield pool.query("INSERT INTO cocktail2 SET ?", {
            name,
            description,
            alcohol,
            sugar,
            sourness,
            bitter,
            type,
            img,
        });
        const insertId = ("insertId" in result[0] ? result[0].insertId : undefined);
        if (!insertId) {
            res.status(400).json({
                code: 400,
                is_success: false,
            });
        }
        res.status(201).json({
            code: 201,
            is_success: true,
            data: {
                name,
                description,
                alcohol,
                sugar,
                sourness,
                id: insertId,
            },
        });
    }
    catch (error) {
        console.log(error);
    }
});
