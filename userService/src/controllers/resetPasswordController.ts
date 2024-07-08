import { Request, Response } from 'express';
import logger from '../logger';

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    //check if email, oldPassword, newPassword is provided.
    //find user with the email
    //verify old password
    //hash the new password
    //update user's password with new password
  } catch (error) {
    logger.error('Error in resetting the password.');
    res.status(500).json({
      message: 'Failed to reset the password. Please try again'
    });
  }
};
