// layouts/landing/layout.tsx

// Necessary imports
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useEffect, useState, type ReactNode } from 'react';

// Components
import TransitionScreen from '@/components/landing/transition-screen';
import Header from '@/layouts/landing/header';
import Navigation from '@/layouts/landing/navigation';

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLanding({ children }: AppLayoutProps) {
    const [showMenu, setShowMenu] = useState(true);
    const [transitionScreenActive, setTransitionScreenActive] = useState(false);

    const [switchNavigation, setSwitchNavigation] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showNavigationContent, setShowNavigationContent] = useState(false);

    // Handle navigation transitions
    useEffect(() => {
        if (switchNavigation) {
            setTransitionScreenActive(true);
            setShowMenu(false);

            const timeout = setTimeout(() => {
                setShowNavigation(true);

                setTimeout(() => {
                    setShowNavigationContent(true);
                }, 0);
            }, 500);

            return () => clearTimeout(timeout);
        } else {
            // We first hide the navigation content
            setShowNavigationContent(false);

            const timeout = setTimeout(() => {
                setShowNavigation(false);

                setTimeout(() => {
                    setTransitionScreenActive(false);
                    setTimeout(() => {
                        setShowMenu(true);
                    }, 500);
                }, 0);
            }, 750);

            return () => clearTimeout(timeout);
        }
    }, [switchNavigation]);

    return (
        <>
            <div className="landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased">
                <TransitionScreen active={transitionScreenActive} />

                <Navigation
                    showNavigation={showNavigation}
                    showNavigationContent={showNavigationContent}
                    handleMenuToggle={setSwitchNavigation}
                />

                <Header
                    showMenu={showMenu}
                    setShowMenu={setShowMenu}
                    handleMenuToggle={setSwitchNavigation}
                />
                {children}
            </div>
            <PlaceholderPattern className="fixed inset-0 z-0 size-full h-[100vh] w-[100vw] stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </>
    );
}
