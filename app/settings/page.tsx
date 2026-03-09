'use client';

import { useState } from 'react';
import { User, Bell, Link2, Shield } from 'lucide-react';

import SettingsProfile from '@/app/components/settings/settings-profile';
import SettingsNotifications from '@/app/components/settings/settings-notification';
import SettingsIntegrations from '@/app/components/settings/settings-integration';
import SettingsSecurity from '@/app/components/settings/settings-security';

const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'integrations', label: 'Integrations', icon: Link2 },
    { id: 'security', label: 'Security', icon: Shield },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="mx-auto max-w-5xl">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Settings</h1>
                <p className="text-sm text-[var(--text-muted)] mt-1">Manage your account settings and preferences.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <aside className="w-full md:w-64 shrink-0">
                    <nav className="flex flex-col gap-1">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                                        isActive
                                        ? 'bg-[var(--bg-primary)] text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-[var(--text-primary)]'
                                    }`}
                                >
                                    <Icon size={18} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <div className="flex-1">
                    {activeTab === 'profile' && <SettingsProfile />}
                    {activeTab === 'notifications' && <SettingsNotifications />}
                    {activeTab === 'integrations' && <SettingsIntegrations />}
                    {activeTab === 'security' && <SettingsSecurity />}
                </div>
            </div>
        </div>
    );
}
