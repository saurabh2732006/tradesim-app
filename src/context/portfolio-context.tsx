"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialStocks, initialPortfolio, initialNews } from '@/lib/data';
import type { Stock, PortfolioData, Holding, NewsArticle, TradeType, Transaction, CandlestickData } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface PortfolioContextType {
  stocks: Stock[];
  portfolio: PortfolioData;
  news: NewsArticle[];
  buyStock: (ticker: string, shares: number, price: number) => void;
  sellStock: (ticker:string, shares: number, price: number) => void;
  getHolding: (ticker: string) => Holding | undefined;
  calculatePortfolioValue: () => number;
  tradeDialogOpen: boolean;
  setTradeDialogOpen: (open: boolean) => void;
  selectedStock: Stock | null;
  setSelectedStock: (stock: Stock | null) => void;
  tradeType: TradeType;
  setTradeType: (type: TradeType) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

// Helper to generate initial OHLC history for a stock
const generateStockHistory = (price: number): CandlestickData[] => {
  const now = new Date();
  const history: CandlestickData[] = [];
  let lastClose = price * (1 - (Math.random() - 0.5) * 0.2);

  for (let i = 0; i < 30; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() - (29 - i));
    const time = date.toISOString().slice(0, 10);

    const open = lastClose * (1 + (Math.random() - 0.5) * 0.02);
    const close = open * (1 + (Math.random() - 0.5) * 0.03);
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    
    history.push({ time, open, high, low, close });
    lastClose = close;
  }
  return history;
};

// Helper to generate a new OHLC point
const generateNewCandle = (lastCandle: CandlestickData): CandlestickData => {
  const time = new Date().toISOString().slice(0, 10);
  const open = lastCandle.close;
  const close = open * (1 + (Math.random() - 0.5) * 0.03);
  const high = Math.max(open, close) * (1 + Math.random() * 0.01);
  const low = Math.min(open, close) * (1 - Math.random() * 0.01);

  return { time, open, high, low, close };
}

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<Stock[]>(() => initialStocks.map(stock => ({
    ...stock,
    history: generateStockHistory(stock.price),
  })));
  
  const [portfolio, setPortfolio] = useState<PortfolioData>(() => {
    const initialHistory = generateStockHistory(initialPortfolio.cash);
    return { ...initialPortfolio, history: initialHistory };
  });

  const news = initialNews;

  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [tradeType, setTradeType] = useState<TradeType>('buy');

  const getHolding = useCallback((ticker: string) => {
    return portfolio.holdings.find(h => h.ticker === ticker);
  }, [portfolio.holdings]);

  const calculatePortfolioValue = useCallback(() => {
    const holdingsValue = portfolio.holdings.reduce((total, holding) => {
      const stock = stocks.find(s => s.ticker === holding.ticker);
      return total + (stock ? stock.price * holding.shares : 0);
    }, 0);
    return portfolio.cash + holdingsValue;
  }, [portfolio.cash, portfolio.holdings, stocks]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks(prevStocks =>
        prevStocks.map(stock => {
          const lastCandle = stock.history[stock.history.length - 1];
          if (!lastCandle) return stock;

          const newCandle = generateNewCandle(lastCandle);
          const newPrice = newCandle.close;

          const newHistory = [...stock.history, newCandle].slice(-30);

          return {
            ...stock,
            price: newPrice,
            change: newPrice - lastCandle.close,
            changePercent: ((newPrice - lastCandle.close) / lastCandle.close) * 100,
            history: newHistory,
          };
        })
      );
    }, 2000); // Update prices every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const lastPortfolioCandle = portfolio.history[portfolio.history.length - 1];
    if (!lastPortfolioCandle) return;
  
    const portfolioValue = calculatePortfolioValue();
    const open = lastPortfolioCandle.close;
    const close = portfolioValue;
    const high = Math.max(open, close) * (1 + Math.random() * 0.001);
    const low = Math.min(open, close) * (1 - Math.random() * 0.001);
  
    const newHistoryPoint: CandlestickData = {
      time: new Date().toISOString().slice(0, 10),
      open,
      high,
      low,
      close,
    };
  
    // Only update if the time is different from the last point to avoid duplicates
    if (newHistoryPoint.time !== lastPortfolioCandle.time) {
      setPortfolio(prev => {
        const newHistory = [...prev.history, newHistoryPoint].slice(-30);
        return { ...prev, history: newHistory };
      });
    }
  }, [stocks, calculatePortfolioValue]); // Removed portfolio.history from dependency array

  const addTransaction = (transaction: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
    };

    setPortfolio(prev => ({
      ...prev,
      transactions: [newTransaction, ...prev.transactions],
    }));
  };

  const buyStock = (ticker: string, shares: number, price: number) => {
    const cost = shares * price;
    if (portfolio.cash < cost) {
      toast({ variant: "destructive", title: "Transaction Failed", description: "Insufficient funds." });
      return;
    }

    setPortfolio(prev => {
      const newHoldings = [...prev.holdings];
      const existingHoldingIndex = newHoldings.findIndex(h => h.ticker === ticker);

      if (existingHoldingIndex > -1) {
        const existing = newHoldings[existingHoldingIndex];
        const totalShares = existing.shares + shares;
        const totalCost = (existing.avgCost * existing.shares) + cost;
        existing.avgCost = totalCost / totalShares;
        existing.shares = totalShares;
      } else {
        newHoldings.push({ ticker, shares, avgCost: price });
      }

      return {
        ...prev,
        cash: prev.cash - cost,
        holdings: newHoldings,
      };
    });
    addTransaction({ ticker, shares, price, type: 'buy' });
    toast({ title: "Trade Executed", description: `Successfully bought ${shares} share(s) of ${ticker}.` });
  };

  const sellStock = (ticker: string, shares: number, price: number) => {
    const proceeds = shares * price;
    const existingHolding = getHolding(ticker);

    if (!existingHolding || existingHolding.shares < shares) {
      toast({ variant: "destructive", title: "Transaction Failed", description: "Not enough shares to sell." });
      return;
    }

    setPortfolio(prev => {
      const newHoldings = prev.holdings.map(h => {
        if (h.ticker === ticker) {
          return { ...h, shares: h.shares - shares };
        }
        return h;
      }).filter(h => h.shares > 0);

      return {
        ...prev,
        cash: prev.cash + proceeds,
        holdings: newHoldings,
      };
    });
    addTransaction({ ticker, shares, price, type: 'sell' });
    toast({ title: "Trade Executed", description: `Successfully sold ${shares} share(s) of ${ticker}.` });
  };

  const value = {
    stocks,
    portfolio,
    news,
    buyStock,
    sellStock,
    getHolding,
    calculatePortfolioValue,
    tradeDialogOpen,
    setTradeDialogOpen,
    selectedStock,
    setSelectedStock,
    tradeType,
    setTradeType,
  };

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
