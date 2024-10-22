export abstract class ErrorResult extends Error {
  public constructor(
    public code: string,
    public description: string,
  ) {
    super(description);
  }
}
export class BadRequestResult extends ErrorResult {}
export class UnauthorizedErrorResult extends ErrorResult {}
export class ForbiddenErrorResult extends ErrorResult {}
export class TooManyRequestsErrorResult extends ErrorResult {}
export class ConfigurationErrorResult extends ErrorResult {}
export class InternalServerErrorResult extends ErrorResult {}
export class ServiceUnavailableErrorResult extends ErrorResult {}
export class HttpErrorResult extends ErrorResult {}
export class NotFoundResult extends ErrorResult {}
export class UnprocessableEntityResult extends ErrorResult {}
