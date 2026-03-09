'use client';

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Cell } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';

interface ViewsByPlatformChartProps {
    data: any[];
    config: ChartConfig;
}

export function ViewsByPlatformChart({ data, config }: ViewsByPlatformChartProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-base">Views by platform</CardTitle>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    config={config}
                    className="aspect-[16/9] w-full"
                >
                    <BarChart
                        data={data}
                        layout="vertical"
                        margin={{ top: 5, right: 20, bottom: 0, left: 5 }}
                    >
                        <CartesianGrid
                            horizontal={false}
                            stroke="var(--border-light)"
                        />
                        <XAxis
                            type="number"
                            tickLine={false}
                            axisLine={false}
                            fontSize={11}
                            tick={{ fill: 'var(--text-muted)' }}
                            tickFormatter={v => `${(v / 1000).toFixed(0)}K`}
                        />
                        <YAxis
                            type="category"
                            dataKey="platform"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            tick={{ fill: 'var(--text-secondary)' }}
                            width={80}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar
                            dataKey="views"
                            radius={[0, 6, 6, 0]}
                        >
                            {data.map((entry: any, index: number) => (
                                <Cell
                                    key={index}
                                    fill={entry.fill}
                                    opacity={0.85}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
