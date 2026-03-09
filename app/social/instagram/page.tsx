'use client';

import { Users, Eye, Heart, MessageCircle, Bookmark, Navigation } from 'lucide-react';
import StatsCard from '@/app/components/stats-card';
import SocialGrowthChart from '@/app/components/social/social-growth-chart';
import SocialEngagementChart from '@/app/components/social/social-engagement-chart';
import { InstagramTable } from '@/app/components/social/social-tables';
import { SiInstagram } from '@/app/components/social/social-icons';
import instagramData from '@/data/instagram.json';
import { ChartConfig } from '@/app/components/ui/chart';

const { statsData, followerGrowthData, reachData, topPosts } = instagramData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Eye, Heart, MessageCircle, Bookmark, Navigation };

const growthConfig = { followers: { label: 'Followers', color: '#023c37' } } satisfies ChartConfig;
const reachConfig = {
    reels: { label: 'Reels', color: '#fd765f' },
    posts: { label: 'Posts', color: '#3a675b' },
    stories: { label: 'Stories', color: '#abceb9' },
} satisfies ChartConfig;

const reachBars = [
    { dataKey: 'reels', fill: 'var(--color-reels)', radius: [0, 0, 4, 4] as [number, number, number, number], stackId: 'a' },
    { dataKey: 'posts', fill: 'var(--color-posts)', stackId: 'a' },
    { dataKey: 'stories', fill: 'var(--color-stories)', radius: [4, 4, 0, 0] as [number, number, number, number], stackId: 'a' }
];

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
                {statsData.map((stat: any, i: number) => (
                    <StatsCard key={i} label={stat.label} value={stat.value} trend={stat.trend} direction={stat.direction} icon={ICONS[stat.icon] || Users} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <SocialGrowthChart title="Audience growth" data={followerGrowthData} xAxisKey="month" yAxisKey="followers" config={growthConfig} colorId="followers" yAxisFormatter={v => `${v/1000}K`} />
                <SocialEngagementChart title="Reach by format" data={reachData} xAxisKey="day" bars={reachBars} config={reachConfig} yAxisFormatter={v => `${v/1000}K`} />
            </div>

            <div className="mt-6">
                <InstagramTable data={topPosts} />
            </div>
        </div>
    );
}
