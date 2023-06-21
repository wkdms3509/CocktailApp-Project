import { pool } from "@/src/config/db";
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;
  const session = await getServerSession(req, res, authOptions);
  if (session?.user == null) {
    res.status(200).json({ items: [], message: "No Session" });
    return;
  }

  switch (req.method) {
    case "GET":
      const bookmarkList = await getBookmark(String(session?.user?.id));
      res.status(200).json({ items: bookmarkList, message: "조회 성공" });
      break;
    default:
      break;
  }
}

const getBookmark = async (user_Id: string) => {
  try {
    const [response] = await pool.query(
      "SELECT * FROM new_bookmark WHERE user_id = ?",
      user_Id
    );
    const items = response[0]?.item_ids.split(",");
    return items;
    // item_id : '1, 2, 3'
  } catch (error) {
    console.log("에러", error);
  }
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
};
