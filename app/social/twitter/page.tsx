'use client';

import { Users, Eye, Heart, Repeat, MessageCircle, AtSign } from 'lucide-react';
import StatsCard from '@/app/components/stats-card';
import SocialGrowthChart from '@/app/components/social-growth-chart';
import SocialEngagementChart from '@/app/components/social-engagement-chart';
import { TwitterTable } from '@/app/components/social-tables';
import { SiTwitter } from '@/app/components/social-icons';
import twitterData from '@/data/twitter.json';
import { ChartConfig } from '@/app/components/ui/chart';

const { statsData, followerGrowthData, engagementData, topTweets } = twitterData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Eye, Heart, Repeat, MessageCircle, AtSign };

const growthConfig = { followers: { label: 'Followers', color: '#abceb9' } } satisfies ChartConfig;
const engConfig = {
    likes: { label: 'Likes', color: '#fd765f' },
    retweets: { label: 'Retweets', color: '#3a675b' },
    replies: { label: 'Replies', color: '#023c37' },
} satisfies ChartConfig;

const engBars = [
    { dataKey: 'likes', fill: 'var(--color-likes)', radius: [4, 4, 0, 0] as [number, number, number, number], maxBarSize: 15 },
    { dataKey: 'retweets', fill: 'var(--color-retweets)', radius: [4, 4, 0, 0] as [number, number, number, number], maxBarSize: 15 },
    { dataKey: 'replies', fill: 'var(--color-replies)', radius: [4, 4, 0, 0] as [number, number, number, number], maxBarSize: 15 }
];

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
                {statsData.map((stat: any, i: number) => (
                    <StatsCard key={i} label={stat.label} value={stat.value} trend={stat.trend} direction={stat.direction} icon={ICONS[stat.icon] || Users} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <SocialGrowthChart title="Followers growth" description="Evolution over the last 12 months" data={followerGrowthData} xAxisKey="month" yAxisKey="followers" config={growthConfig} colorId="followers" showSelect yAxisFormatter={v => `${v/1000}K`} />
                <SocialEngagementChart title="Daily engagement" description="Likes, retweets and replies" data={engagementData} xAxisKey="day" bars={engBars} config={engConfig} />
            </div>

            <div className="mt-6">
                <TwitterTable data={topTweets} />
            </div>
        </div>
    );
}
