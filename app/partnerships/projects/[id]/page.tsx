'use client';

import { use } from 'react';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';
import {
    ArrowLeft,
    DollarSign,
    Eye,
    Users,
    BarChart3,
    FileText,
    ScanEye,
    Heart,
    MessageCircle,
    Calendar,
    MessagesSquare,
    ThumbsUp,
    Minus,
    ThumbsDown,
    Download,
    Mic,
    Trophy,
    Share2,
    Play
} from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { SiYoutube, SiTwitter, SiInstagram, SiTiktok, SiTwitch } from '@/app/components/social-icons';
import { ViewsOverTimeChart } from '@/app/components/ViewsOverTimeChart';
import { ViewsByPlatformChart } from '@/app/components/ViewsByPlatformChart';

import projectsData from '@/data/projects.json';
import projectDetails from '@/data/project-details.json';

const PLATFORM_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    youtube: SiYoutube,
    twitter: SiTwitter,
    instagram: SiInstagram,
    tiktok: SiTiktok,
    twitch: SiTwitch
};

const PLATFORM_COLORS: Record<string, string> = {
    youtube: '#ff0000',
    twitter: '#1d9bf0',
    instagram: '#e1306c',
    tiktok: '#000000',
    twitch: '#9146ff'
};

const PLATFORM_LABELS: Record<string, string> = {
    youtube: 'YouTube',
    twitter: 'Twitter',
    instagram: 'Instagram',
    tiktok: 'TikTok',
    twitch: 'Twitch'
};

const SENTIMENT_CONFIG = {
    positive: { label: 'Positive', color: 'text-[var(--color-green)]', bg: 'bg-[var(--color-green-light)]', icon: ThumbsUp },
    neutral: { label: 'Neutral', color: 'text-amber-600', bg: 'bg-amber-50', icon: Minus },
    negative: { label: 'Negative', color: 'text-[var(--color-red)]', bg: 'bg-[var(--color-red-light)]', icon: ThumbsDown }
} as const;

function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}

function StatCard({
    icon: Icon,
    label,
    value,
    sub
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    sub?: string;
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)]">
                    <Icon
                        size={18}
                        className="text-[var(--text-muted)]"
                    />
                </div>
                <div>
                    <p className="text-xs text-[var(--text-muted)]">{label}</p>
                    <p className="text-xl font-bold text-[var(--text-primary)]">{value}</p>
                    {sub && <p className="text-xs text-[var(--text-muted)]">{sub}</p>}
                </div>
            </CardContent>
        </Card>
    );
}

