import type { AppError } from "@core/types/app-error";

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: AppError };
