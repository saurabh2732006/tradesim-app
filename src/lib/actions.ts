'use server';

import { suggestOrderSize as suggestOrderSizeFlow, SuggestOrderSizeInput } from '@/ai/flows/ai-assisted-order-tool';
import { analyzeNewsArticle as analyzeNewsArticleFlow, AnalyzeNewsArticleInput } from '@/ai/flows/analyze-news-flow';

export async function getOrderSuggestion(input: SuggestOrderSizeInput) {
  try {
    if (!input.stockTicker) {
      throw new Error("Stock ticker is required.");
    }
    const result = await suggestOrderSizeFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI suggestion failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to get suggestion from AI: ${errorMessage}` };
  }
}

export async function getNewsAnalysis(input: AnalyzeNewsArticleInput) {
  try {
    const result = await analyzeNewsArticleFlow(input);
    return { success: true, data: result };
  } catch (error) {
    console.error("AI news analysis failed:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return { success: false, error: `Failed to get analysis from AI: ${errorMessage}` };
  }
}
