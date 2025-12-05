// resources/js/layouts/landing/navigation.tsx

// Necessary imports
import { Curtain } from '@/components/landing/curtain';
import { cn } from '@/lib/utils';

interface NavigationProps {
    showNavigation: boolean;
    showNavigationContent: boolean;
    handleMenuToggle: (show: boolean) => void;
}

export default function Navigation({
    showNavigation,
    showNavigationContent,
    handleMenuToggle,
}: NavigationProps) {
    return (
        <nav
            className={cn(
                // Default styles
                'pointer-events-none fixed inset-0 z-2000 translate-y-[-100%] bg-card opacity-0',

                // Conditional styles based on showNavigation state
                showNavigation &&
                    'pointer-events-auto translate-y-0 opacity-100',
            )}
        >
            <NavigationHeader
                showNavigationContent={showNavigationContent}
                handleMenuToggle={handleMenuToggle}
            />
        </nav>
    );
}

interface NavigationHeaderProps {
    showNavigationContent: boolean;
    handleMenuToggle: (show: boolean) => void;
}

function NavigationHeader({
    showNavigationContent,
    handleMenuToggle,
}: NavigationHeaderProps) {
    return (
        <Curtain
            showCurtain={!showNavigationContent}
            className={cn(
                'fixed top-0 right-0 left-0 z-10 mx-auto w-[90%] max-w-7xl',
            )}
        >
            <div
                className={cn(
                    // Default styles
                    'transition-all delay-0 duration-500',
                    'translate-y-[-50%]',
                    'grid grid-cols-2',

                    // Responsive styles
                    'px-8 py-6 lg:px-12.5 lg:py-10',

                    // Conditional styles based on showNavigationContent state
                    showNavigationContent && 'translate-y-0 duration-1000',
                )}
            >
                <div
                    className={cn(
                        // Default styles
                        'col-span-1',
                        'text-left',
                    )}
                >
                    <NavigationButton
                        handleClick={() => handleMenuToggle(false)}
                    />
                </div>
                <div
                    className={cn(
                        // Default styles
                        'col-span-1 text-base font-medium italic',
                        'text-right',
                    )}
                >
                    HF
                </div>
            </div>
        </Curtain>
    );
}

interface NavigationButtonProps {
    handleClick: (open: boolean) => void;
}

function NavigationButton({ handleClick }: NavigationButtonProps) {
    return (
        <button
            onClick={() => handleClick(false)}
            className={cn(
                'relative flex h-full cursor-pointer flex-col items-center justify-center pt-[6px]',
                'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
            )}
        >
            {/* Barre du haut */}
            <span
                className={cn(
                    'block h-[2px] w-[25px] bg-foreground transition-all duration-300',
                    '-translate-y-[3px] rotate-45',
                )}
            />

            <span
                className={cn(
                    'block h-[2px] w-[25px] bg-foreground transition-all duration-300',
                    '-translate-y-[5px] -rotate-45',
                )}
            />
        </button>
    );
}
