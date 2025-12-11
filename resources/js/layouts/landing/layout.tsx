// layouts/landing/layout.tsx

// Necessary imports
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Shadcn UI Components
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { BreakpointIndicator } from '@/components/ui/breakpoint-indicator';

// Hooks
import { useLandingTransitions } from '@/hooks/use-loading-transition';

// Components
import TransitionScreen from '@/components/landing/transition-screen';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Footer from '@/layouts/landing/footer';
import Navigation from '@/layouts/landing/navigation';
import ScrollTopButton from '@/components/landing/scroll-top-button';

// Contexts
import {
    useLandingContext,
    LandingTransitionsProvider,
} from '@/contexts/use-landing-context';


interface AppLayoutProps {
    children: ReactNode;
    showContent: boolean;
    setShowContent: (show: boolean) => void;
}

function AppLandingContent({
    children,
    showContent,
    setShowContent,
}: AppLayoutProps) {

    const skipLoader = true;

    const {
        // states
        loaderActive,
        loaderContentActive,
        navigationActive,
        navigationContentActive,
        contentActive,
        transitionPanelsActive,

        // handlers
        _toggleNavigation,
        _navigateToPage,

        // low-level setters if needed
        setNavigationActive,
        setTransitionPanelsActive,
        setContentActive,
    } = useLandingContext();

    return (
        <>
            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased',
                    // !showContent &&
                    //     'pointer-events-none h-[100vh] overflow-hidden select-none',
                )}
            >
                
                <BreakpointIndicator className="fixed bottom-5 left-6" />


                <Loader
                    showLoader={loaderActive}
                    showLoaderContent={loaderContentActive}
                />

                <TransitionScreen active={transitionPanelsActive} />

                <Navigation
                    showNavigation={navigationActive}
                    showNavigationContent={navigationContentActive}
                    handleMenuToggle={() => _toggleNavigation(false)}
                />

                <Header
                    showContent={contentActive}
                    handleMenuToggle={() => _toggleNavigation(true)}
                />

                {children}

                <Footer appear={showContent} />


                <ScrollTopButton appear={showContent} />
            </div>
            <PlaceholderPattern className="fixed inset-0 z-0 size-full h-[100vh] w-[100vw] stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </>
    );
}

export default function AppLanding({
    children,
    showContent,
    setShowContent,
}: AppLayoutProps) {
    const skipLoader = true;
    
    return (
        <LandingTransitionsProvider
            initialShowContent={showContent}
            setShowContentExternal={setShowContent}
            skipLoader={skipLoader}
        >
            <AppLandingContent
                showContent={showContent}
                setShowContent={setShowContent}
            >
                {children}
            </AppLandingContent>
        </LandingTransitionsProvider>
    );
}