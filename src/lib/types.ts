import { FC } from 'react';

export interface CandlestickData {
  time: string; // "YYYY-MM-DD"
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface Stock {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo: FC<{ className?: string }>;
  history: CandlestickData[];
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
  history: CandlestickData[];
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

export interface SuggestOrderSizeInput {
  stockTicker: string;
  accountBalance: number;
  riskFactor: number;
  stockPrice: number;
  capitalAllocationStrategy: CapitalAllocationStrategy;
}

export interface SuggestOrderSizeOutput {
  orderSize: number;
  reasoning: string;
}

export interface AnalyzeNewsArticleInput {
  headline: string;
  summary: string;
}

export interface AnalyzeNewsArticleOutput {
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  impact: string;
}
