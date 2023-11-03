import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const isAuth = async (req: Request,res: Response,next: NextFunction) => {
  try {
    const accessToken: any = req.headers["authorization"];
    console.log(req.headers)
    const refreshToken: any = req.cookies["refreshToken"];

    if (!accessToken || !refreshToken) {
      return res.status(401).json({
        success: false,
        message: !accessToken && !refreshToken ? "Access Token and Refresh Token are missing" : !accessToken ? "Access Token is missing" : "Refresh Token is missing",
      });
    } 

    const secretKey: any = process.env.JWT_SECRET_KEY;
    try {
      const decodeAccessToken = jwt.verify(accessToken, secretKey);
      req.body.user = decodeAccessToken;

      try {
        const decodeRefreshToken = jwt.verify(refreshToken, secretKey);
        req.body.user = decodeRefreshToken;
        console.log(req.body);
      } catch (error) {
        return res.status(401).json({
          success: false,
          message: "Invalid Refresh token",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid Access token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Access Denied. No refresh token provided.",
      });
    }
    const secretKey: any = process.env.JWT_SECRET_KEY;
    try {
      const decodeRefreshToken = jwt.verify(refreshToken, secretKey, {});
      const accessToken = jwt.sign(decodeRefreshToken, secretKey);

      //User kaha se aayega ??
      res.header("Authorization", accessToken).send(accessToken);
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: "Invalid refresh token",
      });
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Something went wrong while creating new access token",
    });
  }
};
