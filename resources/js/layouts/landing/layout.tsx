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

// Translation
import { useTrans } from '@/lib/translation';

interface AppLandingProps {
    children: ReactNode;
}

function AppLandingContent({ children }: AppLandingProps) {
    const __ = useTrans();
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
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-10000 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-ring focus:outline-none"
            >
                {__('landing.seo.skip_to_content', 'Passer au contenu principal')}
            </a>

            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased',
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
