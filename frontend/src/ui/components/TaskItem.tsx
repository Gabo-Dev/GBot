import type { Task } from "@core/tasks/task";

interface TaskItemProps {
  task: Task;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onDelete }: TaskItemProps) => {
  return (
    <div className="task-item">
      <span>{task.title}</span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </div>
  );
};
