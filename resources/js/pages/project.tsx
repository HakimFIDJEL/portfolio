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
}

export default function Project({ project }: ProjectProps) {
    const { contentActive, fetchingData, setFetchingData } =
        useLandingContext();

    const { locale } = usePage<SharedData>().props;

    useEffect(() => {
        if (!fetchingData) setFetchingData(true);

        const timer = setTimeout(() => {
            setFetchingData(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [locale]);

    return (
        <>
            <Head title={project.title}>
                <meta name='description' content={project.subtitle} />
            </Head>

            <main>
                <Hero appear={contentActive} project={project} />
                <Content appear={contentActive} project={project} />
            </main>
        </>
    );
}

Project.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
