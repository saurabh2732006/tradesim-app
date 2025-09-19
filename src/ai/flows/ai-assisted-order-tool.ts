'use server';

/**
 * @fileOverview An AI-powered order tool that suggests reasonable order sizes based on different capital allocation strategies.
 *
 * - suggestOrderSize - A function that suggests an order size for a given stock based on the specified capital allocation strategy.
 * - SuggestOrderSizeInput - The input type for the suggestOrderSize function.
 * - SuggestOrderSizeOutput - The return type for the suggestOrderSize function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestOrderSizeInputSchema = z.object({
  stockTicker: z.string().describe('The ticker symbol of the stock to trade.'),
  accountBalance: z.number().describe('The current account balance.'),
  riskFactor: z.number().describe('The users self-assessed risk tolerance 0-1.'),
  stockPrice: z.number().describe('The current price of the stock.'),
  capitalAllocationStrategy: z
    .enum(['aggressive', 'moderate', 'conservative'])
    .describe(
      'The capital allocation strategy to use. Aggressive allocates the most capital, conservative allocates the least.'
    ),
});
export type SuggestOrderSizeInput = z.infer<typeof SuggestOrderSizeInputSchema>;

const SuggestOrderSizeOutputSchema = z.object({
  orderSize: z
    .number()
    .describe('The suggested number of shares to buy or sell.'),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the suggested order size, including the capital allocation strategy and risk factors considered.'
    ),
});
export type SuggestOrderSizeOutput = z.infer<typeof SuggestOrderSizeOutputSchema>;

export async function suggestOrderSize(
  input: SuggestOrderSizeInput
): Promise<SuggestOrderSizeOutput> {
  return suggestOrderSizeFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestOrderSizePrompt',
  input: {schema: SuggestOrderSizeInputSchema},
  output: {schema: SuggestOrderSizeOutputSchema},
  prompt: `You are an AI assistant designed to provide order size suggestions for a stock trading simulation.

  Given the following information, determine a reasonable order size for the stock.

  Stock Ticker: {{{stockTicker}}}
  Account Balance: {{{accountBalance}}}
  Risk Factor (0-1, 0 being risk-averse): {{{riskFactor}}}
  Stock Price: {{{stockPrice}}}
  Capital Allocation Strategy: {{{capitalAllocationStrategy}}}

  Consider the capital allocation strategy and risk factor to determine the appropriate order size.
  - Aggressive: Allocate a larger percentage of the account balance to the trade.
  - Moderate: Allocate a moderate percentage of the account balance to the trade.
  - Conservative: Allocate a smaller percentage of the account balance to the trade.

  Provide a clear and concise reasoning for the suggested order size, explaining the factors you considered.

  Return the suggested order size and reasoning in the following JSON format:
  {
    "orderSize": number, // The suggested number of shares to buy or sell
    "reasoning": string // The reasoning behind the suggested order size
  }`,
});

const suggestOrderSizeFlow = ai.defineFlow(
  {
    name: 'suggestOrderSizeFlow',
    inputSchema: SuggestOrderSizeInputSchema,
    outputSchema: SuggestOrderSizeOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
