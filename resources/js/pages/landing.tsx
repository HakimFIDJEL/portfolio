// resources/js/pages/landing.tsx
import { useState } from 'react';

// Necessary imports
import { Head } from '@inertiajs/react';

// Layout
import AppLanding from '@/layouts/landing/layout';

// Translation Hook
// import { useTrans } from '@/lib/translation';

// Components
import Header from '@/layouts/landing/header';
import TransitionScreen from '@/components/landing/transition-screen';

// Types

export default function Landing() {

    const [transitionScreenActive, setTransitionScreenActive] = useState(false);

    return (
        <AppLanding>
            <Head title="Landing page" />

            <TransitionScreen active={transitionScreenActive} />

            <Header handleMenuToggle={setTransitionScreenActive}/>

            <main>
                {/* Hakim Fidjel */}
            </main>
        </AppLanding>
    );
}
