'use client';

import { Users, Eye, Play, Star, MessageSquare, TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';
import { SiTwitch } from '@/app/components/social-icons';
import twitchData from '@/data/twitch.json';

const { statsData, viewersData, topStreams } = twitchData;

const ICONS: Record<string, React.ComponentType<any>> = {
    Users, Eye, TrendingUp, Play, Star, MessageSquare
};

const viewersConfig = {
    max: { label: 'Peak Viewers', color: '#023c37' },
    avg: { label: 'Average', color: '#abceb9' }
} satisfies ChartConfig;

export default function TwitchPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <SiTwitch size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Twitch</h1>
                    <p className="text-sm text-[var(--text-muted)]">Last 30 days performance</p>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
                {statsData.map((stat, i) => {
                    const Icon = ICONS[stat.icon] || Users;
                    const TrendIcon = stat.direction === 'up' ? TrendingUp : TrendingDown;

                    return (
                        <Card key={i} className="py-4 px-4 gap-2 border-[var(--border-light)] shadow-none overflow-hidden">
                            <div className="flex items-start justify-between mb-4 gap-2">
                                <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)] min-w-0">
                                    <Icon size={16} className="shrink-0 mt-0.5" />
                                    <span className="leading-tight break-words">{stat.label}</span>
                                </div>
                                <div className={`flex shrink-0 items-center gap-1 text-xs font-medium ${stat.direction === 'up' ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'}`}>
                                    <TrendIcon size={14} />
                                    <span >{stat.direction === 'up' ? '+' : ''}{stat.trend}%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold truncate">{stat.value}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-6">
                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Stream audience</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={viewersConfig} className="aspect-[21/5] w-full">
                            <AreaChart data={viewersData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillMax" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-max)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-max)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="max" stroke="var(--color-max)" strokeWidth={2} fill="url(#fillMax)" />
                                <Area type="monotone" dataKey="avg" stroke="var(--color-avg)" strokeWidth={2} fill="transparent" strokeDasharray="5 5" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6 shadow-none border-[var(--border-light)]">
                <CardHeader>
                    <CardTitle className="text-base font-bold">Latest streams</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Stream</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Category</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Peak Viewers</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Avg Viewers</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Duration</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topStreams.map((stream) => (
                                <TableRow key={stream.id} className="border-[var(--border-light)]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                <SiTwitch size={14} />
                                            </div>
                                            <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">{stream.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-[var(--text-muted)]">{stream.category}</TableCell>
                                    <TableCell className="text-right font-bold text-sm text-[#9146ff]">{stream.maxViewers}</TableCell>
                                    <TableCell className="text-right text-sm">{stream.avgViewers}</TableCell>
                                    <TableCell className="text-right text-sm text-[var(--text-muted)]">{stream.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
