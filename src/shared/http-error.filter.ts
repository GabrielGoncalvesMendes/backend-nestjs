import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

interface HttpExceptionReponse {
  error: string;
}

@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const request = context.getRequest();
    const response = context.getResponse();
    const status = exception.getStatus();

    let customErrorResponse;
    if (exception instanceof HttpException) {
      const errorResponse = exception.getResponse();
      const errorMessage = (errorResponse as HttpExceptionReponse).error;

      customErrorResponse = {
        code: status,
        path: request.url,
        method: request.method,
        message: errorMessage || exception.message || null,
      };
    } else {
      customErrorResponse = {
        code: status,
        path: request.url,
        method: request.method,
        message: HttpStatus.INTERNAL_SERVER_ERROR || null,
      };
    }

    response.status(status).json(customErrorResponse);
  }
}
