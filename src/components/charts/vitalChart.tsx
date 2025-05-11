"use client";

import { Bubbles, HeartPulse, Thermometer } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

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

const chartConfig = {
  heartrate: {
    label: "Heart Rate (BPM)",
    color: "var(--chart-1)",
  },
  spo2: {
    label: "Blood Oxygen Level (%)",
    color: "var(--chart-2)",
  },
  temperature: {
    label: "Body Temperature (°F)",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

const yKeys = Object.entries(chartConfig).map(([key, config]) => ({
  key,
  label: config.label,
  color: config.color,
  unit: key === "heartrate" ? "BPM" : key === "spo2" ? "%" : "°F",
}));

export function VitalChart({ data }: { data: any[] }) {
  const issues = yKeys.map((yKey) => {
    const groupedData = data.reduce(
      (acc, item) => {
        const timestamp = new Date(item["time"]).getTime();
        const hour = Math.floor(timestamp / (60 * 60 * 1000));
        if (!acc[hour]) acc[hour] = [];
        acc[hour].push(item[yKey.key]);
        return acc;
      },
      {} as Record<number, number[]>,
    );

    let message = null;

    Object.values(groupedData).forEach((hourlyValues) => {
      const average =
        (hourlyValues as number[]).reduce((sum, value) => sum + value, 0) /
        (hourlyValues as number[]).length;

      if (yKey.key === "heartrate") {
        if (average < 60) {
          message =
            "Heart rate is consistently below the normal range over the past hour, indicating potential bradycardia.";
        } else if (average > 100) {
          message =
            "Heart rate is consistently above the normal range over the past hour, indicating potential tachycardia.";
        }
      } else if (yKey.key === "spo2") {
        if (average < 95) {
          message =
            "SpO2 levels are consistently below the normal range over the past hour, indicating potential hypoxemia.";
        }
      } else if (yKey.key === "temperature") {
        if (average > 99.5) {
          message =
            "Temperature is consistently elevated over the past hour, indicating potential fever.";
        } else if (average < 96.8) {
          message =
            "Temperature is consistently below the normal range over the past hour, indicating potential hypothermia.";
        }
      }
    });

    return { key: yKey.key, message };
  });

  return (
    <Card className="rounded-3xl bg-muted">
      <CardHeader>
        <CardTitle>Patient Vitals Overview</CardTitle>
        <CardDescription>
          A detailed visualization of key patient vitals including heart rate,
          SpO2, and temperature.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-lg">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) =>
                new Date(value).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <defs>
              {yKeys.map((yKey) => (
                <linearGradient
                  key={yKey.key}
                  id={`fill${yKey.key.charAt(0).toUpperCase() + yKey.key.slice(1)}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor={yKey.color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={yKey.color} stopOpacity={0.1} />
                </linearGradient>
              ))}
            </defs>
            {yKeys.map((yKey) => (
              <Area
                key={yKey.key}
                dataKey={yKey.key}
                type="natural"
                fill={`url(#fill${yKey.key.charAt(0).toUpperCase() + yKey.key.slice(1)})`}
                fillOpacity={0.4}
                stroke={yKey.color}
                stackId="a"
              />
            ))}
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-lg flex-col gap-3 text-sm">
          <div className="flex gap-3">
            {issues.map(
              (issue) =>
                issue.message && (
                  <div
                    key={issue.key}
                    className="flex items-center gap-2 font-medium leading-none text-red-500"
                  >
                    <div className="relative group">
                      {issue.key === "heartrate" && (
                        <HeartPulse className="h-5 w-5 text-red-500" />
                      )}
                      {issue.key === "spo2" && (
                        <Bubbles className="h-5 w-5 text-red-500" />
                      )}
                      {issue.key === "temperature" && (
                        <Thermometer className="h-5 w-5 text-red-500" />
                      )}
                      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden group-hover:block bg-white text-black text-xs rounded-md shadow-md p-2 w-lg z-10">
                        {issue.message}
                      </div>
                    </div>
                  </div>
                ),
            )}
          </div>
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            {`Monitoring period: ${new Date(data[0]["time"]).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            )} - ${new Date(data[data.length - 1]["time"]).toLocaleTimeString(
              [],
              {
                hour: "2-digit",
                minute: "2-digit",
              },
            )}`}
            {`, Date: ${new Date(data[0]["time"]).toLocaleDateString(
              undefined,
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )}`}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
