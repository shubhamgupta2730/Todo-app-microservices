import nodemailer from 'nodemailer';
import { Notification } from '../models/notificationModel';
import dotenv from 'dotenv';
import logger from '../logger';
dotenv.config();

export async function sendMail(notification: Notification): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_ID,
    to: notification.email,
    subject: notification.subject,
    text: notification.text,
  };

  try {
    await transporter.sendMail(mailOptions);
    logger.info(`Email sent to ${notification.email}`);
  } catch (error) {
    logger.error('Error sending email', error);
  }
}
