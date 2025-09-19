import { Watchlist } from "@/components/dashboard/watchlist";

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold font-headline">Market Watch</h1>
        <p className="text-muted-foreground">Monitor your favorite stocks.</p>
      </header>
      <Watchlist />
    </div>
  );
}
