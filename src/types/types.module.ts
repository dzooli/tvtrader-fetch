import { Module } from '@nestjs/common';

@Module({})
export class TypesModule {}

export enum Timeframes {
  m1 = '1',
  m5 = '5',
  m15 = '15',
  m30 = '30',
  m45 = '45',
  m240 = '240',
  h1 = '60',
  h2 = '120',
  h3 = '180',
  h4 = '4H',
  d1 = '1D',
  w1 = '1W',
}

export type TradingviewTimeframe = number | '1D' | '1W' | '1M';
