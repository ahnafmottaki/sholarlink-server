class AppError {
  isOperational = true;
  constructor(public statusCode: number, public message: string) {
    Error.captureStackTrace(this, this.constructor);
  }
}
const isAppError = (err: Error | AppError): err is AppError => {
  return err instanceof AppError;
};

export { AppError, isAppError };
