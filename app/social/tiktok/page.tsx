'use client';

import { Users, Eye, Play, Heart, MessageCircle, Share2 } from 'lucide-react';
import StatsCard from '@/app/components/stats-card';
import SocialGrowthChart from '@/app/components/social-growth-chart';
import SocialEngagementChart from '@/app/components/social-engagement-chart';
import { TiktokTable } from '@/app/components/social-tables';
import { SiTiktok } from '@/app/components/social-icons';
import tiktokData from '@/data/tiktok.json';
import { ChartConfig } from '@/app/components/ui/chart';

const { statsData, followerGrowthData, interactionsData, topTiktoks } = tiktokData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Play, Eye, Heart, MessageCircle, Share2 };

const growthConfig = { followers: { label: 'Followers', color: '#3a675b' } } satisfies ChartConfig;
const interConfig = {
    likes: { label: 'Likes', color: '#fd765f' },
    shares: { label: 'Shares', color: '#abceb9' }
} satisfies ChartConfig;

const interBars = [
    { dataKey: 'likes', fill: 'var(--color-likes)', radius: [4, 4, 0, 0] as [number, number, number, number] },
    { dataKey: 'shares', fill: 'var(--color-shares)', radius: [4, 4, 0, 0] as [number, number, number, number] }
];

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
                {statsData.map((stat: any, i: number) => (
                    <StatsCard key={i} label={stat.label} value={stat.value} trend={stat.trend} direction={stat.direction} icon={ICONS[stat.icon] || Users} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <SocialGrowthChart title="Followers growth" data={followerGrowthData} xAxisKey="week" yAxisKey="followers" config={growthConfig} colorId="followers" domain={['dataMin - 50000', 'dataMax + 50000']} yAxisFormatter={v => `${v/1000000}M`} />
                <SocialEngagementChart title="Interactions" data={interactionsData} xAxisKey="day" bars={interBars} config={interConfig} yAxisFormatter={v => `${v/1000}K`} />
            </div>

            <div className="mt-6">
                <TiktokTable data={topTiktoks} />
            </div>
        </div>
    );
}
