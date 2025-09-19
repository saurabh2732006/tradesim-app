"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { initialStocks, initialPortfolio, initialNews } from '@/lib/data';
import type { Stock, PortfolioData, Holding, NewsArticle, TradeType, Transaction } from '@/lib/types';
import { useToast } from "@/hooks/use-toast";

interface PortfolioContextType {
  stocks: Stock[];
  portfolio: PortfolioData;
  news: NewsArticle[];
  buyStock: (ticker: string, shares: number, price: number) => void;
  sellStock: (ticker: string, shares: number, price: number) => void;
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

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  const [stocks, setStocks] = useState<Stock[]>(initialStocks);
  const [portfolio, setPortfolio] = useState<PortfolioData>(initialPortfolio);
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
          // Fluctuate by up to 1.5%
          const change = (Math.random() - 0.5) * (stock.price * 0.03); 
          const newPrice = Math.max(0.01, stock.price + change);
          return {
            ...stock,
            price: newPrice,
            change: newPrice - stock.price,
            changePercent: ((newPrice - stock.price) / stock.price) * 100,
          };
        })
      );
    }, 2000); // Update prices every 2 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const portfolioValue = calculatePortfolioValue();
    const now = new Date();
    const newHistoryPoint = {
      time: now.toISOString().slice(0, 10),
      value: portfolioValue,
    };
    
    setPortfolio(prev => {
      const lastEntry = prev.history[prev.history.length-1];
      if (lastEntry && lastEntry.time === newHistoryPoint.time) {
        // update last entry
        const newHistory = [...prev.history];
        newHistory[newHistory.length-1] = newHistoryPoint;
        return { ...prev, history: newHistory };
      }
      if (prev.history.length < 30) {
        return { ...prev, history: [...prev.history, newHistoryPoint]};
      }
      return { ...prev, history: [...prev.history, newHistoryPoint].slice(-30)};
    });

  }, [stocks, calculatePortfolioValue]);

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
