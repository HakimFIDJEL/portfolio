// resources/js/layouts/landing/header.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Components
import UnderlineLink from '@/components/landing/underline-link';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

interface HeaderProps {
    showContent: boolean;
    handleMenuToggle: (open: boolean) => void;
}

export default function Header({ showContent, handleMenuToggle }: HeaderProps) {
    const [scrollY, setScrollY] = useState(0);
    const [showMenu, setShowMenu] = useState(true);

    const { _navigateToPage } = useLandingContext();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor: string = 'top',
    ) {
        e.preventDefault();
        _navigateToPage(href, anchor);
    }

    useEffect(() => {
        let lastScrollY = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY) {
                // Down
                setShowMenu(false);
            } else if (currentScrollY < lastScrollY - 10) {
                // Up
                setShowMenu(true);
            }

            setScrollY(currentScrollY);
            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setShowMenu]);

    const currentUrl = usePage().url.split('#')[0];
    const homePath = new URL(route('home')).pathname;

    return (
        <header
            className={cn(
                // Default styles
                'sticky top-0 right-0 left-0 z-10 grid w-full',
                'transition-all duration-1000',
                'border-b border-transparent',

                // Responsive styles
                'px-8 py-6 lg:px-12.5 lg:py-10',
                'grid-cols-2 md:grid-cols-3',
                'h-[73px] lg:h-[105px]',

                // Conditional styles based on showContent & showMenu state

                (!showContent || (showContent && !showMenu)) &&
                    'translate-y-[-100%] duration-500',

                scrollY > 50 &&
                    'border-border bg-background/50 !backdrop-blur-lg',
            )}
        >
            <div
                className={cn(
                    // Default styles
                    'col-span-1',
                )}
            >
                <MenuButton handleClick={handleMenuToggle} />
            </div>
            <div
                className={cn(
                    // Default styles
                    'col-span-1 text-base font-medium italic',

                    // Responsive styles
                    'text-right md:text-center',
                )}
            >
                <a
                    onClick={currentUrl === homePath ? () => {} : (e) => handleProjectClick(e, route('home'))}
                    href={currentUrl === homePath ? '#top' : route('home')}
                    className={cn(
                        // Focus styles
                        'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
                    )}
                >
                    HF
                </a>
            </div>
            <div
                className={cn(
                    // Default styles
                    'col-span-1 text-right',

                    // Responsive styles
                    'hidden md:block',
                )}
            >
                <UnderlineLink
                    onClick={currentUrl === homePath ? () => {} : (e) => handleProjectClick(e, route('home'), 'contact')}
                    href={currentUrl === homePath ? '#contact' : route('home')}
                >
                    Contact
                </UnderlineLink>
            </div>
        </header>
    );
}

interface MenuButtonProps {
    handleClick: (open: boolean) => void;
}
function MenuButton({ handleClick }: MenuButtonProps) {
    return (
        <button
            onClick={() => handleClick(true)}
            className={cn(
                'group flex h-full cursor-pointer flex-col justify-center gap-[8px]',
                'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
            )}
        >
            <span className="block h-[2px] w-[45px] bg-foreground"></span>
            <span className="block h-[2px] w-[30px] bg-foreground transition-all group-hover:w-[45px] group-focus-visible:w-[45px]"></span>
        </button>
    );
}
