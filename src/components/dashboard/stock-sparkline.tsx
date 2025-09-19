"use client"

import * as React from "react"
import { Area, AreaChart } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { Stock } from "@/lib/types"

interface StockSparklineProps {
  stock: Stock;
}

export function StockSparkline({ stock }: StockSparklineProps) {
  const chartConfig = {
    value: {
      label: stock.ticker,
      color: stock.change >= 0 ? "hsl(var(--chart-2))" : "hsl(var(--destructive))",
    },
  }

  const chartData = stock.history.map(point => ({
    time: point.time,
    value: point.value
  }));

  const min = Math.min(...chartData.map(d => d.value));
  const max = Math.max(...chartData.map(d => d.value));


  return (
    <ChartContainer config={chartConfig} className="h-10 w-24">
      <AreaChart
        data={chartData}
        margin={{
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <defs>
          <linearGradient id={`fill-${stock.ticker}`} x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-value)"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="var(--color-value)"
              stopOpacity={0.0}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="value"
          type="natural"
          fill={`url(#fill-${stock.ticker})`}
          stroke="var(--color-value)"
          strokeWidth={2}
          stackId="a"
          dot={false}
        />
         <AreaChart accessibilityLayer data={chartData} />
      </AreaChart>
    </ChartContainer>
  )
}
