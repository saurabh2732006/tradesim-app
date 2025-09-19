"use client";

import { usePortfolio } from "@/context/portfolio-context";
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
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function OrdersPage() {
  const { portfolio } = usePortfolio();
  const orders = portfolio.transactions;

  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold font-headline">Order History</h1>
        <p className="text-muted-foreground">A record of all your trades.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>A complete log of your buy and sell orders.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[60vh]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Total Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      You have not placed any orders yet.
                    </TableCell>
                  </TableRow>
                ) : (
                 orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>{new Date(order.date).toLocaleString()}</TableCell>
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.ticker}</TableCell>
                      <TableCell>
                        <Badge variant={order.type === 'buy' ? 'default' : 'destructive'} className="capitalize">{order.type}</Badge>
                      </TableCell>
                      <TableCell>{order.shares}</TableCell>
                      <TableCell>{formatCurrency(order.price)}</TableCell>
                      <TableCell className="text-right font-medium">
                         {formatCurrency(order.price * order.shares)}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
