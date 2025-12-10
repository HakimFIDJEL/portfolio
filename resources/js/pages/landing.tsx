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

export default function Landing() {
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
            <Head title="Landing page" />

            <main>
                {/* <Hero appear={showContent} /> */}
                {/* <About appear={showContent} /> */}
                <Projects appear={showContent} />
            </main>
        </AppLanding>
    );
}
