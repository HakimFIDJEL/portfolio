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

export default function Project({ project }: { project: Project }) {

    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Project" />

            <main>
                <Hero appear={showContent} project={project}/>

            </main>
        </AppLanding>
    );
}
