import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export class NotValidRefreshException extends CustomException {
  constructor(message?: string) {
    super(
      ErrorCodeEnum[ErrorCodeEnum.NotValidRefresh],
      ErrorCodeEnum.NotValidRefresh,
      message,
    );
  }
}
