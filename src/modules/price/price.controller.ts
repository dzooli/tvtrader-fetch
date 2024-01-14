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
import { ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { Timeframes, TradingviewTimeframe } from '../../types/types.module';
import { TimeoutInterceptor } from 'src/interceptors/timeout/timeout.interceptor';
import { PriceExtenderInterceptor } from 'src/interceptors/price-extender/price-extender.interceptor';
import { PriceResponse } from 'src/interfaces/price-response/price-response.interface';

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
  @ApiQuery({ name: 'timeframe', enum: Timeframes, example: '1D' })
  @ApiQuery({ name: 'broker', required: false, example: 'FX' })
  @ApiQuery({ name: 'ticker', example: 'GBPUSD' })
  @ApiQuery({ name: 'amount', example: 10 })
  @ApiResponse({
    status: 'default',
    type: PriceResponse,
    description: 'Price response as JSON with metadata',
  })
  @ApiResponse({
    status: '4XX',
    description:
      'Error fetching the prices due to invalid parameters or unavailable service',
  })
  async getPrice(
    @Query('timeframe', new ParseEnumPipe(Timeframes))
    timeframe: TradingviewTimeframe,
    @Query('ticker') ticker: string,
    @Query('amount', ParseIntPipe) amount: number = 10,
    @Query('broker') broker?: string,
  ): Promise<PriceResponse> {
    if (ticker && timeframe && amount) {
      const res: Promise<any> = Promise.resolve(
        this.priceService.getPrices(ticker, timeframe, amount, broker),
      );
      return await res;
    }
    throw new BadRequestException('Missing required parameters!');
  }
}
