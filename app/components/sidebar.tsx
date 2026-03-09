'use client';

import { usePathname } from 'next/navigation';
import { Home, BarChart3, Plus, MoreVertical, Users, Settings, Link as LinkIcon, FolderOpen, Pin } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';

import { SiTwitter, SiTwitch, SiYoutube, SiInstagram, SiTiktok } from './social-icons';
import sidebarData from '@/data/sidebar.json';
import { usePinnedProjects } from '@/app/context/pinned-projects';

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Home,
    BarChart3,
    Users,
    Settings,
    Link: LinkIcon,
    FolderOpen,
    Pin
};

const SOCIAL_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    twitter: SiTwitter,
    twitch: SiTwitch,
    youtube: SiYoutube,
    instagram: SiInstagram,
    tiktok: SiTiktok
};

function getIcon(iconName: string) {
    return SOCIAL_ICONS[iconName] ?? LUCIDE_ICONS[iconName] ?? Home;
}

export default function Sidebar() {
    const { workspace, navigation, footer } = sidebarData;
    const { pinnedProjects } = usePinnedProjects();

    const pathname = usePathname();

    return (
        <aside className="fixed top-0 left-0 flex h-screen w-[var(--sidebar-width)] flex-col border-r border-[var(--border-light)] bg-[var(--bg-sidebar)]">
            {/* Profile */}
            <div className="flex items-center gap-3 px-4 py-4">
                <Image
                    src={workspace.logo}
                    alt={workspace.name}
                    width={36}
                    height={36}
                    className="rounded-sm"
                />
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{workspace.name}</p>
                    <p className="truncate text-xs text-[var(--text-muted)]">{workspace.email}</p>
                </div>
                <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <MoreVertical size={18} />
                </button>
            </div>
            <hr className="mx-4 border-[var(--border-light)]" />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-3">
                {navigation.main.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}

                <SectionHeader
                    label="Your space"
                    hasAdd
                />
                {navigation.yourSpace.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}

                <SectionHeader
                    label="Social Media"
                    hasAdd
                />
                {navigation.socialMedia.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}

                <SectionHeader label="Partnerships" />
                {navigation.partnerships.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
                {pinnedProjects.map(project => (
                    <NavItem
                        key={project.id}
                        icon={Pin}
                        label={project.name}
                        href={`/partnerships/projects/${project.id}`}
                        active={pathname === `/partnerships/projects/${project.id}`}
                        indented
                    />
                ))}

                <SectionHeader label="Tools" />
                {navigation.tools.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
            </nav>

            {/* Footer */}
            <hr className="mx-4 border-[var(--border-light)]" />
            <div className="px-3 py-3">
                {footer.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                        href={item.href}
                        active={pathname === item.href}
                    />
                ))}
            </div>
        </aside>
    );
}

function SectionHeader({ label, hasAdd }: { label: string; hasAdd?: boolean }) {
    return (
        <div className="mt-5 mb-1 flex items-center justify-between px-2">
            <span className="text-xs font-medium text-[var(--text-muted)]">{label}</span>
            {hasAdd && (
                <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                    <Plus size={14} />
                </button>
            )}
        </div>
    );
}

function NavItem({
    icon: Icon,
    label,
    href,
    active,
    indented
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    href: string;
    active?: boolean;
    indented?: boolean;
}) {
    return (
        <Link
            href={href}
            className={`flex w-full items-center gap-3 rounded-lg py-2 text-sm transition-colors ${indented ? 'pl-5 pr-2' : 'px-2'} ${
                active
                    ? 'bg-[var(--sidebar-active)] font-medium text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--text-primary)]'
            }`}
        >
            <Icon size={indented ? 14 : 18} />
            <span className="truncate">{label}</span>
        </Link>
    );
}
