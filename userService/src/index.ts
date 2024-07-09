import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import logger from './logger';
import routes from './routes/index';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/', routes);

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
