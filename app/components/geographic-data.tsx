'use client';

import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import geoData from '@/data/geographic.json';

const GEO_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

// Map from TopoJSON country names to our data names
const nameAliases: Record<string, string> = {
    'United States of America': 'United States',
    'S. Korea': 'South Korea',
    'Dem. Rep. Korea': 'North Korea',
    'S. Africa': 'South Africa',
    'Saudi Arabia': 'Saudi Arabia',
};

const valueByName = new Map<string, number>();
for (const region of geoData.regions) {
    valueByName.set(region.name, region.value);
}

const maxValue = Math.max(...geoData.regions.map((r) => r.value));

function getColor(geoName: string): string {
    const name = nameAliases[geoName] ?? geoName;
    const value = valueByName.get(name);
    if (value == null) return 'var(--muted)';
    const intensity = value / maxValue;
    const opacity = 0.15 + intensity * 0.85;
    return `color-mix(in srgb, var(--chart-blue) ${Math.round(opacity * 100)}%, transparent)`;
}

export default function GeographicData() {
    return (
        <ComposableMap
            projection="geoMercator"
            projectionConfig={{
                scale: 120,
                center: [0, 30],
            }}
            width={800}
            height={400}
            style={{ width: '100%', height: 'auto' }}
        >
            <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                    geographies.map((geo) => {
                        const name = geo.properties?.name ?? '';
                        return (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                fill={getColor(name)}
                                stroke="var(--border)"
                                strokeWidth={0.5}
                                style={{
                                    default: { outline: 'none' },
                                    hover: { outline: 'none', opacity: 0.8 },
                                    pressed: { outline: 'none' },
                                }}
                            />
                        );
                    })
                }
            </Geographies>
        </ComposableMap>
    );
}
