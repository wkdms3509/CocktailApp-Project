// import { pool } from "@/src/config/db";
// import { GetBookmarkData, ResponseBookmark } from "@/src/constants/apiTypes";
// import axios from "axios";
// import { FieldPacket, RowDataPacket } from "mysql2";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// interface Data {
//   code: number;
//   message: string;
//   data: any;
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//   switch (req.method) {
//     case "GET":
//       return await getMyBookmarkList(req, res);
//       break;
//     default:
//       break;
//   }
// }

// const getMyBookmarkList = async (
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) => {
//   const session = await getServerSession(req, res, authOptions);
//   const user_id = await session?.user?.id;

//   try {
//     if (!user_id)
//       res.status(500).json({
//         code: 500,
//         message: "유저 정보를 조회하지 못했습니다.",
//       });
//     const [result] = await pool.query(
//       "SELECT * FROM new_bookmark WHERE user_id = ?",
//       user_id
//     );

//     res
//       .status(200)
//       .json({ code: 200, message: "내 북마크 리스트 조회 성공", data: result });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       code: 400,
//       message: "유저 정보를 조회 실패",
//     });
//   }

//   //   try {
//   //     const session = await getServerSession(req, res, authOptions);
//   //     const user_id = await session.user.id;

//   //     const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
//   //       "SELECT * FROM new_bookmark WHERE user_id = ?",
//   //       user_id
//   //     );
//   //     // console.log("result", result);
//   //     res.status(200).json({ code: 200, message: "조회 성공", bookmark: result });
//   //   } catch (error) {
//   //     res.status(400).json({ code: 400, message: "잠시 후 다시 실행해주세요." });
//   //   }
// };

// const postBookmark = async (
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseBookmark>
// ) => {
//   const { id, user_id } = req.query;

//   try {
//     const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
//       "SELECT * FROM new_bookmark WHERE user_id = ?",
//       user_id
//     );
//   } catch (error) {
//     res.status(400).json({ code: 400, message: "잠시 후 다시 실행해주세요." });
//   }
// };
