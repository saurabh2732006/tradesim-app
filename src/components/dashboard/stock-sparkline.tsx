"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, LineStyle } from "lightweight-charts";
import { useTheme } from "next-themes";
import type { CandlestickData } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface StockSparklineProps {
  data: CandlestickData[];
}

export function StockSparkline({ data }: StockSparklineProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current || data.length === 0) return;

    const isDarkMode = resolvedTheme === "dark";
    const chart = createChart(chartContainerRef.current, {
      width: 100,
      height: 40,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDarkMode ? "#D1D5DB" : "#374151",
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      timeScale: {
        visible: false,
        borderVisible: false,
      },
      rightPriceScale: {
        visible: false,
        borderVisible: false,
      },
      handleScroll: false,
      handleScale: false,
    });

    const isGain = data[data.length - 1].close >= data[0].close;

    const areaSeries = chart.addAreaSeries({
      lineColor: isGain ? "hsl(var(--chart-2))" : "hsl(var(--destructive))",
      topColor: isGain ? "hsla(var(--chart-2), 0.4)" : "hsla(var(--destructive), 0.4)",
      bottomColor: isGain ? "hsla(var(--chart-2), 0)" : "hsla(var(--destructive), 0)",
      lineWidth: 2,
      priceLineVisible: false,
      lastValueVisible: false,
    });
    
    const chartData = data.map(d => ({time: d.time, value: d.close}));

    areaSeries.setData(chartData);
    chart.timeScale().fitContent();

    return () => {
      chart.remove();
    };
  }, [data, resolvedTheme]);

  return <div ref={chartContainerRef} className="h-10 w-24" />;
}
