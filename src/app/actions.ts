'use server'

import { estimateCarbonFootprintReduction } from "@/ai/flows/carbon-footprint-estimator";
import type { CarbonFootprintInput } from "@/ai/flows/carbon-footprint-estimator";

export async function getCarbonFootprintEstimation(input: CarbonFootprintInput) {
  try {
    const result = await estimateCarbonFootprintReduction(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to estimate carbon footprint. Please try again." };
  }
}
