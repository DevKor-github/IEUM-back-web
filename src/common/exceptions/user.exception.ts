import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export class NotValidUserException extends CustomException {
  constructor(message?: string) {
    super(ErrorCodeEnum.NotValidUser, message);
  }
}
