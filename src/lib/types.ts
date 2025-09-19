export interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo: React.ComponentType<{ className?: string }>;
}

export interface Holding {
  ticker: string;
  shares: number;
  avgCost: number;
}

export interface PortfolioHistoryPoint {
  time: string;
  value: number;
}

export interface Transaction {
  id: string;
  ticker: string;
  type: 'buy' | 'sell';
  shares: number;
  price: number;
  date: string; // ISO string
}

export interface PortfolioData {
  cash: number;
  holdings: Holding[];
  history: PortfolioHistoryPoint[];
  transactions: Transaction[];
}

export interface NewsArticle {
  id: string;
  source: string;
  headline: string;
  summary: string;
  publishedAt: string; // ISO string
  imageUrl: string;
  imageHint: string;
}

export type CapitalAllocationStrategy = "conservative" | "moderate" | "aggressive";

export type TradeType = "buy" | "sell";
