import { PortfolioOverview } from "@/components/dashboard/portfolio-overview";
import { HoldingsTable } from "@/components/dashboard/holdings-table";
import { Watchlist } from "@/components/dashboard/watchlist";
import { NewsFeed } from "@/components/dashboard/news-feed";
import { PortfolioChart } from "@/components/dashboard/portfolio-chart";
import { TradeDialog } from "@/components/trade-dialog";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PortfolioOverview />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <PortfolioChart />
        </div>
        <div className="lg:col-span-2">
          <HoldingsTable />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <Watchlist />
        </div>
        <div>
          <NewsFeed />
        </div>
      </div>
      <TradeDialog />
    </>
  );
}
