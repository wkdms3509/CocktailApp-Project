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
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case "GET":
                const bookmark = yield getBookmark(req, res);
                return bookmark;
                break;
            case "POST":
                return yield postBookmark(req, res);
            default:
                break;
        }
    });
}
const getBookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.query;
    try {
        const session = yield getServerSession(req, res, authOptions);
        const [result, fields] = yield pool.query("SELECT * FROM new_bookmark WHERE user_id = ? AND id = ?", [(_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id, id]);
        if (result.length === 0) {
            res
                .status(200)
                .json({ code: 200, message: "조회 내역 없음", result: false });
        }
        res.status(200).json({ code: 200, message: "조회 성공", result: true });
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            message: "잠시 후 다시 실행해주세요.",
            result: false,
        });
    }
});
const postBookmark = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const { id } = req.query;
    try {
        const session = yield getServerSession(req, res, authOptions);
        const [result, fields] = yield pool.query("INSERT INTO new_bookmark SET ?", { user_id: (_b = session === null || session === void 0 ? void 0 : session.user) === null || _b === void 0 ? void 0 : _b.id, id });
        console.log("result", result);
    }
    catch (error) {
        res.status(400).json({
            code: 400,
            message: "잠시 후 다시 실행해주세요.",
            result: false,
        });
    }
});
