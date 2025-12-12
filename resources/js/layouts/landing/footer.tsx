// resources/js/layouts/landing/footer.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

// Hooks
import { useAppearance } from '@/hooks/use-appearance';

// Components
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import RoundedButton from '@/components/landing/rounded-button';
import UnderlineLink from '@/components/landing/underline-link';

// UI Components
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUp, Monitor, Moon, Sun } from 'lucide-react';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

interface FooterProps {
    appear: boolean;
}

const links = [
    {
        name: 'Sitemap',
        items: [
            {
                label: 'Hero',
                href: '#hero',
            },
            {
                label: 'About',
                href: '#about',
            },
            {
                label: 'Projects',
                href: '#projects',
            },
            {
                label: 'Sandbox',
                href: '#sandbox',
            },
            {
                label: 'Contact',
                href: '#contact',
            },
        ],
    },
    {
        name: 'Contact',
        items: [
            {
                label: 'Email',
                href: 'mailto:hakimfidjel.pro@gmail.com',
            },
            {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/hakim-fidjel/',
                target:'_blank',
            },
            {
                label: 'GitHub',
                href: 'https://github.com/hakimfidjel',
                target:'_blank',
            },
            {
                label: 'GitLab',
                href: 'https://gitlab.com/hakimfidjel',
                target:'_blank',
            },
        ],
    },
    {
        name: 'Resources',
        items: [
            {
                label: 'Terms',
                href: route('home'),
            },
            {
                label: 'Source Code',
                href: 'https://github.com/HakimFIDJEL/portfolio',
                target:'_blank',
            },
        ],
    },
];

export default function Footer({ appear }: FooterProps) {
    const { appearance, updateAppearance } = useAppearance();

    function handleSwitchAppearance() {
        const newAppearance =
            appearance === 'light'
                ? 'dark'
                : appearance === 'dark'
                  ? 'system'
                  : 'light';

        updateAppearance(newAppearance);
    }

    const { _navigateToPage } = useLandingContext();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor: string = 'top',
    ) {
        e.preventDefault();
        _navigateToPage(href, anchor);
    }

    const currentUrl = usePage().url.split('#')[0];
    const homePath = new URL(route('home')).pathname;

    return (
        <>
            <footer
                className={cn(
                    // Default styles
                    'border-t border-b border-dashed',

                    'flex items-stretch justify-between',

                    'flex-col lg:flex-row',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',

                    // Animation styles
                    'translate-y-[20%] opacity-0 transition-all duration-1000',
                    appear && 'translate-y-0 opacity-100',
                )}
            >
                {/* Left Panel */}
                <Delimiter
                    dashedBorders={['left', 'right']}
                    plusCorners={['all']}
                >
                    <div
                        className={cn(
                            // Default styles
                            'grid gap-4',

                            // Responsive styles
                            'px-6 sm:px-8 md:px-10 lg:px-12.5',
                            'py-4 sm:py-6 md:py-8 lg:py-10',
                            'grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-4',
                        )}
                    >
                        {/* Buttons */}
                        <div
                            className={cn(
                                // Default styles
                                'col-span-1 flex flex-col gap-4',
                            )}
                        >
                            <FadeIn show={appear} delay={250}>
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton>
                                        <a href="#top" tabIndex={-1}>
                                            <ArrowUp className="stroke-1" />
                                        </a>
                                    </RoundedButton>
                                </Magnet>
                            </FadeIn>
                            <FadeIn show={appear} delay={500}>
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton
                                        onClick={handleSwitchAppearance}
                                    >
                                        {appearance === 'dark' && (
                                            <Moon className="stroke-1" />
                                        )}
                                        {appearance === 'light' && (
                                            <Sun className="stroke-1" />
                                        )}
                                        {appearance === 'system' && (
                                            <Monitor className="stroke-1" />
                                        )}
                                    </RoundedButton>
                                </Magnet>
                            </FadeIn>
                            <FadeIn show={appear} delay={750}>
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton>EN</RoundedButton>
                                </Magnet>
                            </FadeIn>
                        </div>

                        {links.map((linkGroup, index) => (
                            <ul
                                key={`footer-link-group-${index}`}
                                className={cn(
                                    // Default styles
                                    'col-span-1 flex flex-col gap-2',
                                )}
                            >
                                <li
                                    className={cn(
                                        // Default styles
                                        'mb-2 font-medium',
                                    )}
                                >
                                    {linkGroup.name}
                                </li>
                                {linkGroup.items.map((item, itemIndex) => {
                                    let onClick = null;

                                    if(currentUrl !== homePath) {
                                        if(item.href.startsWith('#')) {
                                            onClick = (e: React.MouseEvent<HTMLAnchorElement>) => handleProjectClick(e, route('home'), item.href.substring(1));
                                        }
                                    }

                                    return (
                                        <li
                                            key={`footer-link-item-${index}-${itemIndex}`}
                                        >
                                            <UnderlineLink
                                                className={cn(
                                                    // Default styles
                                                    'font-light transition-all',

                                                    'text-muted-foreground hover:text-foreground focus-visible:text-foreground',
                                                )}

                                                {...onClick && { onClick: onClick }}
                                                href={currentUrl === homePath ? item.href : route('home')}
                                                {...item.target && { target: item.target }}
                                            >
                                                {item.label}
                                            </UnderlineLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        ))}
                    </div>
                </Delimiter>

                {/* Right Panel */}
                <div
                    className={cn(
                        // Default styles
                        'flex w-full flex-col items-start justify-end gap-2 align-bottom',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',

                        'border-t border-r border-l border-dashed lg:border-0',
                    )}
                >
                    <p
                        className={cn(
                            // Default styles
                            'font-medium',

                            // Repsonsive styles
                            'text-xs sm:text-sm md:text-base lg:text-sm xl:text-base',
                            'translate-x-[0px] sm:translate-x-[2px] md:translate-x-[5px] lg:translate-x-[4px]',
                        )}
                    >
                        Designed, Developped, Deployed and Hosted by
                    </p>
                    <p
                        className={cn(
                            // Default styles
                            'font-semibold',

                            // Responsive styles
                            'text-3xl sm:text-4xl md:text-7xl lg:text-5xl xl:text-7xl',
                        )}
                    >
                        Hakim Fidjel.
                    </p>
                    <p
                        className={cn(
                            // Default styles
                            'text-muted-foreground',

                            // Responsive styles
                            'text-xs',
                            'translate-x-[0px] sm:translate-x-[2px] md:translate-x-[5px] lg:translate-x-[4px]',
                        )}
                    >
                        © {new Date().getFullYear()} Hakim Fidjel. All rights
                        reserved.
                    </p>
                </div>
            </footer>
            {/* Borders */}
            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                )}
            >
                <div
                    className={cn(
                        // Default styles
                        'h-8 w-full border-r border-l border-dashed',
                    )}
                ></div>
            </div>
        </>
    );
}
