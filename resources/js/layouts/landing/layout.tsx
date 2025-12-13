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

interface AppLayoutProps {
    children: ReactNode;
    showContent: boolean;
    setShowContent: (show: boolean) => void;
}

function AppLandingContent({ children, showContent }: AppLayoutProps) {
    const {
        // states
        loaderActive,
        loaderContentActive,
        navigationActive,
        navigationContentActive,
        contentActive,
        transitionPanelsActive,
        coverScreenActive,

        // handlers
        _toggleNavigation,
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
                    showLoader={loaderActive}
                    showLoaderContent={loaderContentActive}
                />

                <TransitionScreen active={transitionPanelsActive} />

                <CoverScreen active={coverScreenActive} />

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
    const [hasLoadedInitially, setHasLoadedInitially] = useRemember(
        false,
        'loader-state',
    );
    const [showPanels, setShowPanels] = useRemember(false, 'panels-state');

    // const initialSkipLoader = !hasLoadedInitially;
    const initialSkipLoader = true;
    // const showPanelsFinal = initialSkipLoader;
    const showPanelsFinal = false;

    useEffect(() => {
        setHasLoadedInitially(true);
        setShowPanels(true);
    }, [showPanels, setHasLoadedInitially, setShowPanels]);

    return (
        <LandingTransitionsProvider
            initialShowContent={showContent}
            setShowContentExternal={setShowContent}
            skipLoader={initialSkipLoader}
            showPanels={showPanelsFinal}
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
