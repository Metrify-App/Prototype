import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';

export default function SettingsNotifications() {
    return (
        <Card className="shadow-none border-[var(--border-light)]">
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose what you want to receive via email or on the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Weekly reports</p>
                        <p className="text-sm text-[var(--text-muted)]">Receive a summary of your stats every Monday morning.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[var(--border-light)] accent-[var(--text-primary)]" />
                </div>
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">Bad buzz alerts</p>
                        <p className="text-sm text-[var(--text-muted)]">Get notified if the sentiment of mentions suddenly becomes very negative.</p>
                    </div>
                    <input type="checkbox" defaultChecked className="h-4 w-4 rounded border-[var(--border-light)] accent-[var(--text-primary)]" />
                </div>
                <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                        <p className="text-sm font-medium">New scheduled posts</p>
                        <p className="text-sm text-[var(--text-muted)]">Get notified when a team member adds a post to the calendar.</p>
                    </div>
                    <input type="checkbox" className="h-4 w-4 rounded border-[var(--border-light)] accent-[var(--text-primary)]" />
                </div>
            </CardContent>
            <div className="flex items-center px-6 py-4 border-t border-[var(--border-light)] bg-[var(--bg-primary)]/50">
                <Button>Save preferences</Button>
            </div>
        </Card>
    );
}
