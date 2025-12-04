// pages/welcome.tsx

// Necessary imports
import { Head } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Translation Hook
// import { useTrans } from '@/lib/translation';

// Components
import Header from '@/layouts/landing/header';

// Types

export default function Welcome() {
    return (
        <AppLanding>
            <Head title="Landing page" />

            <Header />

            <main>
                {/* Hakim Fidjel */}
            </main>
        </AppLanding>
    );
}
