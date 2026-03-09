'use client';

import { Users, Eye, Clock, ThumbsUp, MessageCircle, Share2 } from 'lucide-react';
import StatsCard from '@/app/components/stats-card';
import SocialGrowthChart from '@/app/components/social/social-growth-chart';
import SocialTrafficChart from '@/app/components/social/social-traffic-chart';
import { YoutubeTable } from '@/app/components/social/social-tables';
import { SiYoutube } from '@/app/components/social/social-icons';
import youtubeData from '@/data/youtube.json';
import { ChartConfig } from '@/app/components/ui/chart';

const { statsData, subData, viewsData, topVideos } = youtubeData;

const ICONS: Record<string, React.ComponentType<any>> = { Users, Eye, Clock, ThumbsUp, MessageCircle, Share2 };

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
                {statsData.map((stat: any, i: number) => (
                    <StatsCard key={i} label={stat.label} value={stat.value} trend={stat.trend} direction={stat.direction} icon={ICONS[stat.icon] || Users} />
                ))}
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <SocialGrowthChart title="Subscribers evolution" data={subData} xAxisKey="week" yAxisKey="subs" config={subConfig} colorId="subs" domain={['dataMin - 10000', 'dataMax + 10000']} yAxisFormatter={v => `${v/1000}K`} />
                <SocialTrafficChart title="Traffic sources (Views)" data={viewsData} config={viewsConfig} yAxisFormatter={(v: number) => `${v/1000000}M`} />
            </div>

            <div className="mt-6">
                <YoutubeTable data={topVideos} />
            </div>
        </div>
    );
}
