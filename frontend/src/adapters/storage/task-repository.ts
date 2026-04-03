import type { Task } from '../../core/tasks/task'
import type { TaskPort } from '../../core/tasks/task-port'

export class TaskRepository implements TaskPort {
  async getAll(): Promise<Task[]> {
    // TODO: connect to Go backend via Wails
    return []
  }

  async save(_task: Task): Promise<void> {
    // TODO: implement
  }

  async delete(_id: string): Promise<void> {
    // TODO: implement
  }
}
