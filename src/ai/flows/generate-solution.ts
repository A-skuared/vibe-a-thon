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
});
export type GenerateSolutionOutput = z.infer<typeof GenerateSolutionOutputSchema>;

export async function generateSolution(input: GenerateSolutionInput): Promise<GenerateSolutionOutput> {
  return generateSolutionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSolutionPrompt',
  input: {schema: GenerateSolutionInputSchema},
  output: {schema: GenerateSolutionOutputSchema},
  prompt: `You are a helpful AI assistant known for providing clever "jugaad" (DIY life hacks).
For any given common household or tech-related problem, you must provide a creative, step-by-step DIY solution.
Your response must be in Hinglish (a mix of Hindi and English).
The user has already been warned about potential dangers, so your task is to focus on providing a helpful and practical solution, not to give safety warnings.

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
