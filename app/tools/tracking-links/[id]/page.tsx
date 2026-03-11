'use client';

import { use, useState } from 'react';
import {
    ArrowLeft,
    Link as LinkIcon,
    ExternalLink,
    Smartphone,
    Monitor,
    Tablet,
    Edit,
    Trash2,
    MousePointerClick,
    MapPin,
    Cpu,
    FolderOpen,
    Eye,
    Target,
    BarChart3
} from 'lucide-react';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Button } from '@/app/components/ui/button';
import { SiYoutube, SiTwitter, SiInstagram, SiTiktok, SiTwitch } from '@/app/components/social/social-icons';
import { Project } from '@/app/types/project';

import GeographicData from '@/app/components/geographic-data';
import trackedLinksData from '@/data/tracked-links.json';
import trackedLinkDetails from '@/data/tracked-link-details.json';
import projectsData from '@/data/projects.json';

const PLATFORM_ICONS: Record<string, any> = {
    youtube: SiYoutube,
    twitter: SiTwitter,
    instagram: SiInstagram,
    tiktok: SiTiktok,
    twitch: SiTwitch,
    direct: MousePointerClick
};

const OS_ICONS: Record<string, any> = {
    iOS: Smartphone,
    Android: Smartphone,
    Windows: Monitor,
    macOS: Monitor,
    Other: Cpu
};

const DEVICE_TYPE_ICONS: Record<string, any> = {
    Mobile: Smartphone,
    Desktop: Monitor,
    Tablet: Tablet
};

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

