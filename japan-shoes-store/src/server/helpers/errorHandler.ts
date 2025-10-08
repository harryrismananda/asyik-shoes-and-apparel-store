import { ZodError } from "zod";
import { BaseError, ForbiddenError, NotFoundError, UnauthorizedError } from "./customError";

interface IErrorResponse {
  message: string;
  status: number;
}

export const errorHandler = (err: unknown): IErrorResponse => {
  if (err instanceof ZodError) {
    const issues = err.issues;
    const message = issues[0]?.message || "Validation error";
    return { message, status: 400 };
  } else if (err instanceof BaseError) {
    return { message: err.message, status: err.status };
  } else if (err instanceof NotFoundError) {
    return { message: err.message, status: err.status };
  } else if (err instanceof UnauthorizedError) {
    return { message: err.message, status: err.status };
  } else if (err instanceof ForbiddenError) {
    return { message: err.message, status: err.status };
  } else {
    return { message: "Internal server error", status: 500 };
  }
}