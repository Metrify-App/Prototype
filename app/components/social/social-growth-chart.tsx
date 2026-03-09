'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/app/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';

interface SocialGrowthChartProps {
    title: string;
    description?: string;
    data: any[];
    xAxisKey: string;
    yAxisKey: string;
    config: ChartConfig;
    colorId: string;
    yAxisFormatter?: (value: number) => string;
    domain?: [string | number, string | number];
    showSelect?: boolean;
}

export default function SocialGrowthChart({
    title, description, data, xAxisKey, yAxisKey, config, colorId, yAxisFormatter, domain, showSelect
}: SocialGrowthChartProps) {
    const fillId = `fill${colorId}`;
    const colorVar = `var(--color-${colorId})`;

    return (
        <Card className="shadow-none border-[var(--border-light)] overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="min-w-0">
                    <CardTitle className="text-base font-bold truncate">{title}</CardTitle>
                    {description && <CardDescription className="text-xs truncate">{description}</CardDescription>}
                </div>
                {showSelect && (
                    <CardAction className="m-0 shrink-0">
                        <Select defaultValue="12">
                            <SelectTrigger className="h-8 text-xs bg-transparent">
                                <SelectValue placeholder="12 months" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="12">12 months</SelectItem>
                                <SelectItem value="6">6 months</SelectItem>
                                <SelectItem value="3">3 months</SelectItem>
                            </SelectContent>
                        </Select>
                    </CardAction>
                )}
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={config} className="aspect-[16/7] w-full">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={colorVar} stopOpacity={0.4} />
                                <stop offset="95%" stopColor={colorVar} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray={domain ? "3 3" : ""} stroke="var(--border-light)" />
                        <XAxis dataKey={xAxisKey} tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                        <YAxis domain={domain} tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={yAxisFormatter} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey={yAxisKey} stroke={colorVar} strokeWidth={2} fill={`url(#${fillId})`} />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
