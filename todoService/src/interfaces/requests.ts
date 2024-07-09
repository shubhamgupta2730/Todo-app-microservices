import type { TodoPriority } from '../models/todoModel';

//validation on requests:
export interface createTodoRequest {
  title: string;
  dueDate?: Date;
  priority?: TodoPriority;
}

export interface updatedTodoRequest {
  title?: string;
  completed?: boolean;
  dueDate?: Date;
  priority?: TodoPriority;
}
