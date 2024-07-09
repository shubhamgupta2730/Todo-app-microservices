import amqp, { Connection, Channel, ConsumeMessage } from 'amqplib';
import logger from '../logger';
const RABITMQ_URL = 'amqp://localhost';

export async function connectRabbitMQ(
  queue: string,
  onMessage: (msg: ConsumeMessage | null) => void
): Promise<void> {
  try {
    const connection: Connection = await amqp.connect(RABITMQ_URL);
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    logger.info('Connected to rabbitmq');
    channel.consume(queue, onMessage);
  } catch (error) {
    logger.error('Error in connecting to RabbitMQ', error);
  }
}

export async function sendToQueue(
  queue: string,
  message: object
): Promise<void> {
  try {
    const connection: Connection = await amqp.connect(RABITMQ_URL);
    const channel: Channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), {
      persistent: true,
    });
    logger.info('Message send to queue', queue);
    await channel.close();
    await connection.close();
  } catch (error) {
    logger.error('Error in sending to queue', queue);
  }
}
