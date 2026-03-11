import { Plus, Link as LinkIcon, ExternalLink, Copy, FolderOpen } from 'lucide-react';

import Link from 'next/link';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Project } from '@/app/types/project';

import trackedLinksData from '@/data/tracked-links.json';
import projectsData from '@/data/projects.json';

export default function TrackingLinksPage() {
    const links = trackedLinksData.links;
    const projects: Project[] = projectsData.projects as Project[];

    const getProjectName = (projectId?: string) => {
        if (!projectId) {
            return null;
        }

        return projects.find(p => p.id === projectId)?.name ?? null;
    };

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-light">
                    <span className="font-bold">Tracking</span> links
                </h1>
                <Button className="gap-2 px-4 py-2.5">
                    <Plus size={16} />
                    New link
                </Button>
            </div>

            {/* Links Table */}
            <Card className="overflow-hidden border-none bg-white/50 backdrop-blur-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent">
                            <TableHead className="py-4 pl-6 font-semibold">Name</TableHead>
                            <TableHead className="py-4 font-semibold">Campaign</TableHead>
                            <TableHead className="py-4 font-semibold">Original link</TableHead>
                            <TableHead className="py-4 font-semibold">Tracked link</TableHead>
                            <TableHead className="py-4 font-semibold text-right pr-6">Clicks</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {links.map(link => {
                            const projectName = getProjectName(link.projectId);
                            return (
                                <Link
                                    key={link.id}
                                    href={`/tools/tracking-links/${link.id}`}
                                >
                                    <TableRow className="group cursor-pointer">
                                        <TableCell className="py-4 pl-6">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                                                    <LinkIcon size={16} />
                                                </div>
                                                <span className="font-medium">{link.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            {projectName ? (
                                                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                                    <FolderOpen
                                                        size={14}
                                                        className="text-[var(--text-muted)]"
                                                    />
                                                    <span className="text-sm">{projectName}</span>
                                                </div>
                                            ) : (
                                                <span className="text-sm text-[var(--text-muted)] italic">None</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2 text-muted-foreground max-w-[150px] truncate">
                                                <span className="truncate">{link.originalUrl}</span>
                                                <ExternalLink
                                                    size={12}
                                                    className="flex-shrink-0"
                                                />
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4">
                                            <div className="flex items-center gap-2 font-mono text-sm text-blue-600">
                                                {link.shortUrl}
                                                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Copy size={12} />
                                                </button>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-4 text-right font-medium pr-6">{link.clicks.toLocaleString()}</TableCell>
                                    </TableRow>
                                </Link>
                            );
                        })}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
