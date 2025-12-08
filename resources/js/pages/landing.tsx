// resources/js/pages/landing.tsx

// Necessary imports
import { Head, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Hero from '@/components/landing/sections/hero';

export default function Landing() {

    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Landing page" />

            <main className="min-h-[200vh]">
                <Hero appear={showContent} />
            </main>
        </AppLanding>
    );
}
