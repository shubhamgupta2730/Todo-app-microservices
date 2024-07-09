import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './logger';
import notificationRoutes from './routes/notificationRoute';
import { connectRabbitMQ } from './services/rabbitMQService';
import { sendMail } from './services/emailService';
import { Notification } from './models/notificationModel';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const QUEUE_NAME = 'notificationQueue';
// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1', notificationRoutes);
connectRabbitMQ(QUEUE_NAME, async (message) => {
  if (message) {
    const notification: Notification = JSON.parse(message.content.toString());
    await sendMail(notification);
  }
});

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
