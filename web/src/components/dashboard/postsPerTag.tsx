import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart with text"

type postsPerTagProps = {
  analyticpostsPerTag: any
}

type postsPerTag = {
  idTag: number
  tagName: string
  totalPosts: number
}

export default function PostsPerTagChart({ analyticpostsPerTag }: postsPerTagProps) {
  
  const chartData = analyticpostsPerTag?.map((item: postsPerTag) => ({
    tag: item.tagName,
    totalPosts: item.totalPosts,
    fill: `var(--color-${item.tagName})`, 
  }));


  const chartConfig = {
    totalTags: { 
      label: "Total Tags", 
    },
    ...((analyticpostsPerTag && analyticpostsPerTag.length > 0) ? Object.fromEntries(
      analyticpostsPerTag?.map((item: postsPerTag, index: number) => [
        item.tagName, 
        {
          label: item.tagName,
          color: `hsl(var(--chart-${index}))`, 
        },
      ])
    ): {}),
  };
  return (
    <Card className="flex flex-col max-w-lg">
      <CardHeader className="items-center pb-0">
        <CardTitle>Tags por post</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalPosts"
              nameKey="tag"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {chartData.length}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total Tags
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        {/* <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div> */}
        <div className="leading-none text-muted-foreground">
          Relação de todos os posts por tags
        </div>
      </CardFooter>
    </Card>
  )
}