import { Request, Response } from "express";
import logger from "../logger";

export const  verifyOTP = async(req: Request, res: Response):Promise<void>=>{
  const {email, otp } = req.body;
  try {
    //find user with the email provided and otp
    //mark user as verified
    //generate jwt token
    //return jwt token

  } catch (error) {
    logger.error('Failed to verify the user', error)
    res.status(500).json({
      message: ('Failed to verify OTP.Please try again');
    })
  }
}