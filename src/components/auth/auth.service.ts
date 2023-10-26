import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import  jwt  from 'jsonwebtoken';

dotenv.config();

// export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token : any  = req.cookies.token; 
//     console.log(token);
//     if (!token) {
//       return res.status(401).json({
//         success: false,
//         message: "Token is missing",
//       });
//     }

//     const secretKey : any = process.env.JWT_SECRET_KEY;
//     try {
//         const decodeToken =  jwt.verify(token, secretKey);
//         req.body.user = decodeToken;
//         console.log(req);
//         next();
//     } catch (error) {
//         return res.status(401).json({
//             success: false,
//             message: "Invalid token",
//         }
//     )}
    
//   } catch (error) {
//     return res.status(401).json({
//       success: false,
//       message: "Something went wrong while validating the token",
//     });
//   }
// };


export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token : any  = req.headers['authorization']; 
    console.log(token);
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    
    const secretKey : any = process.env.JWT_SECRET_KEY;
    try {
        const decodeToken =  jwt.verify(token, secretKey);
        req.body.user = decodeToken;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token",
        }
    )}
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

export const refreshTokenController =async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
      return res.status(401).json({
        success : false,
        message : "Access Denied. No refresh token provided."
      })
    }
    const secretKey : any = process.env.JWT_SECRET_KEY;
    try {
      const decodeToken = jwt.verify(refreshToken, secretKey);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success : false,
        message : "Invalid refresh token"
      })
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while creating new access token",
    });    
  }
}