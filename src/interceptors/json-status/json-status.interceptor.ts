import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JSONStatusInterceptor implements NestInterceptor {
  /**
   * Intercept the response and add 'status' and 'statusCode' properties in case of JSON response.
   *
   * @param context
   * @param next
   * @returns
   */
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.getArgByIndex(1);
    return next.handle().pipe(
      map((value) => {
        return JSON.stringify(value)?.startsWith('{')
          ? {
              ...value,
              statusCode: res.statusCode,
              status: res.statusCode < 400 ? 'OK' : 'ERROR',
            }
          : value;
      }),
    );
  }
}
