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
    const [isFetching, setIsFetching] = useState(true);
    const [contentActive, setContentActive] = useState(false);

    useEffect(() => {
        fetch(route('landing.data'))
            .then(response => response.json())
            .then((data: LandingData) => {
                setData(data);
                setTimeout(() => {
                    setIsFetching(false);
                }, 1000);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setIsFetching(false);
            });
    }, [isFetching]);

    if(isFetching || !data) {
        return (
            <AppLanding contentActive={contentActive} setContentActive={() => {}} fetchingData={isFetching} >
                <Head title="Fetching" />
                <main>
                    <p>Loading...</p>
                </main>
            </AppLanding>
        );
    }
    

    return (
        <AppLanding contentActive={contentActive} setContentActive={setContentActive} fetchingData={isFetching}>
            <Head title="Portfolio" />

            <main>
                <Hero appear={contentActive} />
                <About appear={contentActive} stacks={data.stacks} tools={data.tools} educations={data.educations} experiences={data.experiences} />
                <Projects appear={contentActive} projects={data.projects} />
                <Sandbox appear={contentActive} projects={data.sandbox} />
                <Contact appear={contentActive} contacts={data.contacts}/>
            </main>
        </AppLanding>
    );
}
