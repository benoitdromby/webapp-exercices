export interface PortfolioItem {
  id?: string; 
  symbol?: string;
  quantity: number;
  buyPrice?: number;
  marketPrice?: number;
  pnl?: string;
}

export interface Position {
    _id: string
    symbol: string
    quantity: number
    price: number
}

export interface Prices {
    [symbol: string]: number
}