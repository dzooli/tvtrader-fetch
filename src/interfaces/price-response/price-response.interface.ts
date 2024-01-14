import { ApiProperty } from '@nestjs/swagger';
import { Candle } from 'tradingview-ws';

/**
 * Candle
 */
export class CandleData implements Candle {
  @ApiProperty({ description: 'Opening price' })
  open: number;
  @ApiProperty({ description: 'Closing price' })
  close: number;
  @ApiProperty({ description: 'Highest price' })
  high: number;
  @ApiProperty({ description: 'Lowest price' })
  low: number;
  @ApiProperty({ description: 'Trading volume' })
  volume: number;
  @ApiProperty({ description: 'Timestamp of the price information' })
  timestamp: number;
  @ApiProperty({ description: 'Brokerage abbreviation if applicable' })
  broker: string;
  @ApiProperty({ description: 'Security ticker' })
  ticker: string;
  @ApiProperty({ description: 'Timeframe of the resulted price' })
  timeframe: string;
  @ApiProperty({ description: 'Measurement name for further processing' })
  measurement: string;
}

export class PriceResponseResult {
  @ApiProperty({ description: 'Number of returned price objects' })
  count: number;
  @ApiProperty({ type: [CandleData], description: 'Array of the prices' })
  prices: Array<CandleData>;
}

export class PriceResponse {
  @ApiProperty({ description: 'Price endpoint response' })
  result: PriceResponseResult;
}
