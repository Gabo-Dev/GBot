import { useEffect } from "react";
import { useTaskStore } from "@ui/hooks/useTaskStore";
import { TaskList } from "@ui/components/TaskList";
import styles from "@ui/containers/TaskManager.module.css";

export const TaskManager = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const isLoading = useTaskStore((state) => state.isLoading);
  const error = useTaskStore((state) => state.error);
  const loadTasks = useTaskStore((state) => state.loadTasks);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return (
    <div className={styles.container}>
      {isLoading && <div className={styles.loading}>Loading Tasks...</div>}
      {error && <div className={styles.error}>Error: {error.message}</div>}
      {!isLoading && !error && (
        <div className={styles.content}>
          <h2>My Tasks</h2>
          <TaskList
            tasks={tasks}
            onDelete={(id) => console.log("Delete request for ", id)}
          />
        </div>
      )}
    </div>
  );
};
