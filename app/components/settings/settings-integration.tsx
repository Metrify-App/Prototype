import { CheckCircle2 } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import {
  SiTwitter,
  SiInstagram,
  SiYoutube,
  SiTwitch,
  SiTiktok,
} from '@/app/components/social/social-icons';

const integrations = [
  {
    id: 'twitter',
    name: 'X / Twitter',
    icon: SiTwitter,
    connected: true,
    account: '@GentleMates',
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: SiInstagram,
    connected: true,
    account: '@gentlemates',
  },
  {
    id: 'youtube',
    name: 'YouTube',
    icon: SiYoutube,
    connected: false,
    account: '',
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: SiTwitch,
    connected: true,
    account: 'gentlemates',
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: SiTiktok,
    connected: true,
    account: '@gentlemates_gg',
  },
];

export default function SettingsIntegrations() {
  return (
    <Card className="shadow-none border-[var(--border-light)]">
      <CardHeader>
        <CardTitle>Connected social accounts</CardTitle>
        <CardDescription>
          Manage connections with various APIs to fetch your statistics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {integrations.map((integration) => {
          const Icon = integration.icon;
          return (
            <div
              key={integration.id}
              className="flex items-center justify-between rounded-lg border border-[var(--border-light)] p-4"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--bg-primary)] text-[var(--text-primary)]">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium">{integration.name}</p>
                  {integration.connected ? (
                    <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mt-0.5">
                      <CheckCircle2
                        size={12}
                        className="text-[var(--color-green)]"
                      />
                      Connected as{' '}
                      <span className="font-medium text-[var(--text-primary)]">
                        {integration.account}
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">
                      No account connected
                    </p>
                  )}
                </div>
              </div>
              <Button variant={integration.connected ? 'outline' : 'default'}>
                {integration.connected ? 'Disconnect' : 'Connect'}
              </Button>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
