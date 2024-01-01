import { ApiProperty } from '@nestjs/swagger';

export class PriceData {
  @ApiProperty({ description: 'Opening price' })
  open: number;
  @ApiProperty({ description: 'Closing price' })
  close: number;
  @ApiProperty({ description: 'Highest price' })
  high: number;
  @ApiProperty({ description: 'Lowest price' })
  low: number;
}

export class PriceResponseResult {
  @ApiProperty({ description: 'Number of returned price objects' })
  count: number;
  @ApiProperty({ type: [PriceData], description: 'Array of the prices' })
  prices: Array<PriceData>;
}

export class PriceResponse {
  @ApiProperty({ description: 'Price endpoint response' })
  result: PriceResponseResult;
}
