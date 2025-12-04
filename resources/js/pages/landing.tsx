// pages/welcome.tsx

// Necessary imports
import { Head, usePage } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Translation Hook
// import { useTrans } from '@/lib/translation';

// Components

// Types

export default function Welcome() {
    return (
        <AppLanding>
            <Head title="Landing page" />

            <main>
                Hakim Fidjel
            </main>
        </AppLanding>
    );
}
