'use client';

import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Share2 } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { SiTwitter, SiTwitch, SiYoutube, SiInstagram, SiTiktok } from '@/app/components/social/social-icons';

import socialData from '@/data/social.json';

interface SocialAccount {
    id: string;
    name: string;
}

interface SocialAccounts {
    [key: string]: SocialAccount[];
}

const PLATFORMS = [
    { id: 'twitter', label: 'Twitter', icon: SiTwitter, color: '#1DA1F2' },
    { id: 'twitch', label: 'Twitch', icon: SiTwitch, color: '#9146FF' },
    { id: 'youtube', label: 'YouTube', icon: SiYoutube, color: '#FF0000' },
    { id: 'instagram', label: 'Instagram', icon: SiInstagram, color: '#E4405F' },
    { id: 'tiktok', label: 'TikTok', icon: SiTiktok, color: '#000000' }
];

export default function SocialManagePage() {
    const [accounts, setAccounts] = useState<SocialAccounts>(socialData.social_accounts || {});

    const removeAccount = (platformId: string, accountId: string) => {
        setAccounts(prev => ({
            ...prev,
            [platformId]: prev[platformId].filter(acc => acc.id !== accountId)
        }));
    };

    const addAccount = (platformId: string) => {
        setAccounts(prev => {
            const id = `${platformId}-${Date.now()}`;
            const name = `@NewAccount_${Math.floor(Math.random() * 100)}`;

            return {
                ...prev,
                [platformId]: [...(prev[platformId] || []), { id, name }]
            };
        });
    };

    return (
        <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-light)] bg-[var(--bg-card)] text-[var(--text-primary)] shadow-sm">
                    <Share2 size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-[var(--text-primary)] leading-tight">Social Accounts</h1>
                    <p className="text-xs text-[var(--text-muted)]">Connect and manage multiple profiles for each social network</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {PLATFORMS.map(platform => {
                    const Icon = platform.icon;
                    const platformAccounts = accounts[platform.id] || [];

                    return (
                        <Card
                            key={platform.id}
                            className="shadow-none border-[var(--border-light)] bg-[var(--bg-card)] overflow-hidden relative group"
                        >
                            <div
                                className="absolute top-0 left-0 w-1 h-full"
                                style={{ backgroundColor: platform.color }}
                            />

                            <CardHeader className="flex flex-row items-center justify-between bg-[var(--bg-primary)]/10 border-b border-[var(--border-light)] px-5">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-light)] bg-white text-[var(--text-primary)] shadow-sm">
                                        <Icon
                                            size={18}
                                            style={{ color: platform.id === 'tiktok' ? 'black' : platform.color }}
                                        />
                                    </div>
                                    <div>
                                        <CardTitle className="text-sm font-bold">{platform.label}</CardTitle>
                                        <CardDescription className="text-[10px]">
                                            {platformAccounts.length} account{platformAccounts.length !== 1 ? 's' : ''} connected
                                        </CardDescription>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-8 text-[10px] font-bold px-4 border-[var(--border-light)] bg-white shadow-sm hover:bg-[var(--bg-primary)] hover:border-[var(--text-primary)]/30 transition-all"
                                    onClick={() => addAccount(platform.id)}
                                >
                                    <Plus size={14} />
                                    Connect Account
                                </Button>
                            </CardHeader>
                            <CardContent className="px-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                                    {platformAccounts.length > 0 ? (
                                        platformAccounts.map(account => (
                                            <div
                                                key={account.id}
                                                className="flex items-center justify-between p-2.5 rounded-lg border border-[var(--border-light)] bg-[var(--bg-primary)]/5 group/item hover:bg-white hover:shadow-sm transition-all duration-200"
                                            >
                                                <div className="flex items-center gap-2.5 min-w-0">
                                                    <div
                                                        className="flex h-5 w-5 items-center justify-center rounded-full shrink-0"
                                                        style={{ backgroundColor: `${platform.color}15`, color: platform.color }}
                                                    >
                                                        <CheckCircle2 size={10} />
                                                    </div>
                                                    <span className="text-xs font-bold text-[var(--text-primary)] truncate">{account.name}</span>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => removeAccount(platform.id, account.id)}
                                                    className="text-[var(--text-muted)] hover:text-[var(--color-red)] p-1 rounded-md opacity-0 group-hover/item:opacity-100 transition-all hover:bg-[var(--color-red-light)]"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="col-span-full py-4 text-center border border-dashed border-[var(--border-light)] rounded-lg bg-[var(--bg-primary)]/5">
                                            <p className="text-[10px] text-[var(--text-muted)]">No accounts connected for {platform.label}</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
