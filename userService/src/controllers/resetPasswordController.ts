import { Request, Response } from 'express';
import logger from '../logger';
import bcrypt from 'bcryptjs';
import User from '../models/userModel';

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, oldPassword, newPassword } = req.body;
  try {
    //check if email, oldPassword, newPassword is provided.
    if (!email || !oldPassword || !newPassword) {
      res.status(400).json({
        message: 'Email, old password, and new password are required.',
      });
      return;
    }
    //find user with the email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({ message: 'User not found.' });
      return;
    }
    //verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Incorrect old password.' });
      return;
    }

    //hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    //update user's password with new password
    await User.findByIdAndUpdate(user._id, { password: hashedPassword });
    logger.info(`Password reset successful for user ID: ${user._id}`);
    res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    logger.error('Error in resetting the password.');
    res.status(500).json({
      message: 'Failed to reset the password. Please try again',
    });
  }
};
