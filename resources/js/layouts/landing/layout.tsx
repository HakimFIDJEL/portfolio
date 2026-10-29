// layouts/landing/layout.tsx

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

// Shadcn UI Components
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

// Components
import CoverScreen from '@/components/landing/cover-screen';
import ScrollTopButton from '@/components/landing/scroll-top-button';
import TransitionScreen from '@/components/landing/transition-screen';
import Footer from '@/layouts/landing/footer';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Navigation from '@/layouts/landing/navigation';

// Contexts
import {
    LandingTransitionsProvider,
    useLandingContext,
} from '@/contexts/use-landing-context';

interface AppLandingProps {
    children: ReactNode;
}

function AppLandingContent({ children }: AppLandingProps) {
    const {
        contentActive,
        navigationWrapperActive,
        navigationContentActive,
        transitionPanelsActive,
        introLoaderWrapperActive,
        introLoaderContentActive,
        transitionLoaderWrapperActive,
        transitionLoaderContentActive,
        setNavigationActive,
        _navigateToPage,
    } = useLandingContext();

    return (
        <>
            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-full max-w-7xl overflow-x-hidden bg-background antialiased sm:w-[90%] sm:overflow-x-visible',
                )}
            >
                <Loader
                    showLoader={introLoaderWrapperActive}
                    showLoaderContent={introLoaderContentActive}
                />

                <TransitionScreen
                    active={transitionPanelsActive.active}
                    mode={transitionPanelsActive.mode}
                />

                <CoverScreen
                    showWrapper={transitionLoaderWrapperActive}
                    showContent={transitionLoaderContentActive}
                />

                <Navigation
                    showNavigation={navigationWrapperActive}
                    showNavigationContent={navigationContentActive}
                    handleMenuToggle={() => setNavigationActive(false)}
                />

                <div inert={navigationWrapperActive}>
                    <Header
                        showContent={contentActive}
                        isNavigationOpen={navigationWrapperActive}
                        handleMenuToggle={() => setNavigationActive(true)}
                        navigateToPage={_navigateToPage}
                    />

                    {children}

                    <Footer appear={contentActive} />

                    <ScrollTopButton appear={contentActive} />
                </div>
            </div>
            <PlaceholderPattern className="fixed inset-0 z-0 size-full h-[100vh] w-[100vw] stroke-neutral-900/20 dark:stroke-neutral-100/20" />
        </>
    );
}

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLanding({ children }: AppLayoutProps) {
    return (
        <LandingTransitionsProvider>
            <AppLandingContent>{children}</AppLandingContent>
        </LandingTransitionsProvider>
    );
}
