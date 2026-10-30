// resources/js/layouts/landing/navigation.tsx

import {
    NAVIGATION_ITEM_CLOSE_DELAY,
    NAVIGATION_ITEM_CLOSE_DURATION,
    NAVIGATION_SECTIONS,
} from '@/lib/navigation';
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useMemo, useState } from 'react';

// Components
import Curtain from '@/components/landing/curtain';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Icons
import { ArrowRight } from 'lucide-react';

// Translation
import { useTrans } from '@/lib/translation';

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
    const __ = useTrans();
    const { navigationActive } = useLandingContext();

    useEffect(() => {
        if (!navigationActive) {
            return;
        }

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                handleMenuToggle(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [navigationActive, handleMenuToggle]);

    return (
        <nav
            id="navigation-menu"
            aria-label={__(
                'landing.layout.navigation.title',
                'Menu de navigation',
            )}
            className={cn(
                'pointer-events-none fixed inset-0 z-2000 translate-y-[-100%] opacity-0',
                'flex items-end justify-start',
                // 'bg-card',
                showNavigation &&
                    'pointer-events-auto translate-y-0 opacity-100',
            )}
        >
            <NavigationHeader
                showNavigationContent={showNavigationContent}
                handleMenuToggle={handleMenuToggle}
            />
            <NavigationContent
                showNavigationContent={showNavigationContent}
                handleMenuToggle={handleMenuToggle}
            />
        </nav>
    );
}

interface NavigationHeaderProps {
    showNavigationContent: boolean;
    handleMenuToggle: (show: boolean) => void;
    closeDuration?: number;
}

function NavigationHeader({
    showNavigationContent,
    handleMenuToggle,
    closeDuration = NAVIGATION_ITEM_CLOSE_DURATION,
}: NavigationHeaderProps) {
    return (
        <Curtain
            showCurtain={!showNavigationContent}
            closeDuration={closeDuration}
            className="fixed top-0 right-0 left-0 z-10 mx-auto w-full max-w-7xl sm:w-[90%]"
        >
            <div
                className={cn(
                    'grid grid-cols-2',
                    'px-6 py-4 sm:px-8 sm:py-6 lg:px-12.5 lg:py-10',
                )}
            >
                <div className="col-span-1 text-left">
                    <NavigationButton
                        show={showNavigationContent}
                        handleClick={() => handleMenuToggle(false)}
                    />
                </div>
                <div className="col-span-1 text-right text-base font-medium italic">
                    HF
                </div>
            </div>
        </Curtain>
    );
}

interface NavigationButtonProps {
    show: boolean;
    handleClick: (open: boolean) => void;
}

function NavigationButton({ show, handleClick }: NavigationButtonProps) {
    const __ = useTrans();

    return (
        <button
            type="button"
            aria-label={__('landing.seo.close_dialog', 'Fermer le menu')}
            tabIndex={show ? 0 : -1}
            onClick={() => handleClick(false)}
            className={cn(
                'relative flex h-full cursor-pointer flex-col items-center justify-center pt-[6px]',
                'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',
                'hover:rotate-90',
            )}
        >
            <span className="block h-[2px] w-[25px] -translate-y-[3px] rotate-45 bg-foreground transition-all duration-300" />
            <span className="block h-[2px] w-[25px] -translate-y-[5px] -rotate-45 bg-foreground transition-all duration-300" />
        </button>
    );
}

interface NavigationContentProps {
    showNavigationContent: boolean;
    handleMenuToggle: (show: boolean) => void;
}
type Link = { index: string; href: string; label: string; show: boolean };

function NavigationContent({
    showNavigationContent,
    handleMenuToggle,
}: NavigationContentProps) {
    const __ = useTrans();

    const links: Link[] = useMemo(
        () =>
            NAVIGATION_SECTIONS.map((section, index) => ({
                index: String(index + 1).padStart(2, '0'),
                href: `#${section.anchor}`,
                label: __(
                    `landing.layout.navigation.${section.key}`,
                    section.label,
                ),
                show: false,
            })),
        [__],
    );

    const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);

    useEffect(() => {
        const initialLinks = links.map((l) => ({ ...l, show: false }));
        setVisibleLinks(initialLinks);
    }, [links]);

    useEffect(() => {
        const timeoutIds: ReturnType<typeof setTimeout>[] = [];

        function handleLinksVisibility(show: boolean) {
            links.forEach((link, index) => {
                const id = setTimeout(
                    () => {
                        setVisibleLinks((prev) =>
                            prev.map((l) =>
                                l.label === link.label ? { ...l, show } : l,
                            ),
                        );
                    },
                    index * (show ? 125 : NAVIGATION_ITEM_CLOSE_DELAY),
                );
                timeoutIds.push(id);
            });
        }

        if (showNavigationContent) {
            handleLinksVisibility(true);
        } else {
            handleLinksVisibility(false);
        }

        return () => {
            timeoutIds.forEach(clearTimeout);
        };
    }, [showNavigationContent, links]);

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col px-6 py-4 sm:w-[90%] sm:px-8 sm:py-6 lg:px-12.5 lg:py-10">
            {visibleLinks.map((link, index) => (
                <NavigationLink
                    link={link}
                    key={index}
                    closeDuration={NAVIGATION_ITEM_CLOSE_DURATION}
                    handleMenuToggle={handleMenuToggle}
                />
            ))}
        </div>
    );
}

