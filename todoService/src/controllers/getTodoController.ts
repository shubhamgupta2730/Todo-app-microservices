import type { Request, Response } from 'express';
import Todo from '../models/todoModel';

import _ from 'lodash';

export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find();
    //using lodash map:
    const todoTitles = _.map(todos, 'title');
    const completedTodos = _.filter(todos, { completed: true });
    res.status(200).json({
      todos: todos,
      todoTitles: todoTitles,
      completedTodos: completedTodos,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: err.message,
    });
  }
};
