import { pool } from "../../../../src/mysql/config/db";
import { GetBookmarkData, ResponseBookmark } from "@/src/constants/apiTypes";
import axios from "axios";
import { FieldPacket, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

interface Data {
  items?: any;
  message: string;
}

function hasUserId(obj: any): obj is { id: string } {
  return obj?.id !== undefined && typeof obj.id === "string";
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);
  const { item_Id } = req.body;

  if (session?.user == null || !hasUserId(session.user)) {
    res.status(200).json({ items: [], message: "No Session" });
    return;
  }

  switch (req.method) {
    case "POST":
      const result = await updateBookmark(
        String(session.user.id),
        String(item_Id)
      );
      if (result?.action === "INSERT") {
        res.status(200).json({ message: "북마크 생성", items: result });
      }
      if (result?.action === "UPDATE") {
        res.status(200).json({ message: "북마크 업데이트", items: result });
      }
      break;
    default:
      break;
  }
}

const updateBookmark = async (user_Id: string, item_Id: string) => {
  try {
    const [bookmarkList] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM new_bookmark WHERE user_id = ?",
      user_Id
    );

    const originBookmarkList: string[] =
      bookmarkList[0]?.item_ids != null && bookmarkList[0].item_ids !== ""
        ? bookmarkList[0].item_ids.split(",")
        : [];

    const isBookmarked = originBookmarkList.includes(item_Id);

    const newBookmarkList = isBookmarked
      ? originBookmarkList.filter((id) => id !== item_Id)
      : [...originBookmarkList, item_Id];

    if (!bookmarkList || !bookmarkList[0]) {
      const [response] = await pool.query("INSERT INTO new_bookmark SET ?", {
        user_id: user_Id,
        item_ids: newBookmarkList.join(","),
      });
      return {
        action: "INSERT",
        result: response,
      };
    }

    const [response] = await pool.query(
      "UPDATE new_bookmark SET item_ids = ? WHERE user_id = ?",
      [newBookmarkList.join(","), user_Id]
    );
    return {
      action: "UPDATE",
      result: response,
    };
  } catch (error) {
    console.log("에러", error);
  }
};
