export interface PriceData {
  open: number;
  close: number;
  high: number;
  low: number;
}

export interface PriceResponseResult {
  count: number;
  prices: Array<PriceData>;
}

export interface PriceResponse {
  result: PriceResponseResult;
}
