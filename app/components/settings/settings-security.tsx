import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

export default function SettingsSecurity() {
    return (
        <Card className="shadow-none border-[var(--border-light)]">
            <CardHeader>
                <CardTitle>Account Security</CardTitle>
                <CardDescription>Manage your password and two-factor authentication (2FA).</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-4 border-b border-[var(--border-light)] pb-6">
                    <h3 className="text-sm font-medium">Change password</h3>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-[var(--text-secondary)]">Current password</label>
                        <Input type="password" placeholder="••••••••" className="max-w-md" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium leading-none text-[var(--text-secondary)]">New password</label>
                        <Input type="password" placeholder="••••••••" className="max-w-md" />
                    </div>
                    <Button className="mt-2">Update password</Button>
                </div>

                <div className="space-y-4 pt-2">
                    <div>
                        <h3 className="text-sm font-medium">Two-factor authentication (2FA)</h3>
                        <p className="text-sm text-[var(--text-muted)] mt-1">Add an extra layer of security to your account by requiring more than just a password to log in.</p>
                    </div>
                    <Button variant="outline">Enable 2FA</Button>
                </div>
            </CardContent>
        </Card>
    );
}
