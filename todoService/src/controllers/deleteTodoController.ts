import type { Request, Response } from 'express';
import Todo from '../models/todoModel';

export const deleteTodo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      res.status(404).json({ message: 'Cannot find todo' });
      return;
    }
    await Todo.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted Todo' });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ message: err.message });
  }
};
