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
  prompt: `You are an AI assistant designed to detect **genuinely dangerous situations** that require professional help.

Analyze the user's problem description and determine if it falls into one of these categories:
1.  **Any health-related symptom**: This includes anything from a minor stomach ache or fever to a serious injury. ALL health issues must be flagged as dangerous.
2.  **Major Utilities Risk**: Problems involving gas leaks, main electrical supply (like the fuse box), or major plumbing that could cause significant flooding.
3.  **High-Risk Situations**: Anything involving fire, structural damage to a building, or situations that could lead to immediate and serious physical harm.

For minor issues like a clogged sink, a flickering lightbulb, a broken phone screen, or a software problem, you should **NOT** flag these as dangerous. The goal is to allow DIY solutions for common problems while stopping the user from attempting something truly unsafe.

Problem Description: {{{problemDescription}}}

Respond with a JSON object.
- "isDangerous" must be \`true\` ONLY if the problem fits one of the dangerous categories listed above. Otherwise, it must be \`false\`.
- If "isDangerous" is \`true\`, the "dangerExplanation" field should explain the specific risk and strongly advise seeking professional help (e.g., "Gas leaks are extremely dangerous. Please evacuate and call a professional immediately.").
- If "isDangerous" is \`false\`, "dangerExplanation" should be an empty string.

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
