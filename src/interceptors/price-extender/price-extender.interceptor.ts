import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PriceExtenderInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.getArgByIndex(0);
    return next
      .handle()
      .pipe(
        map((result) =>
          this.extend(
            result,
            req.query.broker ? req.query.broker : 'UNDEF',
            req.query.ticker ? req.query.ticker : 'UNDEF',
          ),
        ),
      );
  }

  extend(res: any, broker: string, ticker: string) {
    const extended: object[] = [];
    const prices = res.result.prices;
    for (const item of prices) {
      extended.push({ ...item, broker: broker, ticker: ticker });
    }
    res.result.prices = extended;
    return res;
  }
}
