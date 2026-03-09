'use client';

import { Users, Activity, AtSign, Send, Clock, CheckCircle2, AlertCircle, MessageSquare } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/app/components/ui/chart';
import StatsCard from '@/app/components/stats-card';
import { SiTwitter, SiInstagram, SiYoutube, SiTwitch, SiTiktok } from '@/app/components/social-icons';
import communityData from '@/data/community.json';

const { stats, platformData, recentMentions, scheduledPosts } = communityData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Activity, AtSign, Send };

const getPlatformIcon = (platform: string) => {
    switch (platform) {
        case 'Twitter': return <SiTwitter size={14} />;
        case 'Instagram': return <SiInstagram size={14} />;
        case 'YouTube': return <SiYoutube size={14} />;
        case 'Twitch': return <SiTwitch size={14} />;
        case 'TikTok': return <SiTiktok size={14} />;
        default: return <MessageSquare size={14} />;
    }
};

const audienceConfig = {
    audience: { label: 'Audience', color: '#abceb9' },
} satisfies ChartConfig;

export default function CommunityManagerPage() {
    return (
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center gap-4 mb-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <MessageSquare size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold">Community Management</h1>
                    <p className="text-sm text-[var(--text-muted)]">Global overview & pending tasks</p>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {stats.map((stat: any, i: number) => (
                    <StatsCard
                        key={i}
                        label={stat.label}
                        value={stat.value}
                        trend={stat.trend}
                        direction={stat.direction}
                        icon={ICONS[stat.icon] || Users}
                    />
                ))}
            </div>

            <div className="mt-6">
                <Card className="shadow-none border-[var(--border-light)] overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base font-bold truncate">Cross-platform Audience</CardTitle>
                        <CardDescription className="text-xs truncate">Total followers/subscribers per network</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <ChartContainer config={audienceConfig} className="aspect-[21/5] w-full">
                            <BarChart data={platformData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="var(--border-light)" />
                                <XAxis dataKey="platform" tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} />
                                <YAxis tickLine={false} axisLine={false} tickMargin={10} fontSize={11} tick={{ fill: 'var(--text-muted)' }} tickFormatter={v => `${v/1000}K`} />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <Bar dataKey="audience" fill="var(--color-audience)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                            </BarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Recent Mentions Inbox</CardTitle>
                        <CardDescription className="text-xs">Messages that need attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                    <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Message</TableHead>
                                    <TableHead className="font-normal text-[var(--text-muted)]">Sentiment</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {recentMentions.map((mention: any) => (
                                    <TableRow key={mention.id} className="border-[var(--border-light)]">
                                        <TableCell>
                                            <div className="flex items-start gap-3">
                                                <div className="flex mt-0.5 h-6 w-6 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                    {getPlatformIcon(mention.platform)}
                                                </div>
                                                <div className="flex flex-col min-w-0">
                                                    <span className="font-medium text-xs text-[var(--text-primary)]">{mention.user} <span className="text-[var(--text-muted)] font-normal ml-1">· {mention.time}</span></span>
                                                    <span className="truncate max-w-[250px] text-sm text-[var(--text-secondary)]">{mention.message}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider
                                                ${mention.sentiment === 'positive' ? 'bg-[var(--color-green-light)] text-[var(--color-green)]' :
                                                  mention.sentiment === 'negative' ? 'bg-[var(--color-red-light)] text-[var(--color-red)]' :
                                                  'bg-[var(--bg-primary)] text-[var(--text-muted)]'}`}>
                                                {mention.sentiment}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1.5 text-xs">
                                                {mention.status === 'replied' && <CheckCircle2 size={14} className="text-[var(--color-green)]" />}
                                                {mention.status === 'pending' && <Clock size={14} className="text-[#f59e0b]" />}
                                                {mention.status === 'escalated' && <AlertCircle size={14} className="text-[var(--color-red)]" />}
                                                <span className="capitalize">{mention.status}</span>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-[var(--border-light)]">
                    <CardHeader>
                        <CardTitle className="text-base font-bold">Scheduled Posts</CardTitle>
                        <CardDescription className="text-xs">Upcoming content calendar</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent border-[var(--border-light)]">
                                    <TableHead className="font-normal text-[var(--text-muted)] w-1/2">Content</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Date</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Format</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {scheduledPosts.map((post: any) => (
                                    <TableRow key={post.id} className="border-[var(--border-light)]">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[var(--text-muted)]">
                                                    {getPlatformIcon(post.platform)}
                                                </div>
                                                <span className="truncate max-w-[200px] font-medium text-sm text-[var(--text-primary)]">{post.content}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right text-sm">{post.date}</TableCell>
                                        <TableCell className="text-right text-sm text-[var(--text-muted)]">{post.type}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
