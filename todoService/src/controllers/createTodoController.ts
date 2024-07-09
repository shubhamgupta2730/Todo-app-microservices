import type { Request, Response } from 'express';
import Todo, { TodoPriority } from '../models/todoModel';
import type { createTodoRequest } from '../interfaces/requests.js';

export const createTodo = async (
  req: Request<unknown, unknown, createTodoRequest>,
  res: Response
): Promise<void> => {
  const { title, dueDate, priority } = req.body;

  try {
    const todo = new Todo({
      title,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      priority: priority ? priority : TodoPriority.MEDIUM,
    });
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
