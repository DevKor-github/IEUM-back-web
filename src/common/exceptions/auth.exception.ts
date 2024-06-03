import { AuthException } from '../enums/auth-exception.enum';
import { CustomException } from './custom.exception';

export function NotValidRefreshException(): CustomException {
  return new CustomException(
    AuthException[AuthException.NotValidRefresh],
    AuthException.NotValidRefresh,
  );
}
