export class BaseError extends Error {
  public status: number;
  constructor(message: string = "Internal Server Error", status: number = 500) {
    super(message);
    this.status = status;
  }

}

export class NotFoundError extends BaseError {
  constructor(message: string = "Data Not Found") {
    super(message, 404);
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string = "Unauthorized") {
    super(message, 401);
  }
}

export class ForbiddenError extends BaseError {
  constructor(message: string = "Forbidden") {
    super(message, 403);
  }
}