// import { pool } from "@/src/config/db";
// import { GetBookmarkData, ResponseBookmark } from "@/src/constants/apiTypes";
// import axios from "axios";
// import { FieldPacket, RowDataPacket } from "mysql2";
// import { NextApiRequest, NextApiResponse } from "next";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   switch (req.method) {
//     case "GET":
//       const bookmark = await getBookmark(req, res);
//       return bookmark;
//       break;
//     case "POST":
//       return await postBookmark(req, res);
//     default:
//       break;
//   }
// }

// const getBookmark = async (
//   req: NextApiRequest,
//   res: NextApiResponse<ResponseBookmark>
// ) => {
//   const { id } = req.query;

//   try {
//     const session = await getServerSession(req, res, authOptions);
//     const user_id = await session.user.id;

//     const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
//       "SELECT * FROM new_bookmark WHERE user_id = ?",
//       user_id
//     );
//     // console.log("result", result);
//     res.status(200).json({ code: 200, message: "조회 성공", bookmark: result });
//   } catch (error) {
//     res.status(400).json({ code: 400, message: "잠시 후 다시 실행해주세요." });
//   }
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
//     console.log("result", result);

//     // res.status(200).json({code: 200, bookmark: result})

//     // const isBookmarked: GetBookmarkData[] = result as GetBookmarkData[];

//     // if (isBookmarked.length > 0) {
//     //   const deleteBookmark = await pool.query(
//     //     "DELETE from new_bookmark WHERE user_id = ? AND id = ?",
//     //     [user_id, id]
//     //   );
//     //   console.log(`deleteBookmark : ${JSON.stringify(await deleteBookmark)}`);
//     //   res.status(200).json({ code: 200, message: "북마크가 삭제되었습니다." });
//     // }

//     // if (isBookmarked.length === 0) {
//     //   const postBookmark = await pool.query("INSERT INTO new_bookmark SET ?", {
//     //     user_id,
//     //     id,
//     //   });
//     //   // console.log(`postBookmark : ${JSON.stringify(await postBookmark)}`);
//     //   res.status(200).json({ code: 200, message: "북마크가 추가되었습니다." });
//     // }
//   } catch (error) {
//     res.status(400).json({ code: 400, message: "잠시 후 다시 실행해주세요." });
//   }
// };

// // const getBookmark = async (
// //   req: NextApiRequest,
// //   res: NextApiResponse<ResponseBookmark>
// // ) => {
// //   const { id, user_id } = req.query;

// //   const [result, fields]: [RowDataPacket[], FieldPacket[]] = await pool.query(
// //     "SELECT * FROM new_bookmark WHERE user_id = ? AND id = ? ",
// //     [user_id, id]
// //   );

// //   const isBookmarked: GetBookmarkData[] = result as GetBookmarkData[];

// //   if (isBookmarked.length > 0) {
// //     const deleteBookmark = await pool.query(
// //       "DELETE from new_bookmark WHERE user_id = ? AND id = ?",
// //       [user_id, id]
// //     );
// //     console.log(`deleteBookmark : ${JSON.stringify(await deleteBookmark)}`);
// //     res.status(200).json({ code: 200, message: "북마크가 삭제되었습니다." });
// //   }

// //   if (isBookmarked.length === 0) {
// //     const postBookmark = await pool.query("INSERT INTO new_bookmark SET ?", {
// //       user_id,
// //       id,
// //     });
// //     // console.log(`postBookmark : ${JSON.stringify(await postBookmark)}`);
// //     res.status(200).json({ code: 200, message: "북마크가 추가되었습니다." });
// //   }
// // };
