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

export interface PortfolioData {
  cash: number;
  holdings: Holding[];
  history: PortfolioHistoryPoint[];
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
