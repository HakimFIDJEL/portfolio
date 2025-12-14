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
import Content from '@/components/projects/sections/content';

interface ProjectProps {
    project: Project;
}

export default function Project({ project }: ProjectProps) {

    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title={project.title} />
            

            <main>
                <Hero appear={showContent} project={project}/>
                <Content appear={showContent} project={project} />
            </main>
        </AppLanding>
    );
}
