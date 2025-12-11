// resources/js/pages/project.tsx

// Necessary imports
import { Head } from '@inertiajs/react';
import { useState } from 'react';

// Layout
import AppLanding from '@/layouts/landing/layout';
import { useLandingTransitions } from '@/hooks/use-loading-transition';

// Sections

export default function Project() {


    // States content
    const [showContent, setShowContent] = useState(false);

    return (
        <AppLanding showContent={showContent} setShowContent={setShowContent}>
            <Head title="Project" />

            <main>

            </main>
        </AppLanding>
    );
}
