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
        const { item_Id } = req.body;
        if ((session === null || session === void 0 ? void 0 : session.user) == null) {
            res.status(200).json({ items: [], message: "No Session" });
            return;
        }
        switch (req.method) {
            case "POST":
                const result = yield updateBookmark(String((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.id), String(item_Id));
                if ((result === null || result === void 0 ? void 0 : result.action) === "INSERT") {
                    res.status(200).json({ message: "북마크 생성", items: result });
                }
                if ((result === null || result === void 0 ? void 0 : result.action) === "UPDATE") {
                    res.status(200).json({ message: "북마크 업데이트", items: result });
                }
                break;
            default:
                break;
        }
    });
}
const updateBookmark = (user_Id, item_Id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const [bookmarkList] = yield pool.query("SELECT * FROM new_bookmark WHERE user_id = ?", user_Id);
        const originBookmarkList = ((_a = bookmarkList[0]) === null || _a === void 0 ? void 0 : _a.item_ids) != null && bookmarkList[0].item_ids !== ""
            ? bookmarkList[0].item_ids.split(",")
            : [];
        const isBookmarked = originBookmarkList.includes(item_Id);
        const newBookmarkList = isBookmarked
            ? originBookmarkList.filter((id) => id !== item_Id)
            : [...originBookmarkList, item_Id];
        if (!bookmarkList || !bookmarkList[0]) {
            const [response] = yield pool.query("INSERT INTO new_bookmark SET ?", {
                user_id: user_Id,
                item_ids: newBookmarkList.join(","),
            });
            return {
                action: "INSERT",
                result: response,
            };
        }
        const [response] = yield pool.query("UPDATE new_bookmark SET item_ids = ? WHERE user_id = ?", [newBookmarkList.join(","), user_Id]);
        return {
            action: "UPDATE",
            result: response,
        };
    }
    catch (error) {
        console.log("에러", error);
    }
});
