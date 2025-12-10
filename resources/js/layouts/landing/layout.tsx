// layouts/landing/layout.tsx

// Necessary imports
import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

// Shadcn UI Components
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';

// Hooks
import { useLandingTransitions } from '@/hooks/use-loading-transition';

// Components
import TransitionScreen from '@/components/landing/transition-screen';
import Header from '@/layouts/landing/header';
import Loader from '@/layouts/landing/loader';
import Navigation from '@/layouts/landing/navigation';


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

    const skipLoader = false;

    const {
        showLoader,
        showLoaderContent,
        showNavigation,
        showNavigationContent,
        setSwitchNavigation,
        showMenu,
        setShowMenu,
        transitionScreenActive,
    } = useLandingTransitions(showContent, setShowContent, skipLoader);

    // TODO : Fix scroll up when navigation is opened

    return (
        <>
            <div
                className={cn(
                    'landing transition-default relative z-1 mx-auto min-h-screen w-[90%] max-w-7xl bg-background antialiased',
                    // !showContent &&
                    //     'pointer-events-none h-[100vh] overflow-hidden select-none',
                )}
            >
                {/* <ScreenWidthDisplay /> */}

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
