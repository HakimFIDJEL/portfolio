// layouts/landing/layout.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { type ReactNode, useState, useEffect } from 'react';

// Shadcn UI Components
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

// Components
import ScrollTopButton from '@/components/landing/scroll-top-button';
import TransitionScreen from '@/components/landing/transition-screen';
import Footer from '@/layouts/landing/footer';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Navigation from '@/layouts/landing/navigation';
import Antigravity from '@/components/antigravity';

// Contexts
import CoverScreen from '@/components/landing/cover-screen';
import {
    LandingTransitionsProvider,
    useLandingContext,
} from '@/contexts/use-landing-context';

// Hooks
import { useIsMobile } from '@/hooks/use-mobile';

interface AppLandingProps {
    children: ReactNode;
}

function AppLandingContent({ children }: AppLandingProps) {
    const {
        // Params
        contentActive,

        // states
        navigationWrapperActive,
        navigationContentActive,
        transitionPanelsActive,

        // Loader states
        introLoaderWrapperActive,
        introLoaderContentActive,

        transitionLoaderWrapperActive,
        transitionLoaderContentActive,

        // handlers
        setNavigationActive,
        _navigateToPage,
    } = useLandingContext();

    const isMobile = useIsMobile();


    return (
        <>
            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased',
                )}
            >
                {/* <BreakpointIndicator className="fixed bottom-5 left-6" /> */}

                {!isMobile && (
                    <div className={cn('pointer-events-none fixed inset-0 z-10')}>
                        <Antigravity
                            count={200}
                            magnetRadius={50}
                            ringRadius={8}
                            waveSpeed={0.4}
                            waveAmplitude={1.3}
                            idleSize={0.2}
                            activeSize={0.5}
                            idleColorVar="--foreground"
                            activeColorVar="--primary"
                            lerpSpeed={0.4}
                            autoAnimate={false}
                            particleVariance={1}
                            rotationSpeed={0.1}
                            depthFactor={1.9}
                            pulseSpeed={10}
                            particleShape="capsule"
                            fieldStrength={30}
                        />
                    </div>
                )}

                <Loader
                    showLoader={introLoaderWrapperActive}
                    showLoaderContent={introLoaderContentActive}
                />

                <TransitionScreen 
                    active={transitionPanelsActive.active} 
                    mode={transitionPanelsActive.mode} 
                />

                <CoverScreen showWrapper={transitionLoaderWrapperActive} showContent={transitionLoaderContentActive} />

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
}

export default function AppLanding({
    children,
}: AppLayoutProps) {
    return (
        <LandingTransitionsProvider>
            <AppLandingContent>
                {children}
            </AppLandingContent>
        </LandingTransitionsProvider>
    );
}