function LogoAppearanceRing({ percentage, label = 'Logo visibility' }: { percentage: number; label?: string }) {
    const radius = 40;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center gap-2">
            <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                aria-label={`${label} : ${percentage}%`}
                role="img"
            >
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="var(--border-light)"
                    strokeWidth="8"
                />
                <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="var(--text-primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                />
                <text
                    x="50"
                    y="50"
                    textAnchor="middle"
                    dominantBaseline="central"
                    className="fill-[var(--text-primary)] text-lg font-bold"
                >
                    {percentage}%
                </text>
            </svg>
            <p className="text-xs text-[var(--text-muted)]">{label}</p>
        </div>
    );
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const project = projectsData.projects.find(p => p.id === id);
    const details = (projectDetails as any)[id];

    if (!project || !details) {
        return (
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/partnerships/projects"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                    <ArrowLeft size={16} />
                    Back to projects
                </Link>
                <p className="mt-8 text-[var(--text-muted)]">Project not found.</p>
            </div>
        );
    }

    const viewsChartData = details.engagementOverTime.labels.map((label: string, i: number) => ({
        week: label,
        views: details.engagementOverTime.views[i],
        engagement: details.engagementOverTime.engagement[i]
    }));

    const platformChartConfig = Object.fromEntries(
        details.platformStats.map((s: any) => [s.platform, { label: PLATFORM_LABELS[s.platform], color: PLATFORM_COLORS[s.platform] }])
    );

    const platformViewsData = details.platformStats.map((s: any) => ({
        platform: PLATFORM_LABELS[s.platform],
        views: parseInt(s.views.replace(/[^0-9]/g, '')) * (s.views.includes('M') ? 1000 : 1),
        fill: PLATFORM_COLORS[s.platform]
    }));

    const bestLogoPlatform = details.platformStats.reduce((prev: any, curr: any) =>
        parseInt(curr.logoAppearance) > parseInt(prev.logoAppearance) ? curr : prev
    );
    const bestVocalPlatform = details.platformStats.reduce((prev: any, curr: any) =>
        (curr.vocalMentions || 0) > (prev.vocalMentions || 0) ? curr : prev
    );

    return (
        <div className="mx-auto max-w-7xl">
            {/* Top Navigation */}
            <Link
                href="/partnerships/projects"
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
                <ArrowLeft size={16} />
                Back to projects
            </Link>

            {/* Header with Title and Actions */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {project.logo ? (
                        <div className="relative h-14 w-14 overflow-hidden rounded-xl">
                            <Image
                                src={project.logo}
                                alt={`${project.name} logo`}
                                fill
                                className="object-cover"
                                sizes="56px"
                                priority
                            />
                        </div>
                    ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--sidebar-active)] text-lg font-bold">
                            {project.name.charAt(0)}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-bold">{project.name}</h1>
                        <div className="flex items-center gap-1 text-sm text-[var(--text-muted)]">
                            <Calendar size={14} />
                            {formatDate(project.startDate)} - {project.endDate ? formatDate(project.endDate) : 'In progress'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-lg border border-[var(--border-light)] bg-transparent px-4 py-2 text-sm font-medium text-[var(--text-primary)] transition-colors hover:bg-[var(--bg-primary)]">
                        <Share2 size={16} />
                        Share
                    </button>
                    <button className="flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-4 py-2 text-sm font-medium text-[var(--bg-card)] transition-opacity hover:opacity-90">
                        <Download size={16} />
                        Export
                    </button>
                </div>
            </div>

            {/* SECTION 1: GENERAL PERFORMANCE */}
            <h2 className="mt-10 text-xl font-bold">General Performance</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Core metrics regarding reach, engagement and media value.</p>

            <div className="mt-4 grid grid-cols-5 gap-4">
                <StatCard
                    icon={DollarSign}
                    label="Media Value"
                    value={details.overview.mediaValue}
                />
                <StatCard
                    icon={Eye}
                    label="Total Views"
                    value={details.overview.totalViews}
                />
                <StatCard
                    icon={Users}
                    label="Followers"
                    value={details.overview.totalFollowers}
                />
                <StatCard
                    icon={BarChart3}
                    label="Engagement"
                    value={details.overview.engagementRate}
                />
                <StatCard
                    icon={FileText}
                    label="Posts"
                    value={details.overview.totalPosts}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <ViewsByPlatformChart
                    data={platformViewsData}
                    config={platformChartConfig}
                />

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Platform Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-normal text-[var(--text-muted)]">Platform</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Views</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Followers</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Eng.</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Value</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {details.platformStats.map((s: any) => {
                                    const Icon = PLATFORM_ICONS[s.platform];
                                    return (
                                        <TableRow key={s.platform}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    {Icon && (
                                                        <Icon
                                                            size={14}
                                                            className="text-[var(--text-muted)]"
                                                        />
                                                    )}
                                                    <span>{PLATFORM_LABELS[s.platform]}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right">{s.views}</TableCell>
                                            <TableCell
                                                className={`text-right font-medium ${s.followers.startsWith('-') ? 'text-[var(--color-red)]' : 'text-[var(--color-green)]'}`}
                                            >
                                                {s.followers}
                                            </TableCell>
                                            <TableCell className="text-right">{s.engagement}</TableCell>
                                            <TableCell className="text-right">{s.mediaValue}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <ViewsOverTimeChart data={viewsChartData} />
            </div>

            <Card className="mt-6">
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base">All Content ({details.posts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="font-normal text-[var(--text-muted)]">Content</TableHead>
                                <TableHead className="font-normal text-[var(--text-muted)]">Author</TableHead>
                                <TableHead className="font-normal text-[var(--text-muted)]">Date</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Views</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Eng.</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Logo</TableHead>
                                <TableHead className="text-right font-normal text-[var(--text-muted)]">Speech</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {details.posts.map((post: any) => {
                                const Icon = PLATFORM_ICONS[post.platform];
                                return (
                                    <TableRow key={post.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-9 w-16 shrink-0 overflow-hidden rounded bg-[var(--bg-primary)]">
                                                    <Image
                                                        src={post.thumbnail}
                                                        alt={post.title}
                                                        fill
                                                        className="object-cover"
                                                        sizes="64px"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-1.5 min-w-0">
                                                    {Icon && (
                                                        <Icon
                                                            size={13}
                                                            className="shrink-0 text-[var(--text-muted)]"
                                                        />
                                                    )}
                                                    <span className="truncate text-sm font-medium">{post.title}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-[var(--text-secondary)]">{post.author}</TableCell>
                                        <TableCell className="text-sm text-[var(--text-muted)]">{formatDate(post.date)}</TableCell>
                                        <TableCell className="text-right text-sm">{post.views}</TableCell>
                                        <TableCell className="text-right text-sm">{post.engagement}</TableCell>
                                        <TableCell className="text-right">
                                            <span
                                                className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${parseInt(post.logoAppearance) >= 80 ? 'bg-[var(--color-green-light)] text-[var(--color-green)]' : parseInt(post.logoAppearance) >= 60 ? 'bg-amber-50 text-amber-600' : 'bg-[var(--color-red-light)] text-[var(--color-red)]'}`}
                                            >
                                                {post.logoAppearance}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-1 text-sm font-medium">
                                                <Mic
                                                    size={12}
                                                    className="text-[var(--text-muted)]"
                                                />
                                                {post.vocalMentions || 0}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* SECTION 2: BRAND VISIBILITY */}
            <h2 className="mt-10 text-xl font-bold">Brand Visibility</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">AI-powered analysis of brand logo exposure and verbal mentions.</p>

            <div className="mt-4 grid grid-cols-4 gap-4">
                <StatCard
                    icon={ScanEye}
                    label="Avg. Logo Visibility"
                    value={details.overview.logoAppearance}
                />
                <StatCard
                    icon={Mic}
                    label="Total Vocal Mentions"
                    value={details.overview.vocalMentions || '0'}
                />
                <StatCard
                    icon={Trophy}
                    label="Best Platform (Logo)"
                    value={PLATFORM_LABELS[bestLogoPlatform.platform]}
                />
                <StatCard
                    icon={Trophy}
                    label="Best Platform (Vocal)"
                    value={PLATFORM_LABELS[bestVocalPlatform.platform]}
                />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Logo Exposure Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center gap-8 py-6">
                        <LogoAppearanceRing percentage={parseInt(details.overview.logoAppearance)} />
                        <div className="w-full space-y-3">
                            {details.platformStats.map((s: any) => {
                                const Icon = PLATFORM_ICONS[s.platform];
                                return (
                                    <div
                                        key={s.platform}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <div className="flex w-28 items-center gap-2">
                                            {Icon && (
                                                <Icon
                                                    size={14}
                                                    className="text-[var(--text-muted)]"
                                                />
                                            )}
                                            <span className="text-[var(--text-secondary)]">{PLATFORM_LABELS[s.platform]}</span>
                                        </div>
                                        <div className="flex items-center gap-3 flex-1 pr-4">
                                            <div className="h-1.5 flex-1 rounded-full bg-[var(--bg-primary)] overflow-hidden">
                                                <div
                                                    className="h-full bg-[var(--text-primary)]"
                                                    style={{ width: s.logoAppearance }}
                                                />
                                            </div>
                                        </div>
                                        <span className="font-medium w-12 text-right">{s.logoAppearance}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Vocal Recognition Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 pt-2 flex flex-col items-center">
                        <div className="h-[200px] w-full relative flex items-center justify-center">
                            <PieChart
                                width={220}
                                height={220}
                            >
                                <Tooltip
                                    cursor={false}
                                    content={({ active, payload }) => {
                                        if (active && payload && payload.length) {
                                            const data = payload[0].payload;
                                            return (
                                                <div className="rounded-lg border border-[var(--border-light)] bg-[var(--bg-card)] p-2 shadow-md">
                                                    <div className="flex items-center gap-2">
                                                        <div
                                                            className="h-2 w-2 rounded-full"
                                                            style={{ backgroundColor: data.fill }}
                                                        />
                                                        <span className="text-xs font-medium text-[var(--text-primary)]">
                                                            {PLATFORM_LABELS[data.name as string]}
                                                        </span>
                                                        <span className="text-xs font-bold text-[var(--text-primary)]">{payload[0].value}</span>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    }}
                                />
                                <Pie
                                    data={details.platformStats.map((s: any) => ({
                                        name: s.platform,
                                        value: parseInt(s.vocalMentions) || 0,
                                        fill: PLATFORM_COLORS[s.platform]
                                    }))}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={55}
                                    outerRadius={80}
                                    strokeWidth={3}
                                    stroke="var(--bg-card)"
                                    paddingAngle={2}
                                    isAnimationActive={true}
                                >
                                    {details.platformStats.map((s: any, index: number) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={PLATFORM_COLORS[s.platform]}
                                            className="outline-none"
                                        />
                                    ))}
                                </Pie>
                            </PieChart>
                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                <span className="text-2xl font-bold block text-[var(--text-primary)] leading-none">
                                    {details.overview.vocalMentions}
                                </span>
                                <span className="text-[9px] uppercase tracking-tighter text-[var(--text-muted)] font-semibold mt-0.5">Mentions</span>
                            </div>
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-12 gap-y-1.5 w-full px-8">
                            {details.platformStats.map((s: any) => (
                                <div
                                    key={s.platform}
                                    className="flex items-center gap-2 text-sm"
                                >
                                    <div
                                        className="h-2.5 w-2.5 rounded-full"
                                        style={{ backgroundColor: PLATFORM_COLORS[s.platform] }}
                                    />
                                    <span className="text-[var(--text-secondary)] font-medium">{PLATFORM_LABELS[s.platform]}</span>
                                    <span className="text-[var(--text-muted)] ml-auto font-mono">{s.vocalMentions || 0}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Vocal Clips Section */}
            {details.vocalClips && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-base">Speech Recognition Clips ({details.vocalClips.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-4 gap-6">
                            {details.vocalClips.map((clip: any) => {
                                const Icon = PLATFORM_ICONS[clip.platform];
                                return (
                                    <div
                                        key={clip.id}
                                        className="flex flex-col group cursor-pointer"
                                    >
                                        <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black mb-3">
                                            <Image
                                                src={clip.thumbnail}
                                                alt={clip.title}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 25vw"
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
                                                    <Play
                                                        size={16}
                                                        fill="white"
                                                    />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 text-[11px] font-medium text-white">
                                                {clip.timestamp}
                                            </div>
                                        </div>

                                        <div className="flex gap-3 px-1">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)] border border-[var(--border-light)] overflow-hidden">
                                                {Icon && (
                                                    <Icon
                                                        size={16}
                                                        className="text-[var(--text-primary)]"
                                                    />
                                                )}
                                            </div>
                                            <div className="flex flex-col min-w-0">
                                                <h4 className="text-sm font-bold leading-tight line-clamp-2 mb-1">{clip.title}</h4>
                                                <span className="text-[12px] text-[var(--text-muted)] font-medium">{clip.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* SECTION 3: COMMUNITY FEEDBACK */}
            {details.brandMentions && (
                <>
                    <h2 className="mt-10 text-xl font-bold">Community Feedback</h2>
                    <p className="mt-1 text-sm text-[var(--text-muted)]">Audience sentiment and specific mentions in comments and chat.</p>

                    <div className="mt-4 grid grid-cols-4 gap-4">
                        <StatCard
                            icon={MessagesSquare}
                            label="Total Mentions"
                            value={details.brandMentions.overview.totalMentions}
                        />
                        <StatCard
                            icon={ThumbsUp}
                            label="Positive"
                            value={details.brandMentions.overview.positiveSentiment}
                        />
                        <StatCard
                            icon={Minus}
                            label="Neutral"
                            value={details.brandMentions.overview.neutralSentiment}
                        />
                        <StatCard
                            icon={ThumbsDown}
                            label="Negative"
                            value={details.brandMentions.overview.negativeSentiment}
                        />
                    </div>

                    <div className="mt-6 grid grid-cols-3 gap-6">
                        <Card className="col-span-2">
                            <CardHeader>
                                <CardTitle className="text-base">Sentiment by Platform</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {details.brandMentions.platformBreakdown.map((pb: any) => {
                                        const Icon = PLATFORM_ICONS[pb.platform];
                                        const total = pb.mentions;
                                        const posPercent = Math.round((pb.positive / total) * 100);
                                        const neuPercent = Math.round((pb.neutral / total) * 100);
                                        const negPercent = 100 - posPercent - neuPercent;
                                        return (
                                            <div
                                                key={pb.platform}
                                                className="flex items-center gap-4"
                                            >
                                                <div className="flex w-24 items-center gap-2">
                                                    {Icon && (
                                                        <Icon
                                                            size={14}
                                                            className="text-[var(--text-muted)]"
                                                        />
                                                    )}
                                                    <span className="text-sm text-[var(--text-secondary)]">{PLATFORM_LABELS[pb.platform]}</span>
                                                </div>
                                                <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-[var(--bg-primary)]">
                                                    <div
                                                        className="bg-[var(--color-green)] transition-all"
                                                        style={{ width: `${posPercent}%` }}
                                                    />
                                                    <div
                                                        className="bg-amber-400 transition-all"
                                                        style={{ width: `${neuPercent}%` }}
                                                    />
                                                    <div
                                                        className="bg-[var(--color-red)] transition-all"
                                                        style={{ width: `${negPercent}%` }}
                                                    />
                                                </div>
                                                <span className="w-12 text-right text-sm font-medium">{total}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-6 flex items-center gap-5 text-xs text-[var(--text-muted)]">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-green)]" /> Positive
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Neutral
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-2.5 w-2.5 rounded-full bg-[var(--color-red)]" /> Negative
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Top Keywords</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    {details.brandMentions.overview.topKeywords.map((kw: string) => (
                                        <span
                                            key={kw}
                                            className="inline-flex items-center justify-center rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)] px-3 py-1.5 text-sm font-medium text-[var(--text-secondary)]"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="mt-6">
                        <CardHeader>
                            <CardTitle className="text-base">Brand Mentions ({details.brandMentions.comments.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-0 divide-y divide-[var(--border-light)]">
                                {details.brandMentions.comments.map((comment: any) => {
                                    const Icon = PLATFORM_ICONS[comment.platform];
                                    const sentiment = SENTIMENT_CONFIG[comment.sentiment as keyof typeof SENTIMENT_CONFIG];
                                    const SentimentIcon = sentiment.icon;
                                    return (
                                        <div
                                            key={comment.id}
                                            className="flex gap-4 py-4 first:pt-0 last:pb-0"
                                        >
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--bg-primary)]">
                                                {Icon && (
                                                    <Icon
                                                        size={14}
                                                        className="text-[var(--text-muted)]"
                                                    />
                                                )}
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-semibold text-[var(--text-primary)]">{comment.author}</span>
                                                    <span className="text-xs text-[var(--text-muted)]">{formatDate(comment.date)}</span>
                                                    <span
                                                        className={`ml-auto inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${sentiment.bg} ${sentiment.color}`}
                                                    >
                                                        <SentimentIcon size={10} />
                                                        {sentiment.label}
                                                    </span>
                                                </div>
                                                <p className="mt-1 text-sm text-[var(--text-secondary)]">{comment.text}</p>
                                                <div className="mt-2 flex items-center gap-4 text-xs text-[var(--text-muted)]">
                                                    <span className="truncate italic">on &quot;{comment.postTitle}&quot;</span>
                                                    {comment.likes > 0 && (
                                                        <span className="flex shrink-0 items-center gap-1">
                                                            <Heart size={11} />
                                                            {comment.likes.toLocaleString()}
                                                        </span>
                                                    )}
                                                    {comment.replies > 0 && (
                                                        <span className="flex shrink-0 items-center gap-1">
                                                            <MessageCircle size={11} />
                                                            {comment.replies.toLocaleString()}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </>
            )}
        </div>
    );
}
