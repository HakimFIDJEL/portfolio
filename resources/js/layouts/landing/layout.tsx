// layouts/landing/layout.tsx

// Necessary imports
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useEffect, useState, type ReactNode } from 'react';

// Components
import TransitionScreen from '@/components/landing/transition-screen';
import Header from '@/layouts/landing/header';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLanding({ children }: AppLayoutProps) {
    const [transitionScreenActive, setTransitionScreenActive] = useState(false);

    useEffect(() => {
        if(transitionScreenActive) {
            const timer = setTimeout(() => {
                setTransitionScreenActive(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [transitionScreenActive]);

    return (
        <>
            <div className="landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased">
                <TransitionScreen active={transitionScreenActive} />

                <Header showMenu={!transitionScreenActive} handleMenuToggle={setTransitionScreenActive} />
                {children}
            </div>
            <PlaceholderPattern className="fixed inset-0 z-0 size-full h-[100vh] w-[100vw] stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </>
    );
}
