import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { CustomException } from '../exceptions/custom.exception';
import {
  DefaultBadRequestException,
  DefaultInternalServerErrorException,
  DefaultUnauthorizedException,
  DefaultUndefinedException,
} from '../exceptions/default.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof CustomException) {
    } else if (exception instanceof HttpException) {
      switch (exception.getStatus()) {
        case 400:
          exception = new DefaultBadRequestException(
            (exception.getResponse() as any).message,
          );
          break;
        case 401:
          exception = new DefaultUnauthorizedException(
            (exception.getResponse() as any).message,
          );
          break;
        default:
          let responseMessage = exception.getResponse();
          //response가 string형태가 아니고 object 형태일 때
          if (typeof responseMessage === 'object') {
            responseMessage = (exception.getResponse() as any)
              .message as string;
          }
          exception = new DefaultUndefinedException(responseMessage);
          break;
        // JSON.stringify(exception?.getResponse().message),
      }
    } else if (exception instanceof Error) {
      exception = new DefaultInternalServerErrorException(exception.message);
    }

    const errorCodeName = exception.errorCodeName;
    const errorCode = exception.errorCode;
    const message = exception.message;

    response.json({
      statusCode: errorCode,
      errorCodeName: errorCodeName,
      message: message,
    });
  }
}
