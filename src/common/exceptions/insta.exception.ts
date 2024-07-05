import { ErrorCodeEnum } from '../enums/error-code.enum';
import { CustomException } from './custom.exception';

export class NotValidInstaGuestUserException extends CustomException {
  constructor(message?: string) {
    super(ErrorCodeEnum.NotValidInstaGuestUser, message);
  }
}

export class NotFoundInstaCollectionException extends CustomException {
  constructor(message?: string) {
    super(ErrorCodeEnum.NotFoundInstaCollection, message);
  }
}
