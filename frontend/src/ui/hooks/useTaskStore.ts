import { create } from "zustand";
import type { Task } from "@core/tasks/task";
import { WailsTaskAdapter } from "@adapters/wails/wails-adapter";
import { TaskService } from "@core/tasks/task-service";
import type { AppError } from "@core/types/app-error";

const adapter = new WailsTaskAdapter();
const service = new TaskService(adapter);

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: AppError | null;
  loadTasks: () => Promise<void>;
  addTask: (title: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  loadTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await service.loadTasks();
      if (result.success) {
        set({ tasks: result.data, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      set({
        error: {
          message: error instanceof Error ? error.message : "Unexpected error",
          code: "UNEXPECTED_ERROR",
        },
        isLoading: false,
      });
    }
  },
  addTask: async (title: string) => {},
}));
