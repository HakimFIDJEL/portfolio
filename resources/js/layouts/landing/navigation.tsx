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
                    'group flex translate-y-[-50%] items-center gap-[120px] overflow-hidden py-4 pr-12 transition-all duration-1000',
                    'hover:gap-[80px] hover:pl-[30px]',
                    show && 'w-max translate-y-0',
                    'focus-visible:gap-[80px] focus-visible:pl-[30px] focus-visible:outline-none',
                )}
            >
                <div className="relative flex items-center gap-0 overflow-hidden transition-all duration-1000">
                    <div className="absolute translate-x-[-100%] transition-all duration-1000 group-hover:translate-x-0 group-focus-visible:translate-x-0">
                        <ArrowRight className="h-12 w-12 stroke-1 transition-all duration-500 group-focus-visible:w-12" />
                    </div>
                    <span className="col-span-1 w-[150px] text-6xl font-semibold transition-all duration-1000 group-hover:pl-18 group-focus-visible:pl-18">
                        {index}
                    </span>
                </div>
                <span className="col-span-1 text-6xl font-normal uppercase">
                    {label}
                </span>
                <div className="absolute inset-0 z-[-1] h-full w-0 bg-red-400 transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000"></div>
            </a>
        </Curtain>
    );
}
