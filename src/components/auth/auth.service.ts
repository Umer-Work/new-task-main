// import { Request, Response, NextFunction } from "express";
// import dotenv from "dotenv";
// import  jwt  from 'jsonwebtoken';

// dotenv.config();



// export const isAuth = async (req: Request , res: Response, next: NextFunction) => {
//   try {
//     //extract token
//     const token = req.cookies.token //eslint-disable-line
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     const secretKey : any = process.env.JWT_SECRET_KEY; //eslint-disable-line
//     try {
//         const decodeToken = jwt.verify(token, secretKey);
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid token",
//         }
//     )}
//     next();
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Something went wrong while validating the token",
//     });
//   }
// };
