import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';

import StatsCard from '@/app/components/stats-card';
import FollowersChart from '@/app/components/followers-chart';
import GeographicData from '@/app/components/geographic-data';
import BestPerformance from '@/app/components/best-performance';
import dashboardData from '@/data/dashboard.json';

export default function Home() {
    const { user, stats, bestPerformances } = dashboardData;

    return (
        <div className="mx-auto max-w-7xl">
            <h1 className="text-4xl font-light">
                Welcome back, <span className="font-bold">{user.name}</span> ! 👋
            </h1>

            <h2 className="mt-8 text-xl font-semibold">Last 30 days</h2>

            {/* Stats cards */}
            <div className="mt-4 grid grid-cols-4 gap-4">
                {stats.map(stat => (
                    <StatsCard
                        key={stat.label}
                        label={stat.label}
                        value={stat.value}
                        trend={stat.trend}
                        direction={stat.direction as 'up' | 'down'}
                    />
                ))}
            </div>

            {/* Followers chart */}
            <div className="mt-6">
                <FollowersChart />
            </div>

            {/* Bottom row */}
            <div className="mt-6 grid grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Geographic data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <GeographicData />
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-lg">Best performance</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <BestPerformance data={bestPerformances} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
