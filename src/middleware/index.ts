import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class MicroserviceExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    const ctx = host.switchToHttp(); // Switch to HTTP context
    const response = ctx.getResponse(); // Get the HTTP response object
    // const status = exception.getStatus(); // Access the status code directly
    const message = exception.message;

    response.json({
      //   statusCode: status,
      message,
    });

    return throwError(exception);
  }
}
