import { pool } from "@/src/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return getAllProductList(req, res);
      break;

    default:
      break;
  }
}

const getAllProductList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [result] = await pool.query("SELECT * FROM cocktail2");
    if (result.length === 0) {
      res
        .status(400)
        .json({
          code: 400,
          is_success: false,
          message: "데이터가 존재하지 않습니다.",
        });
    }
    res.status(200).json({ code: 200, is_success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};
