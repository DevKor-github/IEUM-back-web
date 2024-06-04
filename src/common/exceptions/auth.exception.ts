import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export function NotValidRefreshException(messsage?: string): CustomException {
  return new CustomException(
    ErrorCodeEnum[ErrorCodeEnum.NotValidRefresh],
    ErrorCodeEnum.NotValidRefresh,
    messsage,
  );
}
