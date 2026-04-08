import type { Task } from "@core/tasks/task";
import { TaskItem } from "@ui/components/TaskItem";

interface TaskListProps {
  tasks: Task[];
  onDelete: (id: string) => void;
}

export const TaskList = ({ tasks, onDelete }: TaskListProps) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p className="empty-state">No tasks yet</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};
