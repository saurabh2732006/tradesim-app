"use client";

import { usePortfolio } from "@/context/portfolio-context";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";

export function PortfolioOverview() {
  const { portfolio, calculatePortfolioValue } = usePortfolio();

  const portfolioValue = useMemo(calculatePortfolioValue, [calculatePortfolioValue]);

  const yesterdayValue = portfolio.history.length > 1 ? portfolio.history[portfolio.history.length - 2].value : portfolioValue;
  const todaysChange = portfolioValue - yesterdayValue;
  const todaysChangePercent = yesterdayValue !== 0 ? (todaysChange / yesterdayValue) * 100 : 0;
  
  if (!portfolio) {
    return (
      <>
        <Skeleton className="h-32 lg:col-span-1" />
        <Skeleton className="h-32 lg:col-span-1" />
        <Skeleton className="h-32 lg:col-span-1" />
      </>
    );
  }

  return (
    <>
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Value</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">
            {formatCurrency(portfolioValue)}
          </div>
          <p className="text-xs text-muted-foreground">
            Your entire portfolio worth
          </p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Today's Change</CardTitle>
          {todaysChange >= 0 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-destructive" />
          )}
        </CardHeader>
        <CardContent>
          <div className={`text-2xl font-bold font-headline ${todaysChange >= 0 ? 'text-green-500' : 'text-destructive'}`}>
            {todaysChange >= 0 ? '+' : ''}{formatCurrency(todaysChange)}
          </div>
          <p className={`text-xs ${todaysChange >= 0 ? 'text-green-500' : 'text-destructive'}`}>
            ({todaysChange >= 0 ? '+' : ''}{formatPercent(todaysChangePercent)})
          </p>
        </CardContent>
      </Card>
      <Card className="lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Cash</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold font-headline">
            {formatCurrency(portfolio.cash)}
          </div>
          <p className="text-xs text-muted-foreground">
            Ready to be invested
          </p>
        </CardContent>
      </Card>
    </>
  );
}
