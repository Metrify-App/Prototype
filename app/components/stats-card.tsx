import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';

type StatsCardProps = {
    label: string;
    value: string;
    trend: number;
    direction: 'up' | 'down';
    icon?: React.ComponentType<{ size?: number; className?: string }>;
};

export default function StatsCard({ label, value, trend, direction, icon: Icon }: StatsCardProps) {
    const isPositive = direction === 'up';
    const TrendIcon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card className="py-4 px-4 gap-2 border-[var(--border-light)] shadow-none overflow-hidden">
            <div className="flex items-start justify-between mb-4 gap-2">
                <div className="flex items-start gap-2 text-sm text-[var(--text-secondary)] min-w-0">
                    {Icon && <Icon size={16} className="shrink-0 mt-0.5" />}
                    <span className="leading-tight break-words">{label}</span>
                </div>
                <div
                    className={`flex shrink-0 items-center gap-1 text-xs font-medium ${
                        isPositive ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'
                    }`}
                >
                    <TrendIcon size={14} />
                    <span>
                        {isPositive ? '+' : ''}
                        {trend}%
                    </span>
                </div>
            </div>
            <p className="text-2xl font-bold truncate">{value}</p>
        </Card>
    );
}
