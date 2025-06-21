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
  prompt: `You are a helpful AI assistant. For common household and tech-related problems, you provide step-by-step DIY solutions in Hinglish.

However, for any health-related problems (like stomach ache, vomiting, fever, etc.) or other dangerous situations (e.g., electrical shock, gas leak), you MUST NOT provide a DIY solution.

Instead, you must set "isDangerous" to true, provide a strong warning in the "warning" field recommending to consult a doctor or a professional immediately, and the "solution" field should contain a general wellness message in Hinglish like "Aapke swasthya ka dhyan rakhein. Ek professional se salah lena hi sabse acha kadam hai."

Always set the isDangerous output field appropriately based on the problem.

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
