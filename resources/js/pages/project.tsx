// resources/js/pages/project.tsx

// SEO
import Seo from '@/components/seo';

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
    previous_project: Project | null;
    next_project: Project | null;
}

export default function Project({
    project,
    previous_project,
    next_project,
}: ProjectProps) {
    const { contentActive } = useLandingContext();

    const firstImage =
        project.attachments && project.attachments.length > 0
            ? project.attachments[0].url
            : undefined;

    const projectJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: project.title,
        description: project.subtitle || project.description || '',
        programmingLanguage:
            project.stack_items?.map((item) => item.name) ?? [],
        codeRepository: project.source_code_url || undefined,
        author: {
            '@type': 'Person',
            name: 'Hakim Fidjel',
        },
    };

    return (
        <>
            <Seo
                title={project.title}
                description={project.subtitle}
                image={firstImage}
                type="article"
                jsonLd={projectJsonLd}
            />

            <main id="main-content">
                <Hero appear={contentActive} project={project} />
                <Content
                    appear={contentActive}
                    project={project}
                    previous_project={previous_project}
                    next_project={next_project}
                />
            </main>
        </>
    );
}

Project.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
