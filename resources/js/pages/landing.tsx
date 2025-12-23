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

// Translation
import { useTrans } from '@/lib/translation';

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

    const __ = useTrans();

    useEffect(() => {
        if (!fetchingData) setFetchingData(true);
        let timer: ReturnType<typeof setTimeout>;

        fetch(route('landing.data'))
            .then((response) => response.json())
            .then((data: LandingData) => {
                setData(data);
                timer = setTimeout(() => {
                    setFetchingData(false);
                }, 1000);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setFetchingData(false);
            });

        return () => clearTimeout(timer);
    }, [locale]);

    return (
        <>
            <Head>
                <meta name='description' content={__('landing.landing.meta_description', "Hakim Fidjel's portfolio. Discover my projects, skills, and ambitions as a FullStack engineering apprentice in the field of computer engineering.")} />
            </Head>

            <main>
                <Hero appear={contentActive} />
                <About
                    appear={contentActive}
                    stacks={(fetchingData || !data) ? [] : data.stacks}
                    tools={(fetchingData || !data) ? [] : data.tools}
                    educations={(fetchingData || !data) ? [] : data.educations}
                    experiences={(fetchingData || !data) ? [] : data.experiences}
                />
                <Projects appear={contentActive} projects={(fetchingData || !data) ? [] : data.projects} />
                <Sandbox appear={contentActive} projects={(fetchingData || !data) ? [] : data.sandbox} />
                <Contact appear={contentActive} contacts={(fetchingData || !data) ? [] : data.contacts} />
            </main>
        </>
    );
}

Landing.layout = (page: React.ReactNode) => <AppLanding>{page}</AppLanding>;
