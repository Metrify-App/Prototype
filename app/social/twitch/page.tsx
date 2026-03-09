'use client';

import { Users, Eye, Play, Star, MessageSquare, TrendingUp } from 'lucide-react';
import StatsCard from '@/app/components/stats-card';
import SocialAudienceChart from '@/app/components/social-audience-chart';
import { TwitchTable } from '@/app/components/social-tables';
import { SiTwitch } from '@/app/components/social-icons';
import twitchData from '@/data/twitch.json';
import { ChartConfig } from '@/app/components/ui/chart';

const { statsData, viewersData, topStreams } = twitchData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Eye, TrendingUp, Play, Star, MessageSquare };

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
                {statsData.map((stat: any, i: number) => (
                    <StatsCard key={i} label={stat.label} value={stat.value} trend={stat.trend} direction={stat.direction} icon={ICONS[stat.icon] || Users} />
                ))}
            </div>

            <div className="mt-6">
                <SocialAudienceChart title="Stream audience" data={viewersData} config={viewersConfig} yAxisFormatter={(v: number) => `${v/1000}K`} />
            </div>

            <div className="mt-6">
                <TwitchTable data={topStreams} />
            </div>
        </div>
    );
}
