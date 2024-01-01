import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable, TimeoutError, throwError } from 'rxjs';
import { timeout, catchError } from 'rxjs/operators';

/**
 * Handle freezed calls with a timeout and respond with RequestTimeout
 */
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}
  /**
   *
   * @param context Interceptor context
   * @param next Next handler
   * @returns Observable The response of the handler
   * @throws RequestTimeoutException When the specified time elapsed without response
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(this.configService.get<number>('server.timeout', 10000)),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
