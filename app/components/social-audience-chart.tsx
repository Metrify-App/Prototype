'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';

export default function SocialAudienceChart({ title, data, config, yAxisFormatter }: any) {
    return (
        <Card className="shadow-none border-[var(--border-light)]">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold truncate">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={config} className="aspect-[21/5] w-full">
                    <AreaChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="fillMax" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--color-max)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--color-max)" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                        <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                        <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={yAxisFormatter} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="max" stroke="var(--color-max)" strokeWidth={2} fill="url(#fillMax)" />
                        <Area type="monotone" dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
