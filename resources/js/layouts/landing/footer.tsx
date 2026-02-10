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
import LanguageToggle from '@/components/landing/language-toggle';
import CursorToggle from '@/components/landing/cursor-toggle';

// UI Components
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUp, Monitor, Moon, Sun } from 'lucide-react';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Hooks
import { useIsMobile } from '@/hooks/use-mobile';

// Translation
import { useTrans } from '@/lib/translation';

interface FooterProps {
    appear: boolean;
}


export default function Footer({ appear }: FooterProps) {
    const { appearance, updateAppearance } = useAppearance();
    const isMobile = useIsMobile();

    const __ = useTrans();
    
    const links = [
        {
            name: __('landing.layout.footer.links.sitemap.title', 'Sitemap'),
            items: [
                {
                    label: __('landing.layout.footer.links.sitemap.items.home', 'Home'),
                    href: '#top',
                },
                {
                    label: __('landing.layout.footer.links.sitemap.items.about', 'About'),
                    href: '#about',
                },
                {
                    label: __('landing.layout.footer.links.sitemap.items.projects', 'Projects'),
                    href: '#projects',
                },
                {
                    label: __('landing.layout.footer.links.sitemap.items.sandbox', 'Sandbox'),
                    href: '#sandbox',
                },
                {
                    label: __('landing.layout.footer.links.sitemap.items.contact', 'Contact'),
                    href: '#contact',
                },
            ],
        },
        {
            name: __('landing.layout.footer.links.contact.title', 'Contact'),
            items: [
                {
                    label: __('landing.layout.footer.links.contact.items.email', 'Email'),
                    href: 'mailto:hakimfidjel.pro@gmail.com',
                },
                {
                    label: __('landing.layout.footer.links.contact.items.linkedin', 'LinkedIn'),
                    href: 'https://www.linkedin.com/in/hakim-fidjel/',
                    target:'_blank',
                },
                {
                    label: __('landing.layout.footer.links.contact.items.github', 'GitHub'),
                    href: 'https://github.com/hakimfidjel',
                    target:'_blank',
                },
                {
                    label: __('landing.layout.footer.links.contact.items.gitlab', 'GitLab'),
                    href: 'https://gitlab.com/hakimfidjel',
                    target:'_blank',
                },
            ],
        },
        {
            name: __('landing.layout.footer.links.resources.title', 'Resources'),
            items: [
                {
                    label: __('landing.layout.footer.links.resources.items.terms', 'Terms'),
                    href: route('terms'),
                },
                {
                    label: __('landing.layout.footer.links.resources.items.source_code', 'Source Code'),
                    href: 'https://github.com/HakimFIDJEL/portfolio',
                    target:'_blank',
                },
            ],
        },
    ];

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

    function handleLinkClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor: string = 'top',
    ) {
        e.preventDefault();
        _navigateToPage(href, anchor);
    }

    const currentUrl = usePage().url.split('#')[0];
    const homePath = new URL(route('home')).pathname;
    const termsPath = new URL(route('terms')).pathname;

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
                            {/* <FadeIn show={appear} delay={125}>
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton aria_label={__('landing.seo.scroll_to_top', 'Scroll to top')}>
                                        <a href="#top" tabIndex={-1} aria-label={__('landing.seo.scroll_to_top', 'Scroll to top')}>
                                            <ArrowUp className="stroke-1" />
                                        </a>
                                    </RoundedButton>
                                </Magnet>
                            </FadeIn> */}
                            <FadeIn show={appear} delay={125}>
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton
                                        onClick={handleSwitchAppearance}
                                        aria_label={__('landing.seo.toggle_appearance', 'Toggle appearance mode')}
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
                            <FadeIn show={appear} delay={250}>
                                <LanguageToggle />
                            </FadeIn>
                            {!isMobile && (
                                <FadeIn
                                    show={appear}
                                    delay={375}
                                >
                                    <CursorToggle />
                                </FadeIn>
                            )}
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
                                    let href = item.href;

                                    const onHomePage = currentUrl == homePath;
                                    const onTermsPage = currentUrl == termsPath;

                                    const isExternal = item.target === '_blank' || item.href.startsWith('mailto:');

                                    // Anchor
                                    if(item.href.startsWith('#')) {
                                        if(onHomePage) {
                                            href = item.href;
                                        } else {
                                            href = route('home');
                                            onClick = (e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, route('home'), item.href.substring(1));
                                        }
                                    } else if (item.href === route('terms')) {
                                        if(onTermsPage) {
                                            href = '#top';
                                        } else {
                                            href = route('terms');
                                            onClick = (e: React.MouseEvent<HTMLAnchorElement>) => handleLinkClick(e, route('terms'), 'top');
                                        }
                                    } else if (isExternal) {
                                        href = item.href;
                                    }
                                    

                                    return (
                                        <li
                                            key={`footer-link-item-${index}-${itemIndex}`}
                                        >
                                            <UnderlineLink
                                                aria_label={__('landing.seo.go_to_link', 'Go to :link link', { link: item.label })}
                                                className={cn(
                                                    // Default styles
                                                    'font-light transition-all',

                                                    'text-muted-foreground hover:text-foreground focus-visible:text-foreground',
                                                )}

                                                {...onClick && { onClick: onClick }}
                                                href={href}
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
                        {__('landing.layout.footer.caption', 'Designed, Developped, Deployed and Hosted by')}
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
                        © {new Date().getFullYear()} Hakim Fidjel. {__('landing.layout.footer.copyright', 'All rights reserved.')}
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
