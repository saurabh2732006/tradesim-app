"use client";

import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePortfolio } from "@/context/portfolio-context";
import { getOrderSuggestion } from "@/lib/actions";
import type { CapitalAllocationStrategy, SuggestOrderSizeOutput } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  shares: z.coerce.number().int().positive("Must be a positive number"),
});

export function TradeDialog() {
  const {
    portfolio,
    buyStock,
    sellStock,
    getHolding,
    tradeDialogOpen,
    setTradeDialogOpen,
    selectedStock,
    tradeType,
    setTradeType,
  } = usePortfolio();
  const { toast } = useToast();

  const { control, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { shares: 1 },
  });

  const [capitalStrategy, setCapitalStrategy] = useState<CapitalAllocationStrategy>('moderate');
  const [riskFactor, setRiskFactor] = useState(0.5);
  const [suggestion, setSuggestion] = useState<SuggestOrderSizeOutput | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);

  const shares = watch('shares');
  const totalCost = selectedStock ? shares * selectedStock.price : 0;
  const holding = selectedStock ? getHolding(selectedStock.ticker) : undefined;

  useEffect(() => {
    if (tradeDialogOpen) {
      reset({ shares: 1 });
      setSuggestion(null);
    }
  }, [tradeDialogOpen, reset]);

  const handleSuggestion = async () => {
    if (!selectedStock) return;
    setIsSuggesting(true);
    setSuggestion(null);
    const result = await getOrderSuggestion({
      stockTicker: selectedStock.ticker,
      accountBalance: portfolio.cash,
      riskFactor,
      stockPrice: selectedStock.price,
      capitalAllocationStrategy: capitalStrategy,
    });
    setIsSuggesting(false);
    if (result.success && result.data) {
      setSuggestion(result.data);
    } else {
      toast({ variant: "destructive", title: "Suggestion Failed", description: result.error });
    }
  };

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    if (!selectedStock) return;
    if (tradeType === "buy") {
      buyStock(selectedStock.ticker, data.shares, selectedStock.price);
    } else {
      sellStock(selectedStock.ticker, data.shares, selectedStock.price);
    }
    setTradeDialogOpen(false);
  };

  if (!selectedStock) return null;

  return (
    <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">Place Order: {selectedStock.ticker}</DialogTitle>
          <DialogDescription>Current price: {formatCurrency(selectedStock.price)}</DialogDescription>
        </DialogHeader>
        <Tabs value={tradeType} onValueChange={(v) => setTradeType(v as "buy" | "sell")} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="buy">Buy</TabsTrigger>
            <TabsTrigger value="sell">Sell</TabsTrigger>
          </TabsList>
          <TabsContent value="buy">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shares-buy" className="text-right">Shares</Label>
                <Controller
                  name="shares"
                  control={control}
                  render={({ field }) => <Input id="shares-buy" type="number" {...field} className="col-span-3" />}
                />
              </div>
              {errors.shares && <p className="text-destructive text-sm col-span-4 text-right">{errors.shares.message}</p>}
              <div className="flex justify-between text-sm">
                <span>Total Cost:</span>
                <span className="font-medium">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Available Cash:</span>
                <span>{formatCurrency(portfolio.cash)}</span>
              </div>
              <DialogFooter>
                <Button type="submit">Execute Buy</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="sell">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="shares-sell" className="text-right">Shares</Label>
                 <Controller
                  name="shares"
                  control={control}
                  render={({ field }) => <Input id="shares-sell" type="number" {...field} className="col-span-3" />}
                />
              </div>
               {errors.shares && <p className="text-destructive text-sm col-span-4 text-right">{errors.shares.message}</p>}
              <div className="flex justify-between text-sm">
                <span>Total Proceeds:</span>
                <span className="font-medium">{formatCurrency(totalCost)}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Shares Owned:</span>
                <span>{holding?.shares ?? 0}</span>
              </div>
              <DialogFooter>
                <Button type="submit" variant="destructive">Execute Sell</Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
        
        <div className="space-y-4 pt-4 border-t">
          <h3 className="font-semibold font-headline text-md">AI Order Tool</h3>
          <div className="space-y-2">
            <Label>Capital Allocation Strategy</Label>
            <Tabs value={capitalStrategy} onValueChange={(v) => setCapitalStrategy(v as CapitalAllocationStrategy)} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="conservative">Conservative</TabsTrigger>
                <TabsTrigger value="moderate">Moderate</TabsTrigger>
                <TabsTrigger value="aggressive">Aggressive</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="space-y-2">
            <Label>Risk Tolerance</Label>
            <Slider defaultValue={[riskFactor]} max={1} step={0.1} onValueChange={(v) => setRiskFactor(v[0])} />
          </div>
          <Button onClick={handleSuggestion} disabled={isSuggesting} className="w-full">
            {isSuggesting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Suggest Order Size
          </Button>
          {suggestion && (
            <Alert>
              <Lightbulb className="h-4 w-4" />
              <AlertTitle>AI Suggestion</AlertTitle>
              <AlertDescription className="space-y-2">
                <p><strong>Order Size:</strong> {suggestion.orderSize} shares</p>
                <p><strong>Reasoning:</strong> {suggestion.reasoning}</p>
                <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => setValue('shares', suggestion.orderSize)}>Use this suggestion</Button>
              </AlertDescription>
            </Alert>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
