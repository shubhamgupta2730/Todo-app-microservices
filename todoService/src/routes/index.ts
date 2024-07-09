import express from 'express';
import createTodoRoutes from '../routes/createTodoRoute';
import getTodoRoutes from '../routes/getTodoRoute';
import updateTodoRoutes from '../routes/updateTodoRoute';
import deleteTodoRoutes from '../routes/deleteTodoRoute';

const router = express.Router();

router.use('/api/v1', createTodoRoutes);
router.use('/api/v1', getTodoRoutes);
router.use('/api/v1', updateTodoRoutes);
router.use('/api/v1', deleteTodoRoutes);

export default router;
