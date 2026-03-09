'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';

export default function SocialTrafficChart({ title, data, config, yAxisFormatter }: any) {
    return (
        <Card className="shadow-none border-[var(--border-light)]">
            <CardHeader className="pb-2">
                <CardTitle className="text-base font-bold truncate">{title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
                <ChartContainer config={config} className="aspect-[16/7] w-full">
                    <BarChart data={data} layout="vertical" margin={{ top: 10, right: 0, left: 20, bottom: 0 }}>
                        <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                        <XAxis type="number" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={yAxisFormatter} />
                        <YAxis type="category" dataKey="source" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="views" fill="var(--color-views)" radius={[0, 4, 4, 0]} barSize={24} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
