import { NewsFeed } from "@/components/dashboard/news-feed";

export default function NewsPage() {
  return (
    <div className="space-y-6">
       <header>
        <h1 className="text-3xl font-bold font-headline">Market News</h1>
        <p className="text-muted-foreground">The latest market-moving news.</p>
      </header>
      <div className="max-w-4xl">
        <NewsFeed />
      </div>
    </div>
  );
}
