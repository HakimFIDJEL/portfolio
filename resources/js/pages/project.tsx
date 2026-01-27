// resources/js/pages/project.tsx

// Necessary imports
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Content from '@/components/projects/sections/content';
import Hero from '@/components/projects/sections/hero';

// Types
import { SharedData, type Project } from '@/types';

// Context
import { useLandingContext } from '@/contexts/use-landing-context';

interface ProjectProps {
    project: Project;
    previous_project: Project | null;
    next_project: Project | null;
}

export default function Project({ project, previous_project, next_project }: ProjectProps) {
    const { contentActive, fetchingData, setFetchingData } =
        useLandingContext();

    const { locale } = usePage<SharedData>().props;

    useEffect(() => {
        if (!fetchingData) setFetchingData(true);

        const timer = setTimeout(() => {
            setFetchingData(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [locale, project]);

    return (
        <>
            <Head title={project.title}>
                <meta name='description' content={project.subtitle} />
            </Head>

            <main>
                <Hero appear={contentActive} project={project} />
                <Content appear={contentActive} project={project} previous_project={previous_project} next_project={next_project} />
            </main>
        </>
    );
}

Project.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
