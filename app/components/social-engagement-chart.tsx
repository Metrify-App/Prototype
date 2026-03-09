'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/app/components/ui/chart';

interface BarConfig {
    dataKey: string;
    fill: string;
    radius?: [number, number, number, number];
    stackId?: string;
    maxBarSize?: number;
}

interface SocialEngagementChartProps {
    title: string;
    description?: string;
    data: any[];
    xAxisKey: string;
    bars: BarConfig[];
    config: ChartConfig;
    yAxisFormatter?: (value: number) => string;
}

export default function SocialEngagementChart({
    title, description, data, xAxisKey, bars, config, yAxisFormatter
}: SocialEngagementChartProps) {
    return (
        <Card className="shadow-none border-[var(--border-light)] overflow-hidden">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold truncate">{title}</CardTitle>
                {description && <CardDescription className="text-xs truncate">{description}</CardDescription>}
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={config} className="aspect-[16/7] w-full">
                    <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={yAxisFormatter} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} className="pt-4" />
                        {bars.map(b => (
                            <Bar key={b.dataKey} dataKey={b.dataKey} stackId={b.stackId} fill={b.fill} radius={b.radius} maxBarSize={b.maxBarSize} />
                        ))}
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
