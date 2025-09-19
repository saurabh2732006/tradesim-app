"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { usePortfolio } from "@/context/portfolio-context";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown } from "lucide-react";

export function HoldingsTable() {
  const { portfolio, stocks, setSelectedStock, setTradeDialogOpen, setTradeType } = usePortfolio();

  const handleTradeClick = (ticker: string) => {
    const stock = stocks.find(s => s.ticker === ticker);
    if (stock) {
      setSelectedStock(stock);
      setTradeType('sell');
      setTradeDialogOpen(true);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Holdings</CardTitle>
        <CardDescription>Stocks you currently own.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-80">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Return</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {portfolio.holdings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                    You don't own any stocks yet.
                  </TableCell>
                </TableRow>
              ) : (
                portfolio.holdings.map((holding) => {
                  const stock = stocks.find((s) => s.ticker === holding.ticker);
                  if (!stock) return null;

                  const marketValue = holding.shares * stock.price;
                  const totalCost = holding.shares * holding.avgCost;
                  const totalReturn = marketValue - totalCost;
                  const totalReturnPercent = totalCost > 0 ? (totalReturn / totalCost) * 100 : 0;
                  const isGain = totalReturn >= 0;

                  return (
                    <TableRow key={holding.ticker}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <stock.logo className="h-8 w-8" />
                          <div>
                            <div className="font-medium">{holding.ticker}</div>
                            <div className="text-xs text-muted-foreground">
                              {holding.shares} shares
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>{formatCurrency(marketValue)}</div>
                        <div className="text-xs text-muted-foreground">
                          {formatCurrency(stock.price)}/share
                        </div>
                      </TableCell>
                      <TableCell className={isGain ? "text-green-500" : "text-destructive"}>
                        <div className="flex items-center gap-1">
                          {isGain ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          {formatCurrency(totalReturn)}
                        </div>
                        <div className="text-xs">
                          {formatPercent(totalReturnPercent)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleTradeClick(holding.ticker)}
                        >
                          Trade
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
