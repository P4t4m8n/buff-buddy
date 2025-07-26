export class ApiError extends Error {
  status: number;
  errors?: Record<string, string>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, string>
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.errors = errors;
  }

  static isApiError(error: unknown): error is ApiError {
    return (
      error instanceof ApiError ||
      (error instanceof Error && "status" in error && "errors" in error)
    );
  }
}
