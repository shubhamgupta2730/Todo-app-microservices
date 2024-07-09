import express from 'express';
import { getTodo } from '../controllers/getTodoController';

const router = express.Router();

router.get('/getTodo', getTodo);

export default router;
