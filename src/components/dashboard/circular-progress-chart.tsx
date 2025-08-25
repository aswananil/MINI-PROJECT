"use client"

import { PieChart, Pie, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

interface CircularProgressChartProps {
  value: number;
}

export default function CircularProgressChart({ value }: CircularProgressChartProps) {
  const data = [
    { name: "Filled", value: value, fill: "hsl(var(--primary))" },
    { name: "Empty", value: 100 - value, fill: "hsl(var(--muted))" },
  ];

  const chartConfig = {
    filled: {
      label: "Filled",
      color: "hsl(var(--primary))",
    },
    empty: {
      label: "Empty",
      color: "hsl(var(--muted))",
    },
  }

  return (
    <div className="relative h-32 w-32">
       <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-full w-full"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel hideIndicator />}
          />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="90%"
            startAngle={90}
            endAngle={450}
            strokeWidth={0}
            paddingAngle={0}
            cornerRadius={50}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-foreground">
          {value.toFixed(0)}%
        </span>
      </div>
    </div>
  );
}
