// resources/js/layouts/landing/navigation.tsx

import { Curtain } from '@/components/landing/curtain';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

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
                'pointer-events-none fixed inset-0 z-2000 translate-y-[-100%] bg-card opacity-0',
                'flex items-end justify-start',
                showNavigation &&
                    'pointer-events-auto translate-y-0 opacity-100',
            )}
        >
            <NavigationHeader
                showNavigationContent={showNavigationContent}
                handleMenuToggle={handleMenuToggle}
            />
            <NavigationContent showNavigationContent={showNavigationContent} />
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
            className="fixed top-0 right-0 left-0 z-10 mx-auto w-[90%] max-w-7xl"
        >
            <div
                className={cn(
                    'transition-all delay-0 duration-500',
                    'translate-y-[-50%]',
                    'grid grid-cols-2',
                    'px-8 py-6 lg:px-12.5 lg:py-10',
                    showNavigationContent && 'translate-y-0 duration-1000',
                )}
            >
                <div className="col-span-1 text-left">
                    <NavigationButton
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
            <span className="block h-[2px] w-[25px] -translate-y-[3px] rotate-45 bg-foreground transition-all duration-300" />
            <span className="block h-[2px] w-[25px] -translate-y-[5px] -rotate-45 bg-foreground transition-all duration-300" />
        </button>
    );
}

interface NavigationContentProps {
    showNavigationContent: boolean;
}
type Link = { index: string; href: string; label: string; show: boolean };

function NavigationContent({ showNavigationContent }: NavigationContentProps) {
    const links: Link[] = useMemo(
        () => [
            { index: '01', href: '#', label: 'Home', show: false },
            { index: '02', href: '#', label: 'About', show: false },
            { index: '03', href: '#', label: 'Projects', show: false },
            { index: '04', href: '#', label: 'Sandbox', show: false },
            { index: '05', href: '#', label: 'Contact', show: false },
        ],
        [],
    );

    const DELAY_INCREMENT = 125;
    const [visibleLinks, setVisibleLinks] = useState<Link[]>([]);

    useEffect(() => {
        const initialLinks = links.map(l => ({ ...l, show: false }));
        setVisibleLinks(initialLinks);
    }, [links]);

    useEffect(() => {
        function handleLinksVisibility(show: boolean) {
            links.forEach((link, index) => {
                setTimeout(() => {
                    setVisibleLinks((prev) =>
                        prev.map((l) =>
                            l.label === link.label ? { ...l, show } : l,
                        ),
                    );
                }, index * DELAY_INCREMENT);
            });
        }
        
        if (showNavigationContent) {
            handleLinksVisibility(true);
        } else {
            handleLinksVisibility(false);
        }
    }, [showNavigationContent, links]);

    return (
        <div className="mx-auto flex w-[90%] max-w-7xl flex-col px-8 py-6 lg:px-12.5 lg:py-10">
            {visibleLinks.map((link, index) => (
                <NavigationLink link={link} key={index} />
            ))}
        </div>
    );
}

interface NavigationLinkProps {
    link: Link;
}
function NavigationLink({ link }: NavigationLinkProps) {
    const { href, index, label, show } = link;

    return (
        <Curtain showCurtain={!show}>
            <a
                href={href}
                className={cn(
                    // Default styles
                    'group flex translate-y-[-50%] overflow-hidden py-4 pr-12 transition-all duration-1000',
                    
                    // Conditional styles based on show state
                    show && 'w-max translate-y-0',
                    
                    // Focus & hover styles
                    'hover:md:gap-[80px] hover:md:pl-[30px]',
                    'focus-visible:md:gap-[80px] focus-visible:md:pl-[30px] focus-visible:md:outline-none',

                    // Responsive styles
                    // 'bg-red-400 sm:bg-green-400 md:bg-card',
                    'gap-[10px] sm:gap-[50px] md:gap-[120px]',
                    "flex-col sm:flex-row",
                    "items-start sm:items-center",
                )}
            >

                {/* Index with arrow */}
                <div className={cn(
                    // Default styles
                    "relative flex items-center gap-0 overflow-hidden transition-all duration-1000",
                )}>
                    {/* Arrow */}
                    <div className={cn(
                        // Default styles
                        "absolute translate-x-[-100%] transition-all duration-1000",

                        // Focus & hover styles
                        "group-hover:translate-x-0 group-focus-visible:translate-x-0",

                        // Responsive styles
                        "hidden md:block",
                    )}>
                        <ArrowRight className={cn("h-12 w-12 stroke-1 transition-all duration-500 group-focus-visible:w-12")} />
                    </div>
                    {/* Index */}
                    <span className={cn(
                        // Default styles
                        "col-span-1 w-[150px] font-semibold transition-all duration-1000",

                        // Focus & hover styles
                        "group-hover:md:pl-18 group-focus-visible:md:pl-18",

                        // Reponsive styles
                        "text-3xl sm:text-6xl",
                        )}>
                        {index}
                    </span>
                </div>

                {/* Label */}
                <span className={cn(
                    // Default styles
                    "col-span-1 font-normal uppercase",

                    // Reponsive styles
                    "text-4xl sm:text-6xl",
                    )}>
                    {label}
                </span>

                {/* Background animation */}
                <div className={cn("absolute inset-0 z-[-1] h-full w-0 bg-red-400 transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000")}></div>
            </a>
        </Curtain>
    );
}
