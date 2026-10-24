// resources/js/pages/landing.tsx

import { usePage } from '@inertiajs/react';

// SEO
import Seo from '@/components/seo';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import About from '@/components/landing/sections/about';
import Contact from '@/components/landing/sections/contact';
import Hero from '@/components/landing/sections/hero';
import Projects from '@/components/landing/sections/projects';
import Sandbox from '@/components/landing/sections/sandbox';

// Context
import { useLandingContext } from '@/contexts/use-landing-context';

// Types
import {
    Contact as ContactType,
    Education as EducationType,
    Experience as ExperienceType,
    Project,
    SharedData,
    Stack,
    Tool,
} from '@/types';

// Translation
import { useTrans } from '@/lib/translation';

export interface LandingProps {
    contacts?: ContactType[];
    experiences?: ExperienceType[];
    educations?: EducationType[];
    stacks?: Stack[];
    tools?: Tool[];
    projects?: Project[];
    sandbox?: Project[];
}

export default function Landing({
    contacts = [],
    experiences = [],
    educations = [],
    stacks = [],
    tools = [],
    projects = [],
    sandbox = [],
}: LandingProps) {
    const { contentActive } = useLandingContext();
    const { props } = usePage<SharedData>();
    const __ = useTrans();

    const locale = props.locale || 'fr';
    const ziggyLocation =
        typeof props.ziggy === 'object' &&
        props.ziggy !== null &&
        'location' in props.ziggy
            ? String((props.ziggy as { location?: unknown }).location)
            : '';

    const siteUrl =
        typeof window !== 'undefined'
            ? window.location.origin
            : ziggyLocation
              ? new URL(ziggyLocation).origin
              : 'https://hakimfidjel.fr';

    const jsonLd = [
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Hakim Fidjel — Portfolio',
            url: siteUrl,
            inLanguage: ['fr', 'en'],
            author: {
                '@type': 'Person',
                name: 'Hakim Fidjel',
            },
        },
        {
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Hakim Fidjel',
            url: siteUrl,
            jobTitle:
                locale === 'fr'
                    ? 'Ingénieur en génie informatique & Développeur FullStack'
                    : 'Computer Engineering Apprentice & FullStack Developer',
            worksFor: {
                '@type': 'Organization',
                name: 'TenderCrunch',
                url: 'https://tendercrunch.com',
            },
            alumniOf: {
                '@type': 'EducationalOrganization',
                name: 'IG2I — Centrale Lille Institut',
            },
            sameAs: [
                'https://github.com/HakimFIDJEL',
                'https://www.linkedin.com/in/hakim-fidjel',
            ],
            knowsAbout: [
                'Laravel',
                'PHP',
                'React',
                'TypeScript',
                'Docker',
                'Tailwind CSS',
                'Inertia.js',
                'Software Architecture',
            ],
        },
    ];

    return (
        <>
            <Seo
                description={__(
                    'landing.landing.meta_description',
                    "Hakim Fidjel's portfolio. Discover my projects, skills, and ambitions as a FullStack engineering apprentice in the field of computer engineering.",
                )}
                jsonLd={jsonLd}
            />

            <main id="main-content">
                <Hero appear={contentActive} />
                <About
                    appear={contentActive}
                    stacks={stacks}
                    tools={tools}
                    educations={educations}
                    experiences={experiences}
                />
                <Projects appear={contentActive} projects={projects} />
                <Sandbox appear={contentActive} projects={sandbox} />
                <Contact appear={contentActive} contacts={contacts} />
            </main>
        </>
    );
}

Landing.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
