import { Request, Response } from 'express';
import logger from '../logger';
import bcrypt from 'bcryptjs';
import { generateOTP } from '../utils/generateOTP';
import User, { IUser } from '../models/userModel';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    //check if email, password or name is provided
    if (!email || !password || !name) {
      res
        .status(400)
        .json({ message: 'Email, password, and name are required.' });
      return;
    }

    //check if user with same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'Email is already in use.' });
      return;
    }
    //generate otp
    const otp = generateOTP();
    //password hashing
    const hashedPassword = await bcrypt.hash(password, 10);
    //create entry in db with verification as false.
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
      name,
      otp,
      isVerified: false,
    });

    await newUser.save();
    logger.info(`Signup request initiated for email: ${email}`);

    //return otp
    res.status(200).json({ otp });
  } catch (error) {
    logger.error('Error in signup request', error);
    res.status(500).json({
      message: 'Failed to do signup request. Please try again',
    });
  }
};
