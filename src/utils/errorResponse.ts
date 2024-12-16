import { NextResponse } from 'next/server';
import * as yup from 'yup';

// http status codes
const statusCodes = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    INTERNAL_SERVER_ERROR: 500,
    CREATED: 201,
    NO_CONTENT: 204,
    NOT_MODIFIED: 304,
};

  const errorResponse = (error: unknown) => {
  if (error instanceof yup.ValidationError) {
    // Flatten the validation errors
    const validationErrors = error.inner.reduce((acc, e) => {
      acc[e.path!] = e.message;
      return acc;
    }, {} as Record<string, string>);

    // If validation fails, respond with validation errors
    return NextResponse.json({ message: error.message??'Validation failed', errors: validationErrors }, { status: statusCodes.UNPROCESSABLE_ENTITY });
  }

  // Handle other errors
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
  const errorStatus = error instanceof Error && 'status' in error ? (error as any).status : statusCodes.INTERNAL_SERVER_ERROR;
  // if error comes from console.error, it will show the error message
  if (error instanceof Error) {
    console.error(error);
  }

  return NextResponse.json({ message: errorMessage }, { status: errorStatus });
}

 class ApiError extends Error {
    status: number;
  
    constructor(message: string, status: number = statusCodes.INTERNAL_SERVER_ERROR) {
      super(message);
      this.status = status;
      this.name = 'CustomError';

      // if error comes from console.error, it will show the error message
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, ApiError);
      }
    }
  }

  export { errorResponse, ApiError, statusCodes };