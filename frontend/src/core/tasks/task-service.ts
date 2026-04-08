import type { TaskPort } from "@core/tasks/task-port";
import type { Task } from "@core/tasks/task";
import type { Result } from "@core/types/result";

export class TaskService {
  constructor(private readonly port: TaskPort) {}

  async loadTasks(): Promise<Result<Task[]>> {
    return this.port.getAllTasks();
  }
}
