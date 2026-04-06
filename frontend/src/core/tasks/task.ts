export interface Task {
  id: string
  title: string
  completed: boolean
  createdAt: number // Unix timestamp para compatibilidad con Wails
}
