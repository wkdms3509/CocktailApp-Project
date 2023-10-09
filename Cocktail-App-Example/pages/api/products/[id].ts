import { pool } from "../../../src/mysql/config/db";
import { Product } from "@/src/constants/apiQueryTypes";
import { FieldPacket, OkPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getProductInfo(req, res);
    case "PATCH":
      return await updateProduct(req, res);
    case "DELETE":
      return await deleteProduct(req, res);
    default:
      break;
  }
}

const getProductInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const productId = req.query.id;
    const [product, fields]: [Product[], FieldPacket[]] = await pool.query(
      "SELECT * FROM cocktail2 WHERE id = ?",
      productId
    );

    if (!product[0]) {
      res.status(404).json({
        code: 404,
        is_success: false,
        message: "해당 데이터가 존재하지 않습니다.",
      });
    }
    res.status(200).json({ code: 200, is_success: true, data: product });
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const { name, description, alcohol, sugar, sourness, bitter } = req.body;

    const result = await pool.query(
      "UPDATE cocktail2 SET name = ?, description = ?, alcohol = ?, sugar = ?, sourness = ?, bitter = ? WHERE id = ?",
      [name, description, alcohol, sugar, sourness, bitter, id]
    );

    const affectedRows = (
      "affectedRows" in result[0]
        ? (result[0] as OkPacket).affectedRows
        : undefined
    ) as number;

    if (affectedRows === 0) {
      return res
        .status(400)
        .json({ code: 400, is_success: false, message: "failed update" });
    }
    return res
      .status(200)
      .json({ code: 200, is_success: true, message: "successfully updated" });
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;

    const result = await pool.query("DELETE FROM cocktail2 WHERE id = ?", id);

    console.log("delete result", result);

    const affectedRows = (
      "affectedRows" in result[0]
        ? (result[0] as OkPacket).affectedRows
        : undefined
    ) as number;

    if (affectedRows === 0) {
      return res
        .status(400)
        .json({ code: 400, is_success: false, message: "failed delete item" });
    }

    res
      .status(200)
      .json({ code: 200, is_success: true, message: "successfully deleted" });
  } catch (error) {
    console.log(error);
  }
};
