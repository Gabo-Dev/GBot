import { useState, useEffect } from 'react'
import type { Task } from '../../core/tasks/task'
import { TaskCard } from '../components/TaskCard'

export function TaskListContainer() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // TODO: connect to TaskService via adapter
  }, [])

  const handleToggle = (id: string) => {
    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ))
  }

  const handleDelete = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}
