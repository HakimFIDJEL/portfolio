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

export default function Project({ project }: { project: Project }) {

    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Project" />

            <main>
                <Hero appear={showContent} project={mockProjects[0]}/>
                {/* <Content appear={showContent} project={mockProjects[0]} /> */}
            </main>
        </AppLanding>
    );
}