interface NavigationLinkProps {
    link: Link;
    closeDuration?: number;
    handleMenuToggle: (show: boolean) => void;
}
function NavigationLink({
    link,
    closeDuration,
    handleMenuToggle,
}: NavigationLinkProps) {
    const { href, index, label, show } = link;

    const currentUrl = usePage().url.split('#')[0];
    const homePath = new URL(route('home')).pathname;

    const { _navigateToPage } = useLandingContext();
    const __ = useTrans();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor: string = 'top',
    ) {
        if (currentUrl !== homePath) {
            e.preventDefault();
            _navigateToPage(href, anchor);
        } else {
            handleMenuToggle(false);
        }
    }

    return (
        <Curtain
            showCurtain={!show}
            closeDuration={closeDuration}
            className="w-max"
        >
            <a
                aria-label={__(
                    'landing.seo.scroll_to_section',
                    'Scroll to :section section',
                    { section: label.toLowerCase() },
                )}
                href={currentUrl === homePath ? href : route('home')}
                tabIndex={show ? 0 : -1}
                className={cn(
                    // Default styles
                    'group relative flex overflow-hidden py-2.5 pr-8 transition-all duration-1000 sm:py-4 sm:pr-12',

                    // Focus & hover styles
                    'hover:!text-primary-foreground hover:md:gap-[80px] hover:md:pl-[30px]',
                    'focus-visible:!text-primary-foreground focus-visible:md:gap-[80px] focus-visible:md:pl-[30px] focus-visible:md:outline-none',

                    // Responsive styles
                    'gap-0 sm:gap-[50px] md:gap-[120px]',
                    'flex-col sm:flex-row',
                    'items-start sm:items-center',
                )}
                onClick={(e) =>
                    handleProjectClick(
                        e,
                        currentUrl === homePath ? href : route('home'),
                        href.replace('#', ''),
                    )
                }
            >
                {/* Index with arrow */}
                <div
                    className={cn(
                        // Default styles
                        'relative flex items-center gap-0 overflow-hidden transition-all duration-1000',
                    )}
                >
                    {/* Arrow */}
                    <div
                        className={cn(
                            // Default styles
                            'absolute translate-x-[-100%] transition-all duration-1000',

                            // Focus & hover styles
                            'group-hover:translate-x-0 group-focus-visible:translate-x-0',

                            // Responsive styles
                            'hidden md:block',
                        )}
                    >
                        <ArrowRight
                            className={cn(
                                'h-12 w-12 stroke-1 transition-all duration-500 group-focus-visible:w-12',
                            )}
                        />
                    </div>
                    {/* Index */}
                    <span
                        className={cn(
                            // Default styles
                            'col-span-1 w-auto font-semibold transition-all duration-1000 sm:w-[150px]',

                            // Focus & hover styles
                            'group-hover:md:pl-18 group-focus-visible:md:pl-18',

                            // Reponsive styles
                            'text-xl sm:text-6xl',
                        )}
                    >
                        {index}
                    </span>
                </div>

                {/* Label */}
                <span
                    className={cn(
                        // Default styles
                        'col-span-1 font-normal uppercase',

                        // Reponsive styles
                        'text-2xl sm:text-6xl',

                        'transition-all duration-1000',
                    )}
                >
                    {label}
                </span>

                {/* Background animation */}
                <div
                    className={cn(
                        'absolute inset-0 z-[-1] h-full w-0 bg-primary transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000',
                    )}
                ></div>
            </a>
        </Curtain>
    );
}
