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
import { mockStacks, mockTools, mockProjects, mockEducations, mockExperiences } from '@/types/data';
import { Contact as ContactType } from '@/types';

interface LandingProps {
    contacts: ContactType[];
}

export default function Landing({ contacts }: LandingProps) {
    // States content
    const [showContent, setShowContent] = useState(false);

    console.log(contacts);

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
                <About appear={showContent} stacks={mockStacks} tools={mockTools} educations={mockEducations} experiences={mockExperiences} />
                <Projects appear={showContent} projects={mockProjects} />
                <Sandbox appear={showContent} projects={mockProjects} />
                <Contact appear={showContent} contacts={contacts}/>
            </main>
        </AppLanding>
    );
}
