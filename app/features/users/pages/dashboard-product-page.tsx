import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import type { Route } from "./+types/dashboard-product-page";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "~/common/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Analytics | wemake" },
    { name: "description", content: "Product Analytics" },
  ];
};

const chartData = [
  { month: "January", views: 186, visitors: 150 },
  { month: "February", views: 305, visitors: 50 },
  { month: "March", views: 237, visitors: 110 },
  { month: "April", views: 73, visitors: 37 },
  { month: "May", views: 209, visitors: 16 },
  { month: "June", views: 214, visitors: 84 },
];

const chartConfig = {
  views: {
    label: "Page Views",
    color: "var(--primary)",
  },
  visitors: {
    label: "Visitors",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export default function DashboardProductPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
                wrapperStyle={{
                  minWidth: "100px",
                }}
              />
              <Area
                dataKey="views"
                type="natural"
                stroke="var(--color-views)"
                fill="var(--color-views)"
                strokeWidth={2}
                dot={false}
              />
              <Area
                dataKey="visitors"
                type="natural"
                stroke="var(--color-visitors)"
                fill="var(--color-visitors)"
                strokeWidth={2}
                dot={false}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
