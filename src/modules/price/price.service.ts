// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@nestjs/common';
import {
  CandleData,
  PriceResponse,
} from 'src/interfaces/price-response/price-response.interface';
import { connect, getCandles, Candle } from 'tradingview-ws';
import { TradingviewTimeframe } from 'src/types/types.module';
@Injectable()
export class PriceService {
  async getPrices(
    ticker: string,
    tf: TradingviewTimeframe,
    amount: number,
    broker?: string,
  ): Promise<PriceResponse> {
    const connection = await connect();
    const prefix: string = broker ? broker + ':' : '';
    console.log('Prefix is:', prefix);
    const candles: Candle[][] = await getCandles({
      connection,
      symbols: [prefix + ticker],
      amount: amount,
      timeframe: tf,
    });
    const resultingCandles: Array<CandleData> = [];
    candles[0].forEach((element) => {
      resultingCandles.push({
        ...element,
        broker: '',
        ticker: '',
        timeframe: '',
        measurement: '',
      });
    });
    return {
      result: {
        count: resultingCandles.length,
        prices: resultingCandles,
      },
    };
  }
}
