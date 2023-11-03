import { Request, Response, NextFunction } from "express";
import { isAuth } from "./auth.service";


export const verifyingAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await isAuth(req, res, next);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Error while authenticating user: " + error,
    });
  }
};