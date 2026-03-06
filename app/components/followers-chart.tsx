'use client';

import { useState } from 'react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';
import {
    type ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent,
} from './ui/chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from './ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';
import dashboardData from '@/data/dashboard.json';

const { labels, series } = dashboardData.followersChart;

const PERIOD_POINTS: Record<string, number> = {
    '1month': 6,
    '3months': 18,
    '6months': 36,
    '1year': 72,
};

function buildChartData(period: string) {
    const count = PERIOD_POINTS[period] ?? 18;
    const sliceStart = Math.max(0, labels.length - count);
    return labels.slice(sliceStart).map((label, i) => {
        const idx = sliceStart + i;
        const entry: Record<string, string | number> = { date: label };
        for (const s of series) {
            entry[s.name.toLowerCase()] = s.data[idx];
        }
        return entry;
    });
}

const chartConfig = {
    twitter: {
        label: 'Twitter',
        color: '#1d9bf0',
    },
    youtube: {
        label: 'YouTube',
        color: '#ff0000',
    },
    instagram: {
        label: 'Instagram',
        color: '#e1306c',
    },
    tiktok: {
        label: 'TikTok',
        color: '#000000',
    },
    twitch: {
        label: 'Twitch',
        color: '#9146ff',
    },
} satisfies ChartConfig;

export default function FollowersChart() {
    const [period, setPeriod] = useState('3months');
    const chartData = buildChartData(period);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">New followers</CardTitle>
                <CardDescription>
                    Showing total followers for the last{' '}
                    {period === '1month' ? 'month' : period === '3months' ? '3 months' : period === '6months' ? '6 months' : 'year'}
                </CardDescription>
                <CardAction>
                    <Select value={period} onValueChange={setPeriod}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="1month">Last month</SelectItem>
                            <SelectItem value="3months">Last 3 months</SelectItem>
                            <SelectItem value="6months">Last 6 months</SelectItem>
                            <SelectItem value="1year">Last year</SelectItem>
                        </SelectContent>
                    </Select>
                </CardAction>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="mt-4 aspect-[16/5] w-full">
                    <AreaChart data={chartData} margin={{ top: 5, right: 5, bottom: 0, left: 5 }}>
                        <CartesianGrid vertical={false} strokeDasharray="" stroke="var(--border-light)" />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            fontSize={11}
                            tick={{ fill: 'var(--text-muted)' }}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <ChartLegend content={<ChartLegendContent />} />
                        <defs>
                            <linearGradient id="fillTwitter" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-twitter)" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="var(--color-twitter)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="fillYoutube" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-youtube)" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="var(--color-youtube)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="fillInstagram" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-instagram)" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="var(--color-instagram)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="fillTiktok" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-tiktok)" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="var(--color-tiktok)" stopOpacity={0.02} />
                            </linearGradient>
                            <linearGradient id="fillTwitch" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="var(--color-twitch)" stopOpacity={0.15} />
                                <stop offset="100%" stopColor="var(--color-twitch)" stopOpacity={0.02} />
                            </linearGradient>
                        </defs>
                        <Area
                            dataKey="twitter"
                            type="monotone"
                            fill="url(#fillTwitter)"
                            stroke="var(--color-twitter)"
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="youtube"
                            type="monotone"
                            fill="url(#fillYoutube)"
                            stroke="var(--color-youtube)"
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="instagram"
                            type="monotone"
                            fill="url(#fillInstagram)"
                            stroke="var(--color-instagram)"
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="tiktok"
                            type="monotone"
                            fill="url(#fillTiktok)"
                            stroke="var(--color-tiktok)"
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="twitch"
                            type="monotone"
                            fill="url(#fillTwitch)"
                            stroke="var(--color-twitch)"
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
