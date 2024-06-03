import { UserException } from '../enums/user-exception.enum';
import { CustomException } from './custom.exception';

export function NotValidUserException(): CustomException {
  return new CustomException(
    UserException[UserException.NotValidUser],
    UserException.NotValidUser,
  );
}
