"use client";

import {
  HeartPulse,
  Bubbles,
  Thermometer,
  Activity,
  ShieldCheck,
  BatteryCharging,
} from "lucide-react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { JSX } from "react";

const chartConfig = {
  value: {
    label: "Value",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const getMetricIcon = (metric: string): JSX.Element | null => {
  const icons: Record<string, JSX.Element> = {
    cardiovascular_stress_index: (
      <HeartPulse className="h-4 w-4 text-muted-foreground" />
    ),
    oxygen_efficiency_score: (
      <Bubbles className="h-4 w-4 text-muted-foreground" />
    ),
    thermoregulation_index: (
      <Thermometer className="h-4 w-4 text-muted-foreground" />
    ),
    vital_sign_stability_score: (
      <ShieldCheck className="h-4 w-4 text-muted-foreground" />
    ),
    deviation_from_baseline: (
      <Activity className="h-4 w-4 text-muted-foreground" />
    ),
    fatigue_recovery_score: (
      <BatteryCharging className="h-4 w-4 text-muted-foreground" />
    ),
    metabolic_activity_proxy: (
      <Activity className="h-4 w-4 text-muted-foreground" />
    ),
  };

  return icons[metric] ?? null;
};

export function AnalysisChart({
  data,
}: {
  data: {
    cardiovascular_stress_index: number | string;
    oxygen_efficiency_score: number | string;
    thermoregulation_index: number | string;
    vital_sign_stability_score: number | string;
    deviation_from_baseline: number | string;
    fatigue_recovery_score: number | string;
    metabolic_activity_proxy: number | string;
  };
}) {
  const chartData = Object.entries(data).map(([key, value]) => ({
    metric: key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    value: value,
  }));

  return (
    <Card className="rounded-3xl bg-muted">
      <CardHeader className="items-center pb-4">
        <CardTitle>Health Metrics Radar Chart</CardTitle>
        <CardDescription>
          Visualizing key health metrics for better insights
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px] w-80"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid className="opacity-80" />
            <PolarAngleAxis dataKey="metric" />
            <Radar dataKey="value" fill="var(--chart-4)" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-4 text-sm overflow-scroll h-8 snap-y snap-proximity no-scrollbar scroll-auto">
        {chartData.map((item) => (
          <div
            key={item.metric}
            className="flex items-center gap-2 font-medium leading-none snap-center h-8"
          >
            {getMetricIcon(item.metric)}
            <span>{item.metric}</span>
            <span className="ml-auto text-muted-foreground">
              {Math.round(Number(item.value) * 100) / 100}%
            </span>
          </div>
        ))}
      </CardFooter>
    </Card>
  );
}
