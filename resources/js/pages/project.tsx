// resources/js/pages/project.tsx

// Necessary imports
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Hero from '@/components/projects/sections/hero';

// Types
import { type Project } from '@/types';
import { mockProjects } from '@/types/data';
import Content from '@/components/projects/sections/content';

interface ProjectProps {
    project: Project | null;
}

export default function Project({ project }: ProjectProps) {

    // States content
    const [showContent, setShowContent] = useState(false);

    const temp = project || mockProjects[0];

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Project" />

            <main>
                <Hero appear={showContent} project={temp}/>
                <Content appear={showContent} project={temp} />
            </main>
        </AppLanding>
    );
}
