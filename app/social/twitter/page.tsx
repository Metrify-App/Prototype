'use client';

import { Users, Eye, Heart, Repeat, MessageCircle, AtSign, TrendingUp, TrendingDown } from 'lucide-react';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/app/components/ui/chart';
import { SiTwitter } from '@/app/components/social-icons';
import twitterData from '@/data/twitter.json';

const { statsData, followerGrowthData, engagementData, topTweets } = twitterData;

const ICONS: Record<string, React.ComponentType<any>> = {
    Users, Eye, Heart, Repeat, MessageCircle, AtSign
};

const growthChartConfig = { followers: { label: 'Followers', color: '#abceb9' } } satisfies ChartConfig;
const engagementChartConfig = {
    likes: { label: 'Likes', color: '#fd765f' },
    retweets: { label: 'Retweets', color: '#3a675b' },
    replies: { label: 'Replies', color: '#023c37' },
} satisfies ChartConfig;

export default function TwitterPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <SiTwitter size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">X / Twitter</h1>
                    <p className="text-sm text-[var(--text-muted)]">Last 30 days statistics</p>
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
                <Card className="shadow-none border-[var(--border-light)] overflow-hidden">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="min-w-0">
                            <CardTitle className="text-base font-bold truncate">Followers growth</CardTitle>
                            <CardDescription className="text-xs truncate">Evolution over the last 12 months</CardDescription>
                        </div>
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
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={growthChartConfig} className="aspect-[16/7] w-full">
                            <AreaChart data={followerGrowthData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="fillFollowers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="var(--color-followers)" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="var(--color-followers)" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} strokeDasharray="" stroke="var(--border-light)" />
                                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={(value) => `${value / 1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Area type="monotone" dataKey="followers" stroke="var(--color-followers)" strokeWidth={2} fill="url(#fillFollowers)" />
                            </AreaChart>
                        </ChartContainer>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-[var(--border-light)] overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Daily engagement</CardTitle>
                        <CardDescription className="text-xs truncate">Likes, retweets and replies</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={engagementChartConfig} className="aspect-[16/7] w-full">
                            <BarChart data={engagementData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} className="pt-4" />
                                <Bar dataKey="likes" fill="var(--color-likes)" radius={[4, 4, 0, 0]} maxBarSize={15} />
                                <Bar dataKey="retweets" fill="var(--color-retweets)" radius={[4, 4, 0, 0]} maxBarSize={15} />
                                <Bar dataKey="replies" fill="var(--color-replies)" radius={[4, 4, 0, 0]} maxBarSize={15} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card className="mt-6 shadow-none border-[var(--border-light)]">
                <CardHeader>
                    <CardTitle className="text-base font-bold">Top tweets</CardTitle>
                    <CardDescription className="text-xs">Top 5 tweets by engagement</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Tweet</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Impressions</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Engagement</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Likes</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Retweets</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Replies</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {topTweets.map((tweet: any) => (
                                <TableRow key={tweet.id} className="border-[var(--border-light)]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                <SiTwitter size={14} />
                                            </div>
                                            <span className="truncate max-w-[300px] font-medium text-sm text-[var(--text-primary)]">{tweet.text}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-sm">{tweet.impressions}</TableCell>
                                    <TableCell className="text-right">
                                        <span className="inline-flex items-center rounded bg-[var(--color-green-light)] px-2 py-0.5 text-xs font-semibold text-[var(--color-green)]">
                                            {tweet.engagement}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right text-sm">{tweet.likes}</TableCell>
                                    <TableCell className="text-right text-sm">{tweet.retweets}</TableCell>
                                    <TableCell className="text-right text-sm">{tweet.replies}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
