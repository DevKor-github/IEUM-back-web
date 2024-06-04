import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export function NotValidUserException(message?: string): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.NotValidUser],
    ErrorCodeEnum.NotValidUser,
    message,
  );
}
