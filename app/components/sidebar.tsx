import Image from 'next/image';
import { Home, BarChart3, Plus, MoreVertical, Users, Settings, Link, FolderOpen, Pin } from 'lucide-react';
import { SiTwitter, SiTwitch, SiYoutube, SiInstagram, SiTiktok } from './social-icons';
import sidebarData from '@/data/sidebar.json';

const LUCIDE_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
    Home,
    BarChart3,
    Users,
    Settings,
    Link,
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
                        active={item.active}
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
                    />
                ))}

                <SectionHeader label="Partnerships" />
                {navigation.partnerships.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
                    />
                ))}

                <SectionHeader label="Tools" />
                {navigation.tools.map(item => (
                    <NavItem
                        key={item.label}
                        icon={getIcon(item.icon)}
                        label={item.label}
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
    active
}: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    active?: boolean;
}) {
    return (
        <button
            className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 text-sm transition-colors ${
                active
                    ? 'bg-[var(--sidebar-active)] font-medium text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--sidebar-hover)] hover:text-[var(--text-primary)]'
            }`}
        >
            <Icon size={18} />
            <span>{label}</span>
        </button>
    );
}
