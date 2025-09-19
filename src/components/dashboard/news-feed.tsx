"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { usePortfolio } from "@/context/portfolio-context";
import { formatDistanceToNow } from "date-fns";

export function NewsFeed() {
  const { news } = usePortfolio();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">News Feed</CardTitle>
        <CardDescription>The latest market-moving news.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[21.5rem]">
          <div className="space-y-6">
            {news.map((article) => (
              <div key={article.id} className="flex gap-4">
                <div className="relative h-[100px] w-[100px] flex-shrink-0">
                  <Image
                    src={article.imageUrl}
                    alt={article.headline}
                    fill
                    sizes="100px"
                    className="rounded-md object-cover"
                    data-ai-hint={article.imageHint}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs text-muted-foreground">{article.source} &middot; {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}</p>
                  <a href="#" className="font-semibold text-sm hover:underline">
                    {article.headline}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
