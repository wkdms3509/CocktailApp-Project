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
import crypto from "crypto";
export default function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (req.method) {
            case "POST":
                return yield postLogin(req, res);
                break;
            default:
                break;
        }
    });
}
const postLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("postLogin", req);
        // console.log("postLogin", req);
        const { username, password } = req.body;
        const [result, field] = yield pool.query("SELECT * FROM user WHERE user_id = ?", username);
        if (!result[0]) {
            return res.status(404).json({
                code: 404,
                is_success: false,
                message: "사용자 정보를 찾지 못했습니다.",
            });
        }
        // db에 저장된 유저 데이터
        let dbPassword = result[0].password;
        let dbSalt = result[0].salt;
        // 입력된 유저 정보로 비밀번호 비교
        const hashPassword = crypto
            .createHash("sha512")
            .update(password + dbSalt)
            .digest("hex");
        if (hashPassword !== dbPassword) {
            console.log("비밀번호 불일치");
            return res.setHeader("Set-Cookie", "login=false").status(400).json({
                code: 400,
                is_success: false,
                message: "비밀번호를 다시 확인해주세요.",
            });
        }
        const user = {
            name: result[0].name,
            email: result[0].email,
            idx: result[0].id,
            id: result[0].user_id,
            auth: result[0].auth,
        };
        const setCookieHeader = res.getHeader("Set-Cookie");
        let cookie;
        if (typeof setCookieHeader === "string") {
            cookie = setCookieHeader;
        }
        else if (Array.isArray(setCookieHeader) && setCookieHeader.length > 0) {
            cookie = setCookieHeader[0];
        }
        return res.status(200).json({
            code: 200,
            is_success: true,
            message: "로그인 성공",
            cookie: cookie,
            data: user,
        });
    }
    catch (error) {
        console.log(error);
    }
});
