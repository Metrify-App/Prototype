'use client';

import { Users, Eye, Clock, ThumbsUp, MessageCircle, Share2, TrendingUp, TrendingDown, Video } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';
import { SiYoutube } from '@/app/components/social-icons';
import youtubeData from '@/data/youtube.json';

const { statsData, subData, viewsData, topVideos } = youtubeData;

const ICONS: Record<string, React.ComponentType<any>> = {
    Users, Eye, Clock, ThumbsUp, MessageCircle, Share2
};

const subConfig = { subs: { label: 'Subscribers', color: '#fd765f' } } satisfies ChartConfig;
const viewsConfig = { views: { label: 'Views', color: '#3a675b' } } satisfies ChartConfig;

export default function YoutubePage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <SiYoutube size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">YouTube</h1>
                    <p className="text-sm text-[var(--text-muted)]">Analytics data - Last 28 days</p>
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

            <div className="mt-6 grid grid-cols-2 gap-6">
                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Subscribers evolution</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={subConfig} className="aspect-[16/7] w-full">
                            <AreaChart data={subData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillSubs" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-subs)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-subs)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis domain={['dataMin - 10000', 'dataMax + 10000']} tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="subs" stroke="var(--color-subs)" strokeWidth={2} fill="url(#fillSubs)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Traffic sources (Views)</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={viewsConfig} className="aspect-[16/7] w-full">
                            <BarChart data={viewsData} layout="vertical" margin={{ top: 10, right: 0, left: 20, bottom: 0 }}>
                                <CartesianGrid horizontal={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis type="number" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000000}M`} />
                                <YAxis type="category" dataKey="source" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="views" fill="var(--color-views)" radius={[0, 4, 4, 0]} barSize={24} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6 shadow-none border-[var(--border-light)]">
                <CardHeader>
                    <CardTitle className="text-base font-bold">Top Videos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Video</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Views</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Watch time</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Likes</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">CTR</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topVideos.map((video) => (
                                <TableRow key={video.id} className="border-[var(--border-light)]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                <SiYoutube size={14} />
                                            </div>
                                            <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">{video.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-sm">{video.views}</TableCell>
                                    <TableCell className="text-right text-sm text-[var(--text-muted)]">{video.watchTime}</TableCell>
                                    <TableCell className="text-right text-sm">{video.likes}</TableCell>
                                    <TableCell className="text-right">
                                        <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                                            {video.ctr}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
