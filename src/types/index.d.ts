type TBinanceBalance = {
  availableBalance: string;
  maxWithdrawAmount: string;
  totalCrossUnPnl: string;
  totalCrossWalletBalance: string;
  totalInitialMargin: string;
  totalMaintMargin: string;
  totalMarginBalance: string;
  totalOpenOrderInitialMargin: string;
  totalPositionInitialMargin: string;
  totalUnrealizedProfit: string;
  totalWalletBalance: string;
}
type TBinancePosition = {
  adl: number;
  askNotional: string;
  bidNotional: string;
  breakEvenPrice: string;
  entryPrice: string;
  initialMargin: string;
  isolatedMargin: string;
  isolatedWallet: string;
  liquidationPrice: string;
  maintMargin: string;
  marginAsset: string;
  markPrice: string;
  notional: string;
  openOrderInitialMargin: string;
  positionAmt: string;
  positionInitialMargin: string;
  positionSide: string;
  symbol: string;
  unRealizedProfit: string;
  updateTime: number;
}
type TBinanceOrder = {
  orderId: number;
  symbol: string;
  status: string;
  clientOrderId: string;
  price: string;
  avgPrice: string;
  origQty: string;
  executedQty: string;
  cumQuote: string;
  timeInForce: string;
  type: "STOP_MARKET" | "TAKE_PROFIT_MARKET" | "LIMIT" | "MARKET";
  side: string;
  stopPrice: string;
  closePosition: boolean;
  positionSide: string;
  reduceOnly: boolean;
  priceProtect: boolean;
  priceMatch: string;
  selfTradePreventionMode: string;
  time: number;
  updateTime: number;
  workingType: string;
}