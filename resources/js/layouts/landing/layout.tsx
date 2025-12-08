// layouts/landing/layout.tsx

// Necessary imports
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { useEffect, useState, type ReactNode } from 'react';

// Shadcn UI Components

// Components
import TransitionScreen from '@/components/landing/transition-screen';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Navigation from '@/layouts/landing/navigation';

// Pages

interface AppLayoutProps {
    children: ReactNode;
    showContent: boolean;
    setShowContent: (show: boolean) => void;
}

export default function AppLanding({
    children,
    showContent,
    setShowContent,
}: AppLayoutProps) {
    // States
    const [showMenu, setShowMenu] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);

    
    // States menu & navigation
    const [transitionScreenActive, setTransitionScreenActive] = useState(false);
    const [switchNavigation, setSwitchNavigation] = useState(false);
    const [showNavigationContent, setShowNavigationContent] = useState(false);

    // States loader
    const [showLoader, setShowLoader] = useState(true);
    const [showLoaderContent, setShowLoaderContent] = useState(false);

    // Handle navigation transitions
    useEffect(() => {
        if(showLoader) return;

        if (switchNavigation) {
            setTransitionScreenActive(true);
            setShowMenu(false);
            setShowContent(false);

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
                        setShowContent(true);
                    }, 500);
                }, 0);
            }, 750);

            return () => clearTimeout(timeout);
        }
    }, [switchNavigation]);

    

    // Handle appear state
    useEffect(() => {
        setShowLoaderContent(true);

        const timeout = setTimeout(() => {
            setShowLoaderContent(false);
            setTimeout(() => {
                setShowLoader(false);

                setTimeout(() => {
                    setShowContent(true);
                    setShowMenu(true);
                }, 500);
            }, 500);
        }, 1500);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <>
            <div className="landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased">
                <Loader
                    showLoader={showLoader}
                    showLoaderContent={showLoaderContent}
                />

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
