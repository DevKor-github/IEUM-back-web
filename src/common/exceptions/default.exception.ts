import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export class DefaultBadRequestException extends CustomException {
  constructor(message?: string) {
    super(
      ErrorCodeEnum[ErrorCodeEnum.DefaultBadRequest],
      ErrorCodeEnum.DefaultBadRequest,
      message,
    );
  }
}

export class DefaultUnauthorizedException extends CustomException {
  constructor(message?: string) {
    super(
      ErrorCodeEnum[ErrorCodeEnum.DefaultUnauthorized],
      ErrorCodeEnum.DefaultUnauthorized,
      message,
    );
  }
}

export class DefaultUndefinedException extends CustomException {
  constructor(message?: string) {
    super(
      ErrorCodeEnum[ErrorCodeEnum.DefaultUndefined],
      ErrorCodeEnum.DefaultUndefined,
      message,
    );
  }
}

export class DefaultInternalServerErrorException extends CustomException {
  constructor(message?: string) {
    super(
      ErrorCodeEnum[ErrorCodeEnum.DefaultInternalServerError],
      ErrorCodeEnum.DefaultInternalServerError,
      message,
    );
  }
}
