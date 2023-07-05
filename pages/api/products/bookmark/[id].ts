import { pool } from "@/src/config/db";
import { GetBookmarkData, ResponseBookmark } from "@/src/constants/apiTypes";
import axios from "axios";
import { FieldPacket, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

interface Data {
  code: number;
  message: string;
  result: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      const bookmark = await getBookmark(req, res);
      return bookmark;
      break;
    case "POST":
      return await postBookmark(req, res);
    default:
      break;
  }
}

const getBookmark = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    const session = await getServerSession(req, res, authOptions);

    const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
      "SELECT * FROM new_bookmark WHERE user_id = ? AND id = ?",
      [session?.user?.id, id]
    );

    if (result.length === 0) {
      res
        .status(200)
        .json({ code: 200, message: "조회 내역 없음", result: false });
    }
    res.status(200).json({ code: 200, message: "조회 성공", result: true });
  } catch (error) {
    res.status(400).json({
      code: 400,
      message: "잠시 후 다시 실행해주세요.",
      result: false,
    });
  }
};

const postBookmark = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  try {
    const session = await getServerSession(req, res, authOptions);

    const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
      "INSER INTO new_bookmark SET ?",
      { user_id: session?.user?.id, id }
    );
    console.log("result", result);
  } catch (error) {
    res
      .status(400)
      .json({
        code: 400,
        message: "잠시 후 다시 실행해주세요.",
        result: false,
      });
  }
};
