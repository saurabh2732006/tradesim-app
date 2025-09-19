"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
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
import { StockSparkline } from "./stock-sparkline";

export function Watchlist() {
  const { stocks, setSelectedStock, setTradeDialogOpen, setTradeType } = usePortfolio();
  
  const handleTradeClick = (ticker: string) => {
    const stock = stocks.find(s => s.ticker === ticker);
    if (stock) {
      setSelectedStock(stock);
      setTradeType('buy');
      setTradeDialogOpen(true);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Market Watch</CardTitle>
        <CardDescription>Monitor your favorite stocks.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[21.5rem]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Asset</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Chart</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stocks.map((stock) => {
                const isGain = stock.change >= 0;
                return (
                  <TableRow key={stock.ticker}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <stock.logo className="h-8 w-8" />
                        <div>
                          <div className="font-medium">{stock.ticker}</div>
                          <div className="text-xs text-muted-foreground truncate max-w-[120px]">
                            {stock.name}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(stock.price)}</TableCell>
                    <TableCell className={isGain ? "text-green-500" : "text-destructive"}>
                      <div className="flex items-center gap-1">
                        {isGain ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        {isGain ? '+' : ''}{formatCurrency(stock.change)}
                      </div>
                      <div className="text-xs">({isGain ? '+' : ''}{formatPercent(stock.changePercent)})</div>
                    </TableCell>
                    <TableCell>
                      <StockSparkline stock={stock} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={() => handleTradeClick(stock.ticker)}>
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
