import { Request, Response } from 'express';
import logger from '../logger';

export const signup = async (req: Request, res: Response): Promise<void> => {
  const { email, password, name } = req.body;
  try {
    //check if email, password or name is provided
    //check if user with same email already exists
    //generate otp
    //password hashing
    //create entry in db with verification as false.
    //return otp
  } catch (error) {
    logger.error('Error in signup request', error);
    res.status(500).json({
      message: 'Failed to do signup request. Please try again',
    });
  }
};
