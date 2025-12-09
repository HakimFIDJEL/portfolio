// resources/js/pages/landing.tsx

// Necessary imports
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Hero from '@/components/landing/sections/hero';
import About from '@/components/landing/sections/about';

export default function Landing() {
    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Landing page" />

            <main className="min-h-[300vh]">
                <Hero appear={showContent} />
                <About appear={showContent} />
            </main>
        </AppLanding>
    );
}
