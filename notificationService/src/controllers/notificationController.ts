import { Request, Response } from 'express';
import { sendToQueue } from '../services/rabbitMQService';
import { Notification } from '../models/notificationModel';

const QUEUE_NAME = 'notificationQueue';

export const sendNotification = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email, subject, text } = req.body;
  if (!email || !subject || !text) {
    res.status(400).send('Invalid request');
    return;
  }
  const notification: Notification = { email, subject, text };
  try {
    await sendToQueue(QUEUE_NAME, notification);
  } catch (error) {
    res.status(500).send('Error queuing notification');
  }
};
