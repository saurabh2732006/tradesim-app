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
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getNewsAnalysis } from "@/lib/actions";
import type { AnalyzeNewsArticleOutput } from "@/lib/types";
import { Loader2, Wand2, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


interface NewsArticleAnalysis {
  [articleId: string]: {
    isLoading: boolean;
    analysis?: AnalyzeNewsArticleOutput;
    error?: string;
  };
}

const SentimentBadge = ({ sentiment }: { sentiment: AnalyzeNewsArticleOutput['sentiment'] }) => {
  const sentimentConfig = {
    Positive: { icon: TrendingUp, color: "bg-green-500 hover:bg-green-500/90" },
    Negative: { icon: TrendingDown, color: "bg-destructive hover:bg-destructive/90" },
    Neutral: { icon: Minus, color: "bg-muted-foreground" },
  };

  const { icon: Icon, color } = sentimentConfig[sentiment];

  return (
    <Badge className={`${color} text-primary-foreground`}>
      <Icon className="mr-1 h-3 w-3" />
      {sentiment}
    </Badge>
  );
};


export function NewsFeed() {
  const { news } = usePortfolio();
  const [analysis, setAnalysis] = useState<NewsArticleAnalysis>({});

  const handleAnalysis = async (articleId: string, headline: string, summary: string) => {
    setAnalysis(prev => ({
      ...prev,
      [articleId]: { isLoading: true }
    }));

    const result = await getNewsAnalysis({ headline, summary });

    setAnalysis(prev => ({
      ...prev,
      [articleId]: {
        isLoading: false,
        analysis: result.success ? result.data : undefined,
        error: result.success ? undefined : result.error,
      }
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">News Feed</CardTitle>
        <CardDescription>The latest market-moving news with AI analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[21.5rem]">
          <div className="space-y-6">
            {news.map((article) => (
              <div key={article.id} className="space-y-2">
                <div className="flex gap-4">
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
                 <div className="flex flex-col gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleAnalysis(article.id, article.headline, article.summary)}
                    disabled={analysis[article.id]?.isLoading}
                    className="self-start"
                  >
                    {analysis[article.id]?.isLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Wand2 className="mr-2 h-4 w-4" />
                    )}
                    Analyze with AI
                  </Button>

                  {analysis[article.id] && !analysis[article.id]?.isLoading && (
                    analysis[article.id]?.analysis ? (
                       <Alert>
                        <AlertTitle className="flex items-center gap-2">
                           AI Analysis 
                           <SentimentBadge sentiment={analysis[article.id]!.analysis!.sentiment} />
                        </AlertTitle>
                        <AlertDescription>
                          {analysis[article.id]!.analysis!.impact}
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Alert variant="destructive">
                        <AlertTitle>Analysis Failed</AlertTitle>
                        <AlertDescription>
                          {analysis[article.id]?.error || "An unknown error occurred."}
                        </AlertDescription>
                      </Alert>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
