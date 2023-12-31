import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
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
            req.query.timeframe ? req.query.timeframe : 'UNDEF',
          ),
        ),
      );
  }

  extend(res: any, broker: string, ticker: string, timeframe: string) {
    const extended: object[] = [];
    const prices = res.result?.prices;

    if (!res.result?.count || !prices) {
      throw new NotFoundException('Price data not found', {
        cause: new Error(),
        description: 'Price response is empty',
      });
    }

    for (const item of prices) {
      extended.push({
        ...item,
        broker: broker, // Influx Tag
        ticker: ticker, // Influx Tag
        timeframe: timeframe, // Influx Tag
        measurement: 'price', // Influx measurementColumn
      });
    }
    res.result.prices = extended;
    return res;
  }
}
