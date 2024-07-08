import { Request, Response } from 'express';
import logger from '../logger';

export const login = async (Req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    //find user by email
    //check if user is verified or not
    //compare the passwords
    //generate jwt token
    //return jwt token
  } catch (error) {
    logger.error('Error in login the user', error);
    res.status(500).json({
      message: 'Failed to login the user. Please try again',
    });
  }
};
