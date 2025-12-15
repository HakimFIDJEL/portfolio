// resources/js/pages/landing.tsx

// Necessary imports
import { Head } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

interface LandingData {
    contacts: ContactType[];
    experiences: ExperienceType[];
    educations: EducationType[];
    stacks: Stack[];
    tools: Tool[];
    projects: Project[];
    sandbox: Project[];
}

export default function Landing() {

    const [data, setData] = useState<LandingData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);

    // useEffect(() => {
    //     fetch(route('landing.data'))
    //         .then(response => response.json())
    //         .then((data: LandingData) => {
    //             setData(data);
    //             setIsLoading(false);
    //             setTimeout(() => {
    //                 setShowContent(true);
    //             }, 100); // Delay to trigger animations
    //         })
    //         .catch(error => {
    //             console.error('Error fetching landing data:', error);
    //             setIsLoading(false);
    //         });
    // }, []);

    if(isLoading || !data) {
        return (
            <AppLanding showContent={false} setShowContent={() => {}}>
                <Head title="Porfolio" />
                <main>
                    <p>Loading...</p>
                </main>
            </AppLanding>
        );
    }
    

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent} fetchingData={isLoading}>
            <Head title="Porfolio" />

            <main>
                <Hero appear={showContent} />
                <About appear={showContent} stacks={data.stacks} tools={data.tools} educations={data.educations} experiences={data.experiences} />
                <Projects appear={showContent} projects={data.projects} />
                <Sandbox appear={showContent} projects={data.sandbox} />
                <Contact appear={showContent} contacts={data.contacts}/>
            </main>
        </AppLanding>
    );
}
