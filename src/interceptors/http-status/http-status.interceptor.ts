import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class HttpStatusInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.getArgByIndex(1);
    return next.handle().pipe(
      map((value) => {
        return { ...value, statusCode: res.statusCode };
      }),
      catchError((err) => {
        if (!res.statusCode) return { ...err, statusCode: res.statusCode };
        else return err;
      }),
    );
  }
}
