import { pool } from "@/src/mysql/config/db";
import { NextApiRequest, NextApiResponse } from "next";
pool;
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProduct(req, res);

    default:
      break;
  }
}

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [result] = await pool.query("SELECT * FROM cocktail2");

    if (!result) {
      res.json({ code: 400, is_success: false });
    }
    res.status(200).json({ code: 200, is_success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};
