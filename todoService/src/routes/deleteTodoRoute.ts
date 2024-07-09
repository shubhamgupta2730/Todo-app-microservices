import express from 'express';
import { deleteTodo } from '../controllers/deleteTodoController';

const router = express.Router();

router.delete('/deleteTodo/:id', deleteTodo);

export default router;
