import type { TaskPort } from "@core/tasks/task-port";
import type { Task } from "@core/tasks/task";
import {
  GetAllTasks,
  GetTask,
  SaveTask,
  UpdateTask,
  DeleteTask,
} from "@wails/go/main/App";
import type { Result } from "@core/types/result";

export class WailsTaskAdapter implements TaskPort {
  async getAllTasks(): Promise<Result<Task[]>> {
    try {
      const tasks = await GetAllTasks();
      return { success: true, data: tasks };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to fetch tasks",
      };
    }
  }

  async saveTask(task: Task): Promise<Result<Task>> {
    try {
      const savedTask = await SaveTask(task);
      return { success: true, data: savedTask };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save task",
      };
    }
  }

  async getTask(id: string): Promise<Result<Task>> {
    try {
      const task = await GetTask(id);
      return { success: true, data: task };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to get task",
      };
    }
  }

  async updateTask(task: Task): Promise<Result<Task>> {
    try {
      const result = await UpdateTask(task);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to update the task",
      };
    }
  }

  async deleteTask(id: string): Promise<Result<Task>> {
    try {
      const result = await DeleteTask(id);
      return { success: true, data: result };
    } catch (error) {
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Failed to delete the Task",
      };
    }
  }
}
