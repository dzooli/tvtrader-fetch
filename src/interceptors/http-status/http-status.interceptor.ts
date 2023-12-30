import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.getArgByIndex(1);
    return next.handle().pipe(
      map((value) => {
        return {
          ...value,
          statusCode: res.statusCode,
          status: res.statusCode < 400 ? 'OK' : 'ERROR',
        };
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
