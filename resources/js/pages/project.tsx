// resources/js/pages/project.tsx

// Necessary imports
import { Head } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Content from '@/components/projects/sections/content';
import Hero from '@/components/projects/sections/hero';

// Types
import { type Project } from '@/types';

// Context
import { useLandingContext } from '@/contexts/use-landing-context';

interface ProjectProps {
    project: Project;
}

export default function Project({ project }: ProjectProps) {
    const { contentActive } = useLandingContext();

    return (
        <>
            <Head title={project.title} />

            <main>
                <Hero appear={contentActive} project={project} />
                <Content appear={contentActive} project={project} />
            </main>
        </>
    );
}

Project.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;