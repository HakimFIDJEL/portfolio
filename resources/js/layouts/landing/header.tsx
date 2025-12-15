// resources/js/layouts/landing/header.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Components
import UnderlineLink from '@/components/landing/underline-link';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Translation
import { useTrans } from '@/lib/translation';

// Types
import { SharedData } from '@/types';

interface HeaderProps {
    showContent: boolean;
    handleMenuToggle: (open: boolean) => void;
    navigateToPage: (href: string, anchor: string | null) => void;
}

export default function Header({ showContent, handleMenuToggle, navigateToPage }: HeaderProps) {
    const [scrollY, setScrollY] = useState(0);
    const [showMenu, setShowMenu] = useState(true);

    const __ = useTrans();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor: string = 'top',
    ) {
        e.preventDefault();
        navigateToPage(href, anchor);
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

    const { auth } = usePage<SharedData>().props;
    const user = auth ? auth.user : null;

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
                    aria-label={__('landing.seo.go_to_home', 'Go to home page')}
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
                    'hidden md:flex',
                    'items-center justify-end gap-8',
                )}
            >
                <UnderlineLink
                    aria_label={__('landing.seo.scroll_to_section', 'Scroll to :section section', { section: 'contact' })}
                    onClick={currentUrl === homePath ? () => {} : (e) => handleProjectClick(e, route('home'), 'contact')}
                    href={currentUrl === homePath ? '#contact' : route('home')}
                >
                    {__('landing.layout.header.contact', 'Contact')}
                </UnderlineLink>

                {user && (
                    <UnderlineLink
                        aria_label={__('landing.seo.go_to_dashboard', 'Go to dashboard')}
                        href={route('dashboard')}
                    >
                        {__('landing.layout.header.dashboard', 'Dashboard')}
                    </UnderlineLink>
                )}
            </div>
        </header>
    );
}

interface MenuButtonProps {
    handleClick: (open: boolean) => void;
}
function MenuButton({ handleClick }: MenuButtonProps) {

    const __ = useTrans();

    return (
        <button
            aria-label={__('landing.seo.toggle_menu', 'Toggle menu')}
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
