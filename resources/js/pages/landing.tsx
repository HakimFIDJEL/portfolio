// resources/js/pages/landing.tsx

// Necessary imports
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Hero from '@/components/landing/sections/hero';
import About from '@/components/landing/sections/about';
import Projects from '@/components/landing/sections/projects';
import Sandbox from '@/components/landing/sections/sandbox';
import Contact from '@/components/landing/sections/contact';

// Mocks
import { 
    Contact as ContactType, 
    Experience as ExperienceType,
    Education as EducationType,
    Stack,
    Tool,
    Project
} from '@/types';

interface LandingProps {
    contacts: ContactType[];
    experiences: ExperienceType[];
    educations: EducationType[];
    stacks: Stack[];
    tools: Tool[];
    projects: Project[];
    sandbox: Project[];
}

export default function Landing({ contacts, experiences, educations, stacks, tools, projects, sandbox }: LandingProps) {
    // States content
    const [showContent, setShowContent] = useState(false);

    /**
     * Responsive
     * 
     * px-6 sm:px-8 md:px-10 lg:px-12.5
     * py-4 sm:py-6 md:py-8 lg:py-10
     */

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Porfolio" />

            <main>
                <Hero appear={showContent} />
                <About appear={showContent} stacks={stacks} tools={tools} educations={educations} experiences={experiences} />
                <Projects appear={showContent} projects={projects} />
                <Sandbox appear={showContent} projects={sandbox} />
                <Contact appear={showContent} contacts={contacts}/>
            </main>
        </AppLanding>
    );
}
