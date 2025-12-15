// layouts/landing/layout.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { useRemember } from '@inertiajs/react';
import { useEffect, type ReactNode } from 'react';

// Shadcn UI Components
import { BreakpointIndicator } from '@/components/ui/breakpoint-indicator';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

// Components
import ScrollTopButton from '@/components/landing/scroll-top-button';
import TransitionScreen from '@/components/landing/transition-screen';
import Footer from '@/layouts/landing/footer';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Navigation from '@/layouts/landing/navigation';

// Contexts
import CoverScreen from '@/components/landing/cover-screen';
import {
    LandingTransitionsProvider,
    useLandingContext,
} from '@/contexts/use-landing-context';

interface AppLandingProps {
    children: ReactNode;
}

function AppLandingContent({ children }: AppLandingProps) {
    const {
        // Params
        contentActive,
        initialLoaderState,

        // states
        navigationActive,
        navigationWrapperActive,
        navigationContentActive,
        transitionPanelsActive,

        // Loader states
        introLoaderWrapperActive,
        introLoaderContentActive,

        

        // handlers
        setNavigationActive,
        _navigateToPage,
    } = useLandingContext();

    return (
        <>
            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased',
                )}
            >
                <BreakpointIndicator className="fixed bottom-5 left-6" />

                <Loader
                    showLoader={introLoaderWrapperActive}
                    showLoaderContent={introLoaderContentActive}
                />

                <TransitionScreen 
                    active={transitionPanelsActive} 
                    mode={initialLoaderState === 'transition' ? 'instant' : 'staggered'} 
                />

                {/* <CoverScreen active={coverScreenActive} /> */}

                <Navigation
                    showNavigation={navigationWrapperActive}
                    showNavigationContent={navigationContentActive}
                    handleMenuToggle={() => setNavigationActive(false)}
                />

                <Header
                    showContent={contentActive}
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

    contentActive: boolean;
    setContentActive: (show: boolean) => void;
    fetchingData?: boolean;
}

export default function AppLanding({
    children,
    contentActive,
    setContentActive,
    fetchingData,
}: AppLayoutProps) {

    // TO REMOVE
    // const [hasLoadedInitially, setHasLoadedInitially] = useRemember(
    //     false,
    //     'loader-state',
    // );
    // const [showPanels, setShowPanels] = useRemember(false, 'panels-state');

    // const initialSkipLoader = !hasLoadedInitially;
    // const showPanelsFinal = initialSkipLoader;

    // useEffect(() => {
    //     setHasLoadedInitially(true);
    //     setShowPanels(true);
    // }, [showPanels, setHasLoadedInitially, setShowPanels]);

    return (
        <LandingTransitionsProvider
            fetchingData={fetchingData}
            contentActive={contentActive}
            setContentActive={setContentActive}
        >
            <AppLandingContent>
                {children}
            </AppLandingContent>
        </LandingTransitionsProvider>
    );
}
