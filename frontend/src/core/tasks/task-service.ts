import type { Task } from './task'
import type { TaskPort } from './task-port'

export class TaskService {
  constructor(private port: TaskPort) {}

  async getAll(): Promise<Task[]> {
    return this.port.getAll()
  }

  async save(task: Task): Promise<void> {
    return this.port.save(task)
  }

  async delete(id: string): Promise<void> {
    return this.port.delete(id)
  }
}
