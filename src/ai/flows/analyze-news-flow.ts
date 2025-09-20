'use server';

/**
 * @fileOverview An AI-powered news analysis tool that provides sentiment and market impact for a given news article.
 *
 * - analyzeNewsArticle - A function that analyzes a news article.
 * - AnalyzeNewsArticleInput - The input type for the analyzeNewsArticle function.
 * - AnalyzeNewsArticleOutput - The return type for the analyzeNewsArticle function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AnalyzeNewsArticleInputSchema = z.object({
  headline: z.string().describe('The headline of the news article.'),
  summary: z.string().describe('The summary of the news article.'),
});
export type AnalyzeNewsArticleInput = z.infer<
  typeof AnalyzeNewsArticleInputSchema
>;

const AnalyzeNewsArticleOutputSchema = z.object({
  sentiment: z
    .enum(['Positive', 'Negative', 'Neutral'])
    .describe('The overall sentiment of the news article.'),
  impact: z
    .string()
    .describe(
      'A brief analysis of the potential impact on the market or specific stocks, in 2-3 sentences.'
    ),
});
export type AnalyzeNewsArticleOutput = z.infer<
  typeof AnalyzeNewsArticleOutputSchema
>;

export async function analyzeNewsArticle(
  input: AnalyzeNewsArticleInput
): Promise<AnalyzeNewsArticleOutput> {
  return analyzeNewsArticleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeNewsArticlePrompt',
  input: { schema: AnalyzeNewsArticleInputSchema },
  output: { schema: AnalyzeNewsArticleOutputSchema },
  prompt: `You are a financial analyst AI. Analyze the following news article and provide a sentiment analysis and a brief summary of its potential market impact.

  Headline: {{{headline}}}
  Summary: {{{summary}}}

  Based on the article, determine if the sentiment is Positive, Negative, or Neutral for the overall market or the companies involved.

  Then, provide a concise analysis (2-3 sentences) of the potential impact this news could have on the stock market or relevant sectors/stocks.
  
  Return the analysis in the specified JSON format.`,
});

const analyzeNewsArticleFlow = ai.defineFlow(
  {
    name: 'analyzeNewsArticleFlow',
    inputSchema: AnalyzeNewsArticleInputSchema,
    outputSchema: AnalyzeNewsArticleOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
