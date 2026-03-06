import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from './ui/card';

type StatsCardProps = {
    label: string;
    value: string;
    trend: number;
    direction: 'up' | 'down';
};

export default function StatsCard({ label, value, trend, direction }: StatsCardProps) {
    const isPositive = direction === 'up';
    const Icon = isPositive ? TrendingUp : TrendingDown;

    return (
        <Card className="gap-2 py-5">
            <CardContent className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--text-secondary)]">{label}</span>
                    <div
                        className={`flex items-center gap-1 text-xs font-medium ${
                            isPositive ? 'text-[var(--color-green)]' : 'text-[var(--color-red)]'
                        }`}
                    >
                        <Icon size={14} />
                        <span>
                            {isPositive ? '+' : ''}
                            {trend}%
                        </span>
                    </div>
                </div>
                <p className="text-2xl font-bold">{value}</p>
            </CardContent>
        </Card>
    );
}
