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
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.query;
        const session = yield getServerSession(req, res, authOptions);
        if ((session === null || session === void 0 ? void 0 : session.user) == null) {
            res.status(200).json({ items: [], message: "No Session" });
            return;
        }
        switch (req.method) {
            case "GET":
                const bookmarkList = yield getBookmark(String((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id));
                res.status(200).json({ items: bookmarkList, message: "조회 성공" });
                break;
            default:
                break;
        }
    });
}
const getBookmark = (user_Id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const [response] = yield pool.query("SELECT * FROM new_bookmark WHERE user_id = ?", user_Id);
        const items = (_a = response[0]) === null || _a === void 0 ? void 0 : _a.item_ids.split(",");
        return items;
    }
    catch (error) {
        console.log("에러", error);
    }
});
//   try {
//     const session = await getServerSession(req, res, authOptions);
//     const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
//       "SELECT * FROM new_bookmark WHERE user_id = ? AND id = ?",
//       [session?.user?.id, id]
//     );
//     if (result.length === 0) {
//       res
//         .status(200)
//         .json({ code: 200, message: "조회 내역 없음", result: false });
//     }
// res.status(200).json({ code: 200, message: "조회 성공", result: true });
//   } catch (error) {
//     res.status(400).json({ code: 400, message: "잠시 후 다시 실행해주세요." });
//   }
