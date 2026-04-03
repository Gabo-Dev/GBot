import type { Task } from './task'

export interface TaskPort {
  getAll(): Promise<Task[]>
  save(task: Task): Promise<void>
  delete(id: string): Promise<void>
}
