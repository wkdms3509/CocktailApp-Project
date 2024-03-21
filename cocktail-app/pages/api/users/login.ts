// import { pool } from "../../../src/mysql/config/db";
import { Data, RequestUserData, User } from "@/src/constants/apiTypes";
import { UserQueryType } from "@/src/constants/apiQueryTypes";
import crypto from "crypto";
import { FieldPacket, RowDataPacket } from "mysql2";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { pool } from "@/src/mysql/config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      await pool;
      return await postLogin(req, res);
      break;

    default:
      break;
  }
}

const postLogin = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  try {
    const { username, password }: RequestUserData = req.body;

    const [result, field]: [UserQueryType[], FieldPacket[]] = await pool.query(
      "SELECT * FROM user WHERE user_id = ?",
      username
    );

    if (!result[0]) {
      return res.status(404).json({
        code: 404,
        is_success: false,
        message: "사용자 정보를 찾지 못했습니다.",
      });
    }

    // db에 저장된 유저 데이터
    let dbPassword = result[0].password;
    let dbSalt = result[0].salt;

    // 입력된 유저 정보로 비밀번호 비교
    const hashPassword = crypto
      .createHash("sha512")
      .update(password + dbSalt)
      .digest("hex");

    if (hashPassword !== dbPassword) {
      console.log("비밀번호 불일치");
      return res.setHeader("Set-Cookie", "login=false").status(400).json({
        code: 400,
        is_success: false,
        message: "비밀번호를 다시 확인해주세요.",
      });
    }

    const user: User = {
      name: result[0].name,
      email: result[0].email,
      idx: result[0].id,
      id: result[0].user_id,
      auth: result[0].auth,
    };

    const setCookieHeader = res.getHeader("Set-Cookie");

    let cookie: string | undefined;

    if (typeof setCookieHeader === "string") {
      cookie = setCookieHeader;
    } else if (Array.isArray(setCookieHeader) && setCookieHeader.length > 0) {
      cookie = setCookieHeader[0];
    }

    return res.status(200).json({
      code: 200,
      is_success: true,
      message: "로그인 성공",
      cookie: cookie,
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};
