import express from 'express';
import { createTodo } from '../controllers/createTodoController';

const router = express.Router();

router.post('/createTodo', createTodo);

export default router;
