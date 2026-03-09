import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export default function SettingsProfile() {
    return (
        <Card className="shadow-none border-[var(--border-light)]">
            <CardHeader>
                <CardTitle>Public Profile</CardTitle>
                <CardDescription>This is how others will see your account on the dashboard.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium leading-none">Display Name</label>
                    <Input id="name" defaultValue="User" className="max-w-md" />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium leading-none">Email Address</label>
                    <Input id="email" defaultValue="user@gmail.com" disabled className="max-w-md bg-[var(--bg-primary)] text-[var(--text-muted)]" />
                    <p className="text-[13px] text-[var(--text-muted)]">Your email address is linked to your workspace.</p>
                </div>
                <div className="space-y-2">
                    <label htmlFor="bio" className="text-sm font-medium leading-none">Bio</label>
                    <textarea
                        id="bio"
                        placeholder="Tell us a little bit about yourself..."
                        className="flex min-h-[80px] w-full max-w-md rounded-md border border-[var(--border-light)] bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-[var(--text-muted)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--text-primary)]"
                    />
                </div>
            </CardContent>
            <div className="flex items-center px-6 py-4 border-t border-[var(--border-light)] bg-[var(--bg-primary)]/50">
                <Button>Update profile</Button>
            </div>
        </Card>
    );
}
