import { Plus } from 'lucide-react';

import { ProjectsList } from '../../components/ProjectsList';

import projectsData from '@/data/projects.json';

export default function ProjectsPage() {
    const projects = projectsData.projects;

    return (
        <div className="mx-auto max-w-7xl">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-4xl font-light">
                    <span className="font-bold">Projects</span>
                </h1>
                <button className="flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90">
                    <Plus size={16} />
                    New project
                </button>
            </div>

            {/* List interaction component */}
            <ProjectsList initialProjects={projects} />
        </div>
    );
}
