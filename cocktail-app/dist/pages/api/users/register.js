var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../../../src/config/db";
import crypto from "crypto";
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case "GET":
                return yield checkId(req, res);
            case "POST":
                return yield postNewUser(req, res);
            default:
                break;
        }
    });
}
const checkId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userInputId = req.query.id;
        const [result, field] = yield pool.query("SELECT * FROM user WHERE user_id = ?", userInputId);
        if (result.length > 0) {
            return res.status(400).json({
                code: 400,
                is_success: false,
                message: "중복된 아이디가 있습니다.",
            });
        }
        return res.status(200).json({
            code: 200,
            is_success: true,
            message: "사용 가능한 아이디입니다.",
        });
    }
    catch (error) {
        console.log(error);
    }
});
const postNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, id, password } = req.body;
        if (!name || !email || !id || !password) {
            res.status(400).json({
                code: 400,
                is_success: false,
                message: "빈 칸이 있습니다.",
            });
        }
        let salt = Math.round(new Date().valueOf() * Math.random()) + "";
        let hashPassword = crypto
            .createHash("sha512")
            .update(password + salt)
            .digest("hex");
        const [result] = yield pool.query("INSERT INTO user SET ?", {
            name,
            user_id: id,
            password: hashPassword,
            email: email,
            salt,
        });
        res.status(200).json({ code: 200, is_success: true });
    }
    catch (error) {
        console.log(error);
    }
});
