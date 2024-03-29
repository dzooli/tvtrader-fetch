import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Intercept the response and add tags and measurement column to easy import to InfluxDB.
 */
@Injectable()
export class PriceExtenderInterceptor implements NestInterceptor {
  /**
   * The interceptor function itself
   *
   * @param context Interceptor execution context
   * @param next Next handler
   * @returns The response Observable
   */
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

  /**
   * Add tags and necessary columns for the price data in the response
   *
   * Additional fields for each price data:
   *  - broker
   *  - ticker
   *  - timeframe
   *  - measurement name
   *
   * @param res The response for processing
   * @param broker Broker from query string
   * @param ticker Ticker from query string
   * @param timeframe Timeframe from query string
   * @returns A response with extended price information
   * @throws NotFoundException when price data is not in the input response
   */
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
