import express from 'express';
import { updateTodo } from '../controllers/updateTodoController';

const router = express.Router();

router.patch('/updateTodo/:id', updateTodo);

export default router;
