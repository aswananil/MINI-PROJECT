"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { getCarbonFootprintEstimation } from "@/app/actions";
import { Loader2, Sparkles } from "lucide-react";
import type { WasteEntry } from "@/lib/types";
import { useMemo, useState, useEffect } from "react";
import type { CarbonFootprintOutput } from "@/ai/flows/carbon-footprint-estimator";

const formSchema = z.object({
  plasticWeight: z.coerce.number().min(0, "Weight must be non-negative."),
  organicWeight: z.coerce.number().min(0, "Weight must be non-negative."),
  metalWeight: z.coerce.number().min(0, "Weight must be non-negative."),
  paperWeight: z.coerce.number().min(0, "Weight must be non-negative."),
});

type FormValues = z.infer<typeof formSchema>;

interface EstimationState {
  data: CarbonFootprintOutput | null;
  error: string | null;
  pending: boolean;
}

export default function CarbonEstimatorTab({ wasteLog }: { wasteLog: WasteEntry[] }) {
  const [state, setState] = useState<EstimationState>({ data: null, error: null, pending: false });
  
  const aggregateWeights = useMemo(() => {
    return wasteLog.reduce((acc, entry) => {
        acc[entry.type] = (acc[entry.type] || 0) + entry.weight;
        return acc;
    }, {} as Record<string, number>);
  }, [wasteLog]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      plasticWeight: 0,
      organicWeight: 0,
      metalWeight: 0,
      paperWeight: 0,
    },
  });

  useEffect(() => {
    form.reset({
      plasticWeight: parseFloat(aggregateWeights.plastic?.toFixed(2) || '0'),
      organicWeight: parseFloat(aggregateWeights.organic?.toFixed(2) || '0'),
      metalWeight: parseFloat(aggregateWeights.metal?.toFixed(2) || '0'),
      paperWeight: parseFloat(aggregateWeights.paper?.toFixed(2) || '0'),
    });
  }, [aggregateWeights, form]);

  async function onSubmit(values: FormValues) {
    setState({ data: null, error: null, pending: true });
    const result = await getCarbonFootprintEstimation(values);
    if (result.success && result.data) {
      setState({ data: result.data, error: null, pending: false });
    } else {
      setState({ data: null, error: result.error, pending: false });
    }
  }

  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Carbon Footprint Estimator</CardTitle>
        <CardDescription>
          Estimate your carbon footprint reduction based on your sorted waste. 
          The values are pre-filled with the total weight from your waste log.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="plasticWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plastic Waste (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organicWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Organic Waste (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="metalWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Metal Waste (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="paperWeight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paper Waste (kg)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            {state.data && (
              <Card className="bg-primary/10 mt-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-primary">
                    <Sparkles />
                    Estimation Result
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-2xl font-bold">
                    {state.data.carbonFootprintReduction} kg CO₂e
                  </p>
                  <p className="text-sm text-muted-foreground">{state.data.explanation}</p>
                </CardContent>
              </Card>
            )}

            {state.error && <p className="mt-4 text-sm font-medium text-destructive">{state.error}</p>}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={state.pending} className="w-full">
              {state.pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              Estimate Reduction
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
