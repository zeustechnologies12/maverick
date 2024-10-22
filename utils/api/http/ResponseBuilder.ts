import {
  BadRequestResult,
  ErrorResult,
  ForbiddenErrorResult,
  InternalServerErrorResult,
  NotFoundResult,
  ServiceUnavailableErrorResult,
  UnauthorizedErrorResult,
  UnprocessableEntityResult,
} from "./NetworkErrors";
import { HttpStatusCode, HttpErrorCode, ApiResponse } from "@/types";

export interface ErrorResponseBody {
  success: boolean;
  error: ErrorResult;
}
export const serializeError = (error: unknown): ErrorResponseBody => {
  if (error instanceof InternalServerErrorResult) {
    return ResponseBuilder.internalServerError(error.code, error.description);
  }

  if (error instanceof BadRequestResult) {
    return ResponseBuilder.badRequest(error.code, error.description);
  }

  if (error instanceof UnauthorizedErrorResult) {
    return ResponseBuilder.unauthorizedErrorResult(
      error.code,
      error.description
    );
  }

  if (error instanceof ForbiddenErrorResult) {
    return ResponseBuilder.forbiddenErrorResult(error.code, error.description);
  }

  if (error instanceof UnprocessableEntityResult) {
    return ResponseBuilder.unporcessableEntity(error.code, error.description);
  }

  if (error instanceof ServiceUnavailableErrorResult) {
    return ResponseBuilder.serviceUnavailable(error.description);
  }

  return ResponseBuilder.internalServerError(
    HttpErrorCode.HttpError,
    JSON.stringify(error)
  );
};

class ResponseBuilder {
  public static badRequest(
    code: string,
    description: string
  ): ErrorResponseBody {
    const errorResult: BadRequestResult = new BadRequestResult(
      code,
      description
    );

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.BAD_REQUEST
    ) as ErrorResponseBody;
  }

  public static serviceUnavailable(description: string): ErrorResponseBody {
    const errorResult: ServiceUnavailableErrorResult =
      new ServiceUnavailableErrorResult(
        HttpErrorCode.ServiceUnavailableError,
        description
      );

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.SERVICE_UNAVAILABLE
    ) as ErrorResponseBody;
  }

  public static internalServerError(code: string, description: string) {
    const errorResult: InternalServerErrorResult =
      new InternalServerErrorResult(code, description);

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.INTERNAL_SERVER_ERROR
    ) as ErrorResponseBody;
  }

  public static unauthorizedErrorResult(code: string, description: string) {
    const errorResult: UnauthorizedErrorResult = new UnauthorizedErrorResult(
      code,
      description
    );

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.UN_AUTHORIZED
    ) as ErrorResponseBody;
  }

  public static forbiddenErrorResult(code: string, description: string) {
    const errorResult: ForbiddenErrorResult = new ForbiddenErrorResult(
      code,
      description
    );

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.FORBIDDEN
    ) as ErrorResponseBody;
  }

  public static notFound(code: string, description: string): ErrorResponseBody {
    const errorResult: NotFoundResult = new NotFoundResult(code, description);

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.NOT_FOUND
    ) as ErrorResponseBody;
  }

  public static unporcessableEntity(
    code: string,
    description: string
  ): ErrorResponseBody {
    const errorResult: UnprocessableEntityResult =
      new UnprocessableEntityResult(code, description);

    return ResponseBuilder._returnAs(
      errorResult,
      HttpStatusCode.UNPROCESSIBLE_ENTITY
    ) as ErrorResponseBody;
  }

  public static ok<T extends object>(
    result: T,
    message?: string
  ): ApiResponse<T> {
    return ResponseBuilder._returnAs(
      result,
      HttpStatusCode.OK,
      message
    ) as ApiResponse<T>;
  }

  public static created<T extends object>(result: T): ApiResponse<T> {
    return ResponseBuilder._returnAs(
      result,
      HttpStatusCode.CREATED
    ) as ApiResponse<T>;
  }

  public static noContent<T extends object>(result: T): ApiResponse<T> {
    return ResponseBuilder._returnAs(
      result,
      HttpStatusCode.NO_CONTENT
    ) as ApiResponse<T>;
  }

  private static _returnAs<T extends object>(
    result: T,
    statusCode: number,
    message?: string
  ) {
    const bodyObject: ErrorResponseBody | ApiResponse<T> =
      result instanceof ErrorResult
        ? { success: false, error: result }
        : { success: true, status: statusCode, data: result, message };

    return bodyObject;
  }
}

export default ResponseBuilder;
