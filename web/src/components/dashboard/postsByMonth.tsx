import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "A multiple bar chart"

type PostsByMonthProps = {
  analyticPostsByMonth: any
}

export default function PostsByMonthChart({ analyticPostsByMonth }: PostsByMonthProps) {
  
  const getMonthAndYearInPortuguese = (date: Date) => {
    return format(new Date(date), 'MMMM yyyy', { locale: ptBR });
  };

  const monthsOrder = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const formatMonthYearKey = (monthIndex: number, year: number) => {
    return `${monthsOrder[monthIndex]} ${year}`;
  };

  const postsByMonth: { [key: string]: { publicados: number; naoPublicados: number } } = {};

  analyticPostsByMonth?.forEach((post: { createdAt: Date, published: boolean }) => {
    const monthYear = getMonthAndYearInPortuguese(post.createdAt);

    if (!postsByMonth[monthYear]) {
      postsByMonth[monthYear] = { publicados: 0, naoPublicados: 0 };
    }

    if (post.published) {
      postsByMonth[monthYear].publicados += 1;
    } else {
      postsByMonth[monthYear].naoPublicados += 1;
    }
  });

  
  const getLastSixMonthsData = (postsByMonth: { [key: string]: { publicados: number; naoPublicados: number } }) => {
    const today = new Date();
    
    let monthIndex = today.getMonth();
    let year = today.getFullYear();

    const lastSixMonths: string[] = [];

    for (let i = 0; i < 6; i++) {
      const monthYear = formatMonthYearKey(monthIndex, year);
      lastSixMonths.push(monthYear);

      if (monthIndex === 0) {
        monthIndex = 11;
        year -= 1;
      } else {
        monthIndex -= 1;
      }
    }

    return lastSixMonths.reverse().map((monthYear) => ({
      month: monthYear.split(' ')[0], // Pega apenas o nome do mês
      publicados: postsByMonth[monthYear]?.publicados || 0,
      naoPublicados: postsByMonth[monthYear]?.naoPublicados || 0,
    }));
  };

  const chartData = getLastSixMonthsData(postsByMonth);

  const chartConfig = {
    publicados: {
      label: "Publicados",
      color: "hsl(var(--chart-1))",
    },
    naoPublicados: {
      label: "Não Publicados",
      color: "hsl(var(--chart-2))",
    },
  } satisfies ChartConfig

  return (
    <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Posts por mês</CardTitle>
          <CardDescription>
            {chartData[0]?.month[0].toUpperCase() + chartData[0]?.month.substring(1)} 
            { }  - { }
            {chartData[chartData.length - 1]?.month[0].toUpperCase() + chartData[chartData.length - 1]?.month.substring(1)}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="publicados" fill="var(--color-publicados)" radius={4} />
              <Bar dataKey="naoPublicados" fill="var(--color-naoPublicados)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="leading-none text-muted-foreground">
            Posts publicados e não publicados nos últimos 6 meses
          </div>
        </CardFooter>
      </Card>
  )
}