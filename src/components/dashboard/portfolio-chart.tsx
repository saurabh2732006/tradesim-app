"use client";

import { usePortfolio } from "@/context/portfolio-context";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CandlestickChart } from "./candlestick-chart";

export function PortfolioChart() {
  const { portfolio } = usePortfolio();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Portfolio Performance</CardTitle>
        <CardDescription>Your portfolio value over the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent className="h-80 w-full p-0">
        {portfolio.history.length > 0 ? (
          <CandlestickChart data={portfolio.history} />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            Not enough data to display chart.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
