'use client';

import { Users, Eye, Heart, MessageCircle, Bookmark, Navigation, TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/app/components/ui/chart';
import { SiInstagram } from '@/app/components/social-icons';
import instagramData from '@/data/instagram.json';

const { statsData, followerGrowthData, reachData, topPosts } = instagramData;

const ICONS: Record<string, React.ComponentType<any>> = {
    Users, Eye, Heart, MessageCircle, Bookmark, Navigation
};

const chartConfig = { followers: { label: 'Followers', color: '#023c37' } } satisfies ChartConfig;
const reachConfig = {
    reels: { label: 'Reels', color: '#fd765f' },
    posts: { label: 'Posts', color: '#3a675b' },
    stories: { label: 'Stories', color: '#abceb9' },
} satisfies ChartConfig;

export default function InstagramPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <SiInstagram size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Instagram</h1>
                    <p className="text-sm text-[var(--text-muted)]">Performance overview - Last 30 days</p>
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
                        <CardTitle className="text-base font-bold truncate">Audience growth</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={chartConfig} className="aspect-[16/7] w-full">
                            <AreaChart data={followerGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillInsta" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-followers)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-followers)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="" stroke="var(--border-light)" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} fill="url(#fillInsta)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Reach by format</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={reachConfig} className="aspect-[16/7] w-full">
                            <BarChart data={reachData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} className="pt-4" />
                                <Bar dataKey="reels" stackId="a" fill="var(--color-reels)" radius={[0, 0, 4, 4]} />
                                <Bar dataKey="posts" stackId="a" fill="var(--color-posts)" />
                                <Bar dataKey="stories" stackId="a" fill="var(--color-stories)" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6 shadow-none border-[var(--border-light)]">
                <CardHeader>
                    <CardTitle className="text-base font-bold">Top Posts</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Post</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Type</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Reach</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Eng. Rate</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Likes</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Comments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topPosts.map((post) => (
                                <TableRow key={post.id} className="border-[var(--border-light)]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                <SiInstagram size={14} />
                                            </div>
                                            <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">{post.text}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right text-sm text-[var(--text-muted)]">{post.type}</TableCell>
                                    <TableCell className="text-right font-bold text-sm">{post.reach}</TableCell>
                                    <TableCell className="text-right">
                                        <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                                            {post.engagement}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-sm">{post.likes}</TableCell>
                                    <TableCell className="text-right text-sm">{post.comments}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
