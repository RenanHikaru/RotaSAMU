export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "Invalid credentials") {
    super(message, 401);
  }
}
