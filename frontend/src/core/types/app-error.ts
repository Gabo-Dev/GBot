export interface AppError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
