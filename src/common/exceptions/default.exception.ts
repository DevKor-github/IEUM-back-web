import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export function DefaultBadRequestException(message?: string): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.DefaultBadRequest],
    ErrorCodeEnum.DefaultBadRequest,
    message,
  );
}

export function DefaultUnauthorizedException(
  message?: string,
): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.DefaultUnauthorized],
    ErrorCodeEnum.DefaultUnauthorized,
    message,
  );
}

export function DefaultUndefinedException(message?: string): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.DefaultUndefined],
    ErrorCodeEnum.DefaultUndefined,
    message,
  );
}

export function DefaultInternalServerErrorException(
  message?: string,
): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.DefaultInternalServerError],
    ErrorCodeEnum.DefaultInternalServerError,
    message,
  );
}
