// resources/js/pages/landing.tsx

// Necessary imports
import { Head } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Sections
import Hero from '@/components/landing/sections/hero';

export default function Landing() {
    return (
        <AppLanding>
            <Head title="Landing page" />

            <main className="min-h-[200vh]">
                <Hero />
            </main>
        </AppLanding>
    );
}
