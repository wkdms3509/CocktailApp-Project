import { pool } from "@/src/config/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProductFromType(req, res);
      break;

    default:
      break;
  }
}

const getProductFromType = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const type = req.query.name;
    // CategoryProductList
    const [result] = await pool.query(
      "SELECT * FROM cocktail2 WHERE type = ?",
      type
    );

    if (!result) {
      res.status(404).json({ code: 404, message: "not found data" });
    }
    res.status(200).json({ code: 200, is_success: true, data: result });
  } catch (error) {
    console.log(error);
  }
};
