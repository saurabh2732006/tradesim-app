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

  // In a real app, orders would be stored separately.
  // For this simulation, we'll display a message.
  const orders = portfolio.history.slice(-10).map((h, i) => ({
      id: `ORD${12345 - i}`,
      ticker: portfolio.holdings[i % portfolio.holdings.length]?.ticker || initialStocks[i % initialStocks.length].ticker,
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      shares: Math.floor(Math.random() * 50) + 1,
      price: h.value / (100 + i),
      status: 'Filled',
      date: h.time
  })).reverse();


  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold font-headline">Order History</h1>
        <p className="text-muted-foreground">A record of all your trades.</p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your last 10 transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Shares</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-right">Status</TableHead>
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
                      <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                      <TableCell className="font-mono">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.ticker}</TableCell>
                      <TableCell>
                        <Badge variant={order.type === 'buy' ? 'default' : 'destructive'} className="capitalize">{order.type}</Badge>
                      </TableCell>
                      <TableCell>{order.shares}</TableCell>
                      <TableCell>{formatCurrency(order.price)}</TableCell>
                      <TableCell className="text-right">
                         <Badge variant="secondary">{order.status}</Badge>
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
// We need this for the mock orders data
const initialStocks = [
  { ticker: 'RELIANCE', name: 'Reliance Industries' },
  { ticker: 'TCS', name: 'Tata Consultancy' },
  { ticker: 'HDFCBANK', name: 'HDFC Bank' },
  { ticker: 'INFY', name: 'Infosys' },
  { ticker: 'ICICIBANK', name: 'ICICI Bank' },
];
