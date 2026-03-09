'use client';

import { useState } from 'react';
import { Calendar, Archive, Eye, DollarSign, Users, BarChart3, Pin } from 'lucide-react';

import Link from 'next/link';
import Image from 'next/image';

import { Card, CardContent } from '@/app/components/ui/card';
import { SiYoutube } from '@/app/components/social-icons';
import { usePinnedProjects } from '@/app/context/pinned-projects';
import { formatDate } from '@/lib/utils';
import type { Project } from '@/app/types/project';

function StatBadge({
    icon: Icon,
    label,
    value,
    highlight
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    value: string;
    highlight?: 'green' | 'red';
}) {
    return (
        <div className="flex items-center gap-2.5 rounded-lg bg-[var(--bg-primary)] px-3 py-2.5">
            <Icon
                size={15}
                className="shrink-0 text-[var(--text-muted)]"
            />
            <div className="min-w-0">
                <p className="text-[11px] text-[var(--text-muted)]">{label}</p>
                <p
                    className={`text-sm font-semibold ${
                        highlight === 'red'
                            ? 'text-[var(--color-red)]'
                            : highlight === 'green'
                              ? 'text-[var(--color-green)]'
                              : 'text-[var(--text-primary)]'
                    }`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
}

function ProjectCard({ project, isPinned, onTogglePin }: { project: Project; isPinned: boolean; onTogglePin: () => void }) {
    return (
        <Card className="overflow-hidden">
            <CardContent>
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {project.logo ? (
                            <div className="relative h-10 w-10 overflow-hidden rounded-lg">
                                <Image
                                    src={project.logo}
                                    alt={`Logo de ${project.name}`}
                                    fill
                                    className="object-cover"
                                    sizes="40px"
                                />
                            </div>
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--sidebar-active)] text-sm font-bold text-[var(--text-primary)]">
                                {project.name.charAt(0)}
                            </div>
                        )}
                        <div>
                            <h3 className="font-semibold text-[var(--text-primary)]">{project.name}</h3>
                            <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                                <Calendar size={12} />
                                <span>
                                    {formatDate(project.startDate)}
                                    {' - '}
                                    {project.endDate ? formatDate(project.endDate) : 'En cours'}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={onTogglePin}
                            title={isPinned ? 'Retirer de la sidebar' : 'Epingler dans la sidebar'}
                            aria-label={isPinned ? `Retirer ${project.name} de la sidebar` : `Epingler ${project.name} dans la sidebar`}
                            className={`rounded-lg border border-[var(--border-light)] p-1.5 text-xs transition-colors hover:bg-[var(--sidebar-hover)] ${
                                isPinned
                                    ? 'bg-[var(--text-primary)] text-white hover:bg-[var(--text-primary)]/90'
                                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            <Pin size={14} />
                        </button>
                        <Link
                            href={`/partnerships/projects/${project.id}`}
                            className="rounded-lg border border-[var(--border-light)] px-3 py-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--sidebar-hover)] hover:text-[var(--text-primary)]"
                        >
                            <Eye
                                size={14}
                                className="mr-1 inline"
                            />
                            Voir
                        </Link>
                    </div>
                </div>

                {/* Stats */}
                <div className="mt-4 grid grid-cols-4 gap-3">
                    <StatBadge
                        icon={DollarSign}
                        label="Media Value"
                        value={project.stats.mediaValue}
                    />
                    <StatBadge
                        icon={Eye}
                        label="Views"
                        value={project.stats.views}
                    />
                    <StatBadge
                        icon={Users}
                        label="Followers"
                        value={project.stats.followers}
                        highlight={project.stats.followers.startsWith('-') ? 'red' : 'green'}
                    />
                    <StatBadge
                        icon={BarChart3}
                        label="Engagement"
                        value={project.stats.engagement}
                    />
                </div>

                {/* Video feed */}
                {project.videos.length > 0 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
                        {project.videos.slice(0, 5).map(video => (
                            <div
                                key={video.title}
                                className="w-44 flex-shrink-0"
                            >
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-[var(--bg-primary)]">
                                    <Image
                                        src={video.thumbnail}
                                        alt={`Miniature de la vidéo : ${video.title}`}
                                        fill
                                        className="object-cover"
                                        sizes="176px"
                                    />
                                    <div className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1 py-0.5 text-[10px] text-white">
                                        {video.views} views
                                    </div>
                                </div>
                                <div className="mt-1.5 flex gap-1.5">
                                    <SiYoutube
                                        size={12}
                                        className="mt-0.5 shrink-0 text-[var(--text-muted)]"
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-xs font-medium text-[var(--text-primary)]">{video.title}</p>
                                        <p className="text-[11px] text-[var(--text-muted)]">{video.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}

export function ProjectsList({ initialProjects }: { initialProjects: Project[] }) {
    const [showArchived, setShowArchived] = useState(false);

    const { pinnedIds, toggle } = usePinnedProjects();

    const activeProjects = initialProjects.filter(p => !p.archived);
    const archivedProjects = initialProjects.filter(p => p.archived);

    return (
        <>
            {/* Active projects */}
            <div className="mt-4 flex flex-col gap-4">
                {activeProjects.map(project => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        isPinned={pinnedIds.has(project.id)}
                        onTogglePin={() => toggle(project.id)}
                    />
                ))}
            </div>

            {/* Archived toggle */}
            <div className="mt-8">
                <button
                    onClick={() => setShowArchived(!showArchived)}
                    className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                >
                    <Archive size={16} />
                    {showArchived ? 'Masquer' : 'Afficher'} les campagnes archivées ({archivedProjects.length})
                </button>
            </div>

            {/* Archived projects */}
            {showArchived && (
                <div className="mt-4 flex flex-col gap-4 opacity-70">
                    {archivedProjects.map(project => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            isPinned={pinnedIds.has(project.id)}
                            onTogglePin={() => toggle(project.id)}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
