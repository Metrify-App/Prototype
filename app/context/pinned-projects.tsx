'use client';

import { createContext, useContext, useState, useMemo } from 'react';

import projectsData from '@/data/projects.json';

type PinnedProject = {
    id: string;
    name: string;
};

type PinnedProjectsContextType = {
    pinnedIds: Set<string>;
    toggle: (id: string) => void;
    pinnedProjects: PinnedProject[];
};

const PinnedProjectsContext = createContext<PinnedProjectsContextType>({
    pinnedIds: new Set(),
    toggle: () => {},
    pinnedProjects: []
});

export function PinnedProjectsProvider({ children }: { children: React.ReactNode }) {
    const [pinnedIds, setPinnedIds] = useState<Set<string>>(() => {
        return new Set(projectsData.projects.filter(p => p.pinned).map(p => p.id));
    });

    const toggle = (id: string) => {
        setPinnedIds(prev => {
            const next = new Set(prev);

            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }

            return next;
        });
    };

    const pinnedProjects = useMemo(() => projectsData.projects.filter(p => pinnedIds.has(p.id)).map(p => ({ id: p.id, name: p.name })), [pinnedIds]);

    const value = useMemo(
        () => ({
            pinnedIds,
            toggle,
            pinnedProjects
        }),
        [pinnedIds, pinnedProjects]
    );

    return <PinnedProjectsContext.Provider value={value}>{children}</PinnedProjectsContext.Provider>;
}

export function usePinnedProjects() {
    return useContext(PinnedProjectsContext);
}
