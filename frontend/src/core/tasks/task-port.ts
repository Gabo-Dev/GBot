import type { Task } from "@core/tasks/task";
import type { Result } from "@core/types/result";

export interface TaskPort {
  getAllTasks(): Promise<Result<Task[]>>;
  getTask(id: string): Promise<Result<Task>>;
  saveTask(task: Task): Promise<Result<Task>>;
  updateTask(task: Task): Promise<Result<Task>>;
  deleteTask(id: string): Promise<Result<Task>>;
}
