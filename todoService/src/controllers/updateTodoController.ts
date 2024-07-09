import type { Request, Response } from 'express';

import type { updatedTodoRequest } from '../interfaces/requests.js';

import Todo from '../models/todoModel';

export const updateTodo = async (
  req: Request<{ id: string }, unknown, updatedTodoRequest>,
  res: Response
): Promise<void> => {
  const { title, completed, dueDate, priority } = req.body;

  try {
    const todo = await Todo.findById(req.params.id);
    if (todo == null) {
      res.status(404).json({ message: 'Cannot find todo' });
      return;
    }
    //nullish coalescing operator: ??
    todo.title = title ?? todo.title;
    todo.completed = completed ?? todo.completed;

    //ternary operator:
    todo.dueDate = dueDate ? new Date(dueDate) : todo.dueDate;
    todo.priority = priority ? priority : todo.priority;
    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ message: err.message });
  }
};
