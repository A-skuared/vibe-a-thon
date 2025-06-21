'use server';

/**
 * @fileOverview This file defines the generateSolution flow, which takes a problem description as input and generates a step-by-step DIY solution in Hinglish.
 *
 * - generateSolution - A function that handles the solution generation process.
 * - GenerateSolutionInput - The input type for the generateSolution function.
 * - GenerateSolutionOutput - The return type for the generateSolution function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSolutionInputSchema = z.object({
  problemDescription: z.string().describe('The description of the problem to be solved.'),
});
export type GenerateSolutionInput = z.infer<typeof GenerateSolutionInputSchema>;

const GenerateSolutionOutputSchema = z.object({
  solution: z.string().describe('The step-by-step DIY solution in Hinglish.'),
  isDangerous: z.boolean().describe('Whether the problem is potentially dangerous.'),
  warning: z.string().optional().describe('A warning message if the problem is potentially dangerous.'),
});
export type GenerateSolutionOutput = z.infer<typeof GenerateSolutionOutputSchema>;

export async function generateSolution(input: GenerateSolutionInput): Promise<GenerateSolutionOutput> {
  return generateSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSolutionPrompt',
  input: {schema: GenerateSolutionInputSchema},
  output: {schema: GenerateSolutionOutputSchema},
  prompt: `You are a helpful AI assistant that provides step-by-step DIY solutions in Hinglish for common household and tech-related problems. If the problem is potentially dangerous (e.g., electrical shock, gas leak), include a warning and suggest professional help. Always set the isDangerous output field appropriately.

Problem Description: {{{problemDescription}}}`,
});

const generateSolutionFlow = ai.defineFlow(
  {
    name: 'generateSolutionFlow',
    inputSchema: GenerateSolutionInputSchema,
    outputSchema: GenerateSolutionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
