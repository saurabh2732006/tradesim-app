"use client";

import { useEffect, useRef } from "react";
import { createChart, ColorType, CrosshairMode } from "lightweight-charts";
import { useTheme } from "next-themes";
import type { CandlestickData } from "@/lib/types";

interface CandlestickChartProps {
  data: CandlestickData[];
}

export function CandlestickChart({ data }: CandlestickChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const handleResize = () => {
      chart.applyOptions({ width: chartContainerRef.current!.clientWidth });
    };

    const isDarkMode = resolvedTheme === "dark";

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: isDarkMode ? "#D1D5DB" : "#374151",
      },
      grid: {
        vertLines: { color: isDarkMode ? "#374151" : "#E5E7EB" },
        horzLines: { color: isDarkMode ? "#374151" : "#E5E7EB" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: isDarkMode ? "#4B5563" : "#D1D5DB",
      },
      timeScale: {
        borderColor: isDarkMode ? "#4B5563" : "#D1D5DB",
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: isDarkMode ? "hsl(173, 58%, 39%)" : "hsl(166.2, 76.7%, 39.4%)",
      downColor: isDarkMode ? "hsl(0, 62.8%, 30.6%)" : "hsl(0, 84.2%, 60.2%)",
      borderDownColor: isDarkMode ? "hsl(0, 62.8%, 30.6%)" : "hsl(0, 84.2%, 60.2%)",
      borderUpColor: isDarkMode ? "hsl(173, 58%, 39%)" : "hsl(166.2, 76.7%, 39.4%)",
      wickDownColor: isDarkMode ? "hsl(0, 62.8%, 30.6%)" : "hsl(0, 84.2%, 60.2%)",
      wickUpColor: isDarkMode ? "hsl(173, 58%, 39%)" : "hsl(166.2, 76.7%, 39.4%)",
    });

    const sortedData = [...data].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
    candlestickSeries.setData(sortedData);

    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, resolvedTheme]);

  return <div ref={chartContainerRef} className="h-full w-full" />;
}
