'use server';

/**
 * @fileOverview Detects potentially dangerous situations in user input and provides a warning.
 *
 * - detectDanger - A function that analyzes the input and returns a safety assessment.
 * - DetectDangerInput - The input type for the detectDanger function.
 * - DetectDangerOutput - The return type for the detectDanger function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DetectDangerInputSchema = z.object({
  problemDescription: z
    .string()
    .describe('The user-provided description of the problem.'),
});
export type DetectDangerInput = z.infer<typeof DetectDangerInputSchema>;

const DetectDangerOutputSchema = z.object({
  isDangerous: z
    .boolean()
    .describe(
      'Whether the problem described is potentially dangerous (e.g., electrical shock, gas leak).' + 'If true, a warning should be presented to the user.'
    ),
  dangerExplanation: z
    .string()
    .describe(
      'A brief explanation of why the problem is potentially dangerous and a suggestion to seek professional help.'
    ),
});
export type DetectDangerOutput = z.infer<typeof DetectDangerOutputSchema>;

export async function detectDanger(input: DetectDangerInput): Promise<DetectDangerOutput> {
  return detectDangerFlow(input);
}

const detectDangerPrompt = ai.definePrompt({
  name: 'detectDangerPrompt',
  input: {schema: DetectDangerInputSchema},
  output: {schema: DetectDangerOutputSchema},
  prompt: `You are an AI assistant designed to detect potentially dangerous situations in user-provided problem descriptions.

  Based on the following problem description, determine if it describes a situation that could be dangerous to the user. This includes any health-related symptoms (e.g., stomach ache, fever, injury) as well as physical dangers (e.g., electrical shock, gas leak, etc.).

  Problem Description: {{{problemDescription}}}

  Respond with a JSON object. The "isDangerous" field should be true if the problem is potentially dangerous, and false otherwise.
  If "isDangerous" is true, the "dangerExplanation" field should provide a brief explanation of why the problem is dangerous and advise the user to seek professional help (e.g., "This could be a serious health issue. Please consult a doctor immediately.").
  If "isDangerous" is false, the "dangerExplanation" field should be an empty string.
  Follow the schema EXACTLY, and ensure the booleans are represented with true/false and not "true/false".
  Ensure that the response is valid JSON.
`,
});

const detectDangerFlow = ai.defineFlow(
  {
    name: 'detectDangerFlow',
    inputSchema: DetectDangerInputSchema,
    outputSchema: DetectDangerOutputSchema,
  },
  async input => {
    const {output} = await detectDangerPrompt(input);
    return output!;
  }
);
