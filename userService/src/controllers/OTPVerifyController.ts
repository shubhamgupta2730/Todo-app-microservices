import { Request, Response } from 'express';
import logger from '../logger';
import User from '../models/userModel';
import { generateToken } from '../utils/generateToken';

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { email, otp } = req.body;
  try {
    //find user with the email provided and otp
    const user = await User.findOne({ email, otp });

    if (!user) {
      res.status(400).json({ message: 'Invalid OTP or email.' });
      return;
    }
    //mark user as verified
    user.isVerified = true;
    user.otp = undefined;
    await user.save();
    //generate jwt token
    const token = generateToken(user._id.toString());
    logger.info(`User verified and signed up with email: ${email}`);

    //return jwt token
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Failed to verify the user', error);
    res.status(500).json({
      message: 'Failed to verify OTP.Please try again',
    });
  }
};
