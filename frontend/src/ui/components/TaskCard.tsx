import type { Task } from '../../core/tasks/task'

interface TaskCardProps {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export function TaskCard({ task, onToggle, onDelete }: TaskCardProps) {
  return (
    <div className="task-card">
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  )
}
