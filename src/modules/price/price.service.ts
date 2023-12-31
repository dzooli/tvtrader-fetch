// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { Injectable } from '@nestjs/common';
import { PriceResponse } from 'src/interfaces/price-response/price-response.interface';

@Injectable()
export class PriceService {
  async getPrices(
    broker: string,
    ticker: string,
    tf: string | number,
    amount: number,
  ): Promise<PriceResponse> {
    return {
      result: {
        count: amount,
        prices: [
          {
            open: 1,
            close: 1.1,
            high: 1.11,
            low: 0.99,
          },
        ],
      },
    };
  }
}
