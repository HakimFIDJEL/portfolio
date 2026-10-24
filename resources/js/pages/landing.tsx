// resources/js/pages/landing.tsx

import { Head } from '@inertiajs/react';

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
    const __ = useTrans();

    return (
        <>
            <Head>
                <meta
                    name="description"
                    content={__(
                        'landing.landing.meta_description',
                        "Hakim Fidjel's portfolio. Discover my projects, skills, and ambitions as a FullStack engineering apprentice in the field of computer engineering.",
                    )}
                />
            </Head>

            <main>
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
