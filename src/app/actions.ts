'use server';

import { generateSolution, type GenerateSolutionOutput } from '@/ai/flows/generate-solution';
import { detectDanger, type DetectDangerOutput } from '@/ai/flows/detect-danger';
import { z } from 'zod';

export type SolutionState = {
  solution: string | null;
  isDangerous: boolean;
  warning?: string;
  error: string | null;
};

const schema = z.object({
  problemDescription: z.string().min(10, 'Please describe your problem in a bit more detail.'),
});

export async function getSolutionAction(prevState: SolutionState, formData: FormData): Promise<SolutionState> {
  const validatedFields = schema.safeParse({
    problemDescription: formData.get('problemDescription'),
  });

  if (!validatedFields.success) {
    return {
      solution: null,
      isDangerous: false,
      error: validatedFields.error.flatten().fieldErrors.problemDescription?.join(', ') ?? 'Invalid input.',
    };
  }

  try {
    // Step 1: Detect Danger first.
    const dangerCheck: DetectDangerOutput = await detectDanger({
      problemDescription: validatedFields.data.problemDescription,
    });

    if (dangerCheck.isDangerous) {
      return {
        solution: "Kripaya suraksha ka dhyan rakhein. Ek professional se salah lena hi sabse acha kadam hai.",
        isDangerous: true,
        warning: dangerCheck.dangerExplanation,
        error: null,
      };
    }

    // Step 2: If not dangerous, generate a "jugaad" solution.
    const output: GenerateSolutionOutput = await generateSolution({
      problemDescription: validatedFields.data.problemDescription,
    });
    
    return {
      solution: output.solution,
      isDangerous: false, // We've already established it's not dangerous
      warning: undefined,
      error: null,
    };
  } catch (e) {
    console.error(e);
    return {
      solution: null,
      isDangerous: false,
      error: 'An AI error occurred. Please try again later.',
    };
  }
}
