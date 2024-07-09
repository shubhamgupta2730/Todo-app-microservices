import { Request, Response } from 'express';
import logger from '../logger';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/generateToken';

export const login = async (Req: Request, res: Response): Promise<void> => {
  const { email, password } = Req.body;
  try {
    //find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: 'user with this email does not exist',
      });
      return;
    }

    //check if user is verified or not
    if (!user.isVerified) {
      res.status(400).json({
        message: 'Account not verified',
      });
    }

    //compare the passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        message: 'Invalid password',
      });
    }
    //generate jwt token
    const token = generateToken(user._id.toString());

    logger.info(`User logged in with email: ${email}`);
    //return jwt token
    res.status(200).json({ token });
  } catch (error) {
    logger.error('Error in login the user', error);
    res.status(500).json({
      message: 'Failed to login the user. Please try again',
    });
  }
};
