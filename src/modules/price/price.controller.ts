// Copyright (c) 2023 Zoltan Fabian
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import {
  Controller,
  Get,
  ParseIntPipe,
  Query,
  BadRequestException,
  ParseEnumPipe,
  UseInterceptors,
} from '@nestjs/common';
import { PriceService } from './price.service';
import { ApiTags } from '@nestjs/swagger';
import { Timeframes } from '../../types/types.module';
import { TimeoutInterceptor } from 'src/interceptors/timeout/timeout.interceptor';
import { PriceExtenderInterceptor } from 'src/interceptors/price-extender/price-extender.interceptor';

@Controller({
  path: '/prices',
  version: '1',
})
@UseInterceptors(TimeoutInterceptor)
@UseInterceptors(PriceExtenderInterceptor)
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  @ApiTags('price')
  async getPrice(
    @Query('broker') broker: string,
    @Query('ticker') ticker: string,
    @Query('timeframe', new ParseEnumPipe(Timeframes)) timeframe: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    if (broker && ticker && timeframe && amount) {
      const res: Promise<any> = Promise.resolve(
        this.priceService.getPrices(broker, ticker, timeframe, amount),
      );
      return await res;
    }
    throw new BadRequestException('Missing required parameters!');
  }
}
