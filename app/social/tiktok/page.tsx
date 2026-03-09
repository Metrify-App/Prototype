'use client';

import { Users, Eye, Play, Heart, MessageCircle, Share2, TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/app/components/ui/chart';
import { SiTiktok } from '@/app/components/social-icons';
import tiktokData from '@/data/tiktok.json';

const { statsData, followerGrowthData, interactionsData, topTiktoks } = tiktokData;

const ICONS: Record<string, React.ComponentType<any>> = {
    Users, Play, Eye, Heart, MessageCircle, Share2
};

const chartConfig = { followers: { label: 'Followers', color: '#3a675b' } } satisfies ChartConfig;
const interConfig = {
    likes: { label: 'Likes', color: '#fd765f' },
    shares: { label: 'Shares', color: '#abceb9' }
} satisfies ChartConfig;

export default function TiktokPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <SiTiktok size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">TikTok</h1>
                    <p className="text-sm text-[var(--text-muted)]">Global data - Last 28 days</p>
                </div>
            </div>

            <div className="grid grid-cols-6 gap-4">
                {statsData.map((stat: any, i: number) => {
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
                                    <span>{stat.direction === 'up' ? '+' : ''}{stat.trend}%</span>
                                </div>
                            </div>
                            <p className="text-2xl font-bold truncate">{stat.value}</p>
                        </Card>
                    );
                })}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Followers growth</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={chartConfig} className="aspect-[16/7] w-full">
                            <AreaChart data={followerGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillTiktok" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-followers)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-followers)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis domain={['dataMin - 50000', 'dataMax + 50000']} tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000000}M`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} fill="url(#fillTiktok)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Interactions</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={interConfig} className="aspect-[16/7] w-full">
                            <BarChart data={interactionsData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} className="pt-4" />
                                <Bar dataKey="likes" fill="var(--color-likes)" radius={[4, 4, 0, 0]} />
                                <Bar dataKey="shares" fill="var(--color-shares)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6 shadow-none border-[var(--border-light)]">
                <CardHeader>
                    <CardTitle className="text-base font-bold">Trending Videos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                <TableHead className="font-normal text-[var(--text-muted)] w-1/2">TikTok Video</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Views</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Likes</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Comments</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Shares</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topTiktoks.map((tiktok: any) => (
                                <TableRow key={tiktok.id} className="border-[var(--border-light)]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                <SiTiktok size={14} />
                                            </div>
                                            <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">{tiktok.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-sm">{tiktok.views}</TableCell>
                                    <TableCell className="text-right text-sm">{tiktok.likes}</TableCell>
                                    <TableCell className="text-right text-sm">{tiktok.comments}</TableCell>
                                    <TableCell className="text-right text-sm">{tiktok.shares}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

