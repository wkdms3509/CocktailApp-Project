import { pool } from "../../../src/config/db";
import crypto from "crypto";
import type { NextApiRequest, NextApiResponse } from "next";
import { RequestNewUser } from "@/src/constants/apiTypes";
import { FieldPacket } from "mysql2";
import { UserQueryType } from "@/src/constants/apiQueryTypes";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return await checkId(req, res);
    case "POST":
      return await postNewUser(req, res);
    default:
      break;
  }
}

const checkId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userInputId = req.query.id;
    const [result, field]: [UserQueryType[], FieldPacket[]] = await pool.query(
      "SELECT * FROM user WHERE user_id = ?",
      userInputId
    );

    if (result.length > 0) {
      return res.status(400).json({
        code: 400,
        is_success: false,
        message: "중복된 아이디가 있습니다.",
      });
    }

    return res.status(200).json({
      code: 200,
      is_success: true,
      message: "사용 가능한 아이디입니다.",
    });
  } catch (error) {
    console.log(error);
  }
};

const postNewUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, email, id, password }: RequestNewUser = req.body;

    if (!name || !email || !id || !password) {
      res.status(400).json({
        code: 400,
        is_success: false,
        message: "빈 칸이 있습니다.",
      });
    }

    let salt = Math.round(new Date().valueOf() * Math.random()) + "";

    let hashPassword = crypto
      .createHash("sha512")
      .update(password + salt)
      .digest("hex");

    const [result] = await pool.query("INSERT INTO user SET ?", {
      name,
      user_id: id,
      password: hashPassword,
      email: email,
      salt,
    });

    res.status(200).json({ code: 200, is_success: true });
  } catch (error) {
    console.log(error);
  }
};
