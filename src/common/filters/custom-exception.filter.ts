import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { CustomException } from '../exceptions/custom.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    let errorCode: number;
    let message: string;
    if (exception instanceof CustomException) {
      errorCode = exception.errorCode;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      errorCode = exception.getStatus();
      message = (exception.getResponse() as any).message;
    } else if (exception instanceof Error) {
      //Internal Server Error는 에러로 처리됨.
      errorCode = 500;
      message = 'Internal Server Error';
    }

    // const data = response.data;
    // const errorCode = exception?.errorCode;
    // console.log(errorCode);

    response.json({
      status: 'fail',
      errorCode: errorCode,
      message: message,
    });
  }
}
