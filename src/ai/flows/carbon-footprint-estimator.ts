'use server';
/**
 * @fileOverview Estimates carbon footprint reduction based on EcoSort activities.
 *
 * - estimateCarbonFootprintReduction - Function to estimate carbon footprint reduction.
 * - CarbonFootprintInput - Input type for the estimateCarbonFootprintReduction function.
 * - CarbonFootprintOutput - Return type for the estimateCarbonFootprintReduction function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CarbonFootprintInputSchema = z.object({
  plasticWeight: z
    .number()
    .describe('Weight of plastic waste sorted in kg'),
  organicWeight: z
    .number()
    .describe('Weight of organic waste sorted in kg'),
  metalWeight: z
    .number()
    .describe('Weight of metal waste sorted in kg'),
  paperWeight: z
    .number()
    .describe('Weight of paper waste sorted in kg'),
});
export type CarbonFootprintInput = z.infer<typeof CarbonFootprintInputSchema>;

const CarbonFootprintOutputSchema = z.object({
  carbonFootprintReduction: z
    .number()
    .describe(
      'Estimated carbon footprint reduction in kg of CO2 equivalent'
    ),
  explanation: z
    .string()
    .describe('Explanation of the carbon footprint reduction estimation'),
});
export type CarbonFootprintOutput = z.infer<typeof CarbonFootprintOutputSchema>;

export async function estimateCarbonFootprintReduction(
  input: CarbonFootprintInput
): Promise<CarbonFootprintOutput> {
  return carbonFootprintEstimatorFlow(input);
}

const carbonFootprintPrompt = ai.definePrompt({
  name: 'carbonFootprintPrompt',
  input: {schema: CarbonFootprintInputSchema},
  output: {schema: CarbonFootprintOutputSchema},
  prompt: `You are an expert in environmental science, specializing in carbon footprint calculation.

  Based on the weight of different types of waste sorted by the user, estimate the carbon footprint reduction achieved through their EcoSort activities.
  Provide both the estimated carbon footprint reduction in kg of CO2 equivalent and a brief explanation of your estimation process.

  Plastic Weight: {{plasticWeight}} kg
  Organic Weight: {{organicWeight}} kg
  Metal Weight: {{metalWeight}} kg
  Paper Weight: {{paperWeight}} kg`,
});

const carbonFootprintEstimatorFlow = ai.defineFlow(
  {
    name: 'carbonFootprintEstimatorFlow',
    inputSchema: CarbonFootprintInputSchema,
    outputSchema: CarbonFootprintOutputSchema,
  },
  async input => {
    const {output} = await carbonFootprintPrompt(input);
    return output!;
  }
);
