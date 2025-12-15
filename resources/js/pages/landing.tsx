// resources/js/pages/landing.tsx

// Necessary imports
import { Head, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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

// Mocks
import {
    Contact as ContactType,
    Education as EducationType,
    Experience as ExperienceType,
    Project,
    SharedData,
    Stack,
    Tool,
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
    const { contentActive, fetchingData, setFetchingData } =
        useLandingContext();

    const [data, setData] = useState<LandingData | null>(null);

    const { locale } = usePage<SharedData>().props;

    useEffect(() => {
        if (!fetchingData) setFetchingData(true);
        let timer: ReturnType<typeof setTimeout>;

        fetch(route('landing.data'))
            .then((response) => response.json())
            .then((data: LandingData) => {
                setData(data);
                timer = setTimeout(() => {
                    window.scrollTo(0, 0);
                    setFetchingData(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setFetchingData(false);
            });

        return () => clearTimeout(timer);
    }, [locale]);

    if (fetchingData || !data) {
        return (
            <>
                <Head title="Portfolio" />
                <main>
                    <p>Loading...</p>
                </main>
            </>
        );
    }

    return (
        <>
            <Head title="Portfolio" />

            <main>
                <Hero appear={contentActive} />
                <About
                    appear={contentActive}
                    stacks={data.stacks}
                    tools={data.tools}
                    educations={data.educations}
                    experiences={data.experiences}
                />
                <Projects appear={contentActive} projects={data.projects} />
                <Sandbox appear={contentActive} projects={data.sandbox} />
                <Contact appear={contentActive} contacts={data.contacts} />
            </main>
        </>
    );
}

Landing.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