export default function TrackedLinkDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const [geoTab, setGeoTab] = useState<'country' | 'region' | 'city'>('country');

    const link = trackedLinksData.links.find(l => l.id === id);
    const details = (trackedLinkDetails as any)[id];
    const project = projectsData.projects.find(p => p.id === link?.projectId) as Project | undefined;

    if (!link || !details) {
        return (
            <div className="mx-auto max-w-7xl">
                <Link
                    href="/tools/tracking-links"
                    className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                >
                    <ArrowLeft size={16} />
                    Back to links
                </Link>
                <p className="mt-8 text-[var(--text-muted)]">Link not found.</p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl pb-12">
            {/* Top Navigation */}
            <Link
                href="/tools/tracking-links"
                className="flex items-center gap-2 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
            >
                <ArrowLeft size={16} />
                Back to links
            </Link>

            {/* Header with Title and Actions */}
            <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                        <LinkIcon size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold">{link.name}</h1>
                        <div className="flex items-center gap-3 text-sm text-[var(--text-muted)] mt-1">
                            <span className="flex items-center gap-1">
                                <span className="font-mono text-blue-600">{link.shortUrl}</span>
                            </span>
                            <span className="text-border">|</span>
                            <span className="flex items-center gap-1 max-w-[400px] truncate">
                                {link.originalUrl}
                                <ExternalLink size={12} />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        className="gap-2"
                    >
                        <Edit size={16} />
                        Edit
                    </Button>
                    <Button
                        variant="destructive"
                        className="gap-2"
                    >
                        <Trash2 size={16} />
                        Delete
                    </Button>
                </div>
            </div>

            {/* SECTION 1: GENERAL PERFORMANCE */}
            <h2 className="mt-10 text-xl font-bold">General Performance</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">Core metrics regarding link engagement and attribution.</p>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard
                    icon={Eye}
                    label="Total Clicks"
                    value={link.clicks.toLocaleString()}
                />
                <StatCard
                    icon={FolderOpen}
                    label="Project"
                    value={project ? project.name : 'None'}
                />
                <StatCard
                    icon={Target}
                    label="Top Source"
                    value={details.sources[0]?.name}
                />
                <StatCard
                    icon={BarChart3}
                    label="Conversion Rate"
                    value="--"
                />
            </div>

            <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Click Origins */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Click Origins</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="font-normal text-[var(--text-muted)]">Source</TableHead>
                                    <TableHead className="text-right font-normal text-[var(--text-muted)]">Clicks</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {details.sources.map((source: any) => {
                                    const Icon = PLATFORM_ICONS[source.platform] || MousePointerClick;

                                    return (
                                        <TableRow key={source.name}>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--bg-primary)]">
                                                        <Icon
                                                            size={14}
                                                            className="text-[var(--text-muted)]"
                                                        />
                                                    </div>
                                                    <span className="font-medium">{source.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-right font-bold text-sm">{source.value.toLocaleString()}</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

                {/* Devices & OS */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Audience Technology</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Device Types</h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {details.devices.types.map((device: any) => {
                                        const Icon = DEVICE_TYPE_ICONS[device.name] || Smartphone;
                                        return (
                                            <div
                                                key={device.name}
                                                className="flex flex-col items-center p-3 rounded-lg bg-[var(--bg-primary)]"
                                            >
                                                <Icon
                                                    size={18}
                                                    className="text-[var(--text-secondary)] mb-2"
                                                />
                                                <span className="text-sm font-bold">{device.percentage}</span>
                                                <span className="text-[9px] text-[var(--text-muted)] font-bold uppercase mt-0.5">{device.name}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <div>
                                <h4 className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3">Operating Systems</h4>
                                <div className="space-y-3">
                                    {details.devices.os.map((os: any) => {
                                        const Icon = OS_ICONS[os.name] || Cpu;
                                        return (
                                            <div
                                                key={os.name}
                                                className="flex items-center justify-between text-sm"
                                            >
                                                <div className="flex items-center gap-2 w-24">
                                                    <Icon
                                                        size={13}
                                                        className="text-[var(--text-muted)]"
                                                    />
                                                    <span className="text-[var(--text-secondary)]">{os.name}</span>
                                                </div>
                                                <div className="flex-1 px-4">
                                                    <div className="h-1.5 w-full rounded-full bg-[var(--bg-primary)] overflow-hidden">
                                                        <div
                                                            className="h-full bg-[var(--text-primary)]"
                                                            style={{ width: os.percentage }}
                                                        />
                                                    </div>
                                                </div>
                                                <span className="font-medium w-12 text-right">{os.percentage}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* SECTION 2: GEOGRAPHIC DISTRIBUTION */}
            <h2 className="mt-10 text-xl font-bold">Geographic Distribution</h2>
            <p className="mt-1 text-sm text-[var(--text-muted)]">AI-powered breakdown of where your audience is clicking from.</p>

            <Card className="mt-4">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-base">Regional Analysis</CardTitle>
                    <div className="flex items-center gap-1 bg-[var(--bg-primary)] p-0.5 rounded-lg">
                        {(['country', 'region', 'city'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setGeoTab(tab)}
                                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-tighter rounded-md transition-all ${
                                    geoTab === tab
                                        ? 'bg-white shadow-sm text-[var(--text-primary)]'
                                        : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="h-[350px] w-full rounded-xl overflow-hidden border border-[var(--border-light)] bg-[#f8fafc] flex items-center justify-center">
                                <GeographicData />
                            </div>
                        </div>
                        <div className="space-y-5">
                            <div className="flex items-center gap-2 text-sm font-bold border-b border-[var(--border-light)] pb-2">
                                <MapPin
                                    size={16}
                                    className="text-[var(--text-primary)]"
                                />
                                <span>Top {geoTab}s</span>
                            </div>
                            <div className="space-y-1">
                                {(geoTab === 'country'
                                    ? details.geography.countries
                                    : geoTab === 'region'
                                      ? details.geography.regions
                                      : details.geography.cities
                                ).map((item: any, i: number) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center justify-between p-2 rounded-lg hover:bg-[var(--bg-primary)] transition-colors"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-[var(--text-muted)] w-4">{i + 1}.</span>
                                            <span className="text-sm font-medium">{item.name}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold">{item.value.toLocaleString()}</span>
                                            {item.percentage && (
                                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-primary)] font-bold">
                                                    {item.percentage}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
