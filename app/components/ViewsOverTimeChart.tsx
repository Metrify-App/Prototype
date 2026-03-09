'use client';

import { Bar, BarChart, XAxis, YAxis, CartesianGrid } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';

interface ViewsOverTimeChartProps {
    data: any[];
}

export function ViewsOverTimeChart({ data }: ViewsOverTimeChartProps) {
    const config = {
        views: { label: 'Views', color: 'var(--text-primary)' }
    } satisfies ChartConfig;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Views over time</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={config}
                    className="aspect-[16/9] w-full"
                >
                    <BarChart
                        data={data}
                        margin={{ top: 5, right: 5, bottom: 0, left: 5 }}
                    >
                        <CartesianGrid
                            vertical={false}
                            stroke="var(--border-light)"
                        />
                        <XAxis
                            dataKey="week"
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            tick={{ fill: 'var(--text-muted)' }}
                        />
                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            tick={{ fill: 'var(--text-muted)' }}
                            tickFormatter={v => `${(v / 1000).toFixed(0)}K`}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="views"
                            radius={[6, 6, 0, 0]}
                            fill="var(--text-primary)"
                            opacity={0.85}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
