import { pool } from "../../../src/mysql/config/db";
import { Product } from "@/src/constants/apiQueryTypes";
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await getAllProductList(req, res);
      break;

    case "POST":
      return await postNewCocktail(req, res);
    default:
      break;
  }
}

const getAllProductList = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const [result, fields]: [Product[], FieldPacket[]] = await pool.query(
      "SELECT * FROM cocktail2"
    );

    if (result.length === 0) {
      res.status(400).json({
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

const postNewCocktail = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, alcohol, sugar, sourness, bitter, type, img } =
      req.body;

    const result = await pool.query("INSERT INTO cocktail2 SET ?", {
      name,
      description,
      alcohol,
      sugar,
      sourness,
      bitter,
      type,
      img,
    });

    const insertId = (
      "insertId" in result[0] ? (result[0] as OkPacket).insertId : undefined
    ) as number;

    if (!insertId) {
      res.status(400).json({
        code: 400,
        is_success: false,
      });
    }

    res.status(201).json({
      code: 201,
      is_success: true,
      data: {
        name,
        description,
        alcohol,
        sugar,
        sourness,
        id: insertId,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
