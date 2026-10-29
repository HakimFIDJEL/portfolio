// resources/js/components/landing/sections/projects.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Components
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import UnderlineLink from '@/components/landing/underline-link';

// Icons
import { ArrowDownRight } from 'lucide-react';

// Types
import { Project } from '@/types';

// Translation
import FlowingMenu from '@/components/FlowingMenu';
import { useTrans } from '@/lib/translation';

interface ProjectsProps {
    appear: boolean;
    projects: Project[];
}

export default function Projects({ appear, projects }: ProjectsProps) {
    const { _navigateToPage } = useLandingContext();
    const __ = useTrans();

    const containerRef = React.useRef<HTMLDivElement>(null);
    const [canScrollTop, setCanScrollTop] = React.useState(false);
    const [canScrollBottom, setCanScrollBottom] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            const el = containerRef.current;
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Top blur: actif dès que le haut de la liste dépasse le haut de l'écran,
            // tant que la liste est visible.
            const isScrolledPastTop = rect.top < 0;
            const isStillInViewFromTop = rect.bottom > 80;
            setCanScrollTop(isScrolledPastTop && isStillInViewFromTop);

            // Bottom blur: actif lorsque le conteneur entre dans le viewport par le bas,
            // et qu'il reste des projets sous le pli.
            const isContainerVisible = rect.top < windowHeight - 60;
            const hasMoreProjectsBelow = rect.bottom > windowHeight + 10;
            setCanScrollBottom(isContainerVisible && hasMoreProjectsBelow);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) {
        e.preventDefault();
        _navigateToPage(href, 'top');
    }

    const items = projects.map((project) => {
        return {
            link: appear
                ? route('project', {
                      slug: project.slug,
                  })
                : '#',
            text: project.title,
            linkOnClick: (e: React.MouseEvent<HTMLAnchorElement>) =>
                handleProjectClick(e, project.slug),
        };
    });

    return (
        <section
            className={cn(
                // Default styles
                'flex scroll-mt-24 flex-col',

                // Before pseudo-element styles
                'mb-0 lg:mb-48',
            )}
            id="projects"
        >
            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',
                    'border-t border-b border-dashed',
                    // 'sm:border-0',
                )}
            >
                {/* Title */}
                <Delimiter
                    plusCorners={['all']}
                    dashedBorders={['left', 'right']}
                >
                    <FadeIn show={appear}>
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',
                                'text-4xl sm:text-7xl',

                                // Responsive styles
                                'px-6 sm:px-8 md:px-10 lg:px-12.5',
                                'pt-8 sm:py-6 md:py-8 lg:py-10',
                            )}
                        >
                            {__('landing.landing.projects.h2', 'My Projects')}
                        </h2>
                    </FadeIn>

                    {/* Subtitle */}
                    <div
                        className={cn(
                            // Default styles
                            'flex justify-between',

                            // Responsive styles
                            'px-6 sm:px-8 md:px-10 lg:px-12.5',
                            'pb-8 sm:pb-0',
                            'pt-6 sm:pt-0',

                            'flex-col sm:flex-row',
                            'items-start sm:items-center',
                            'gap-6 sm:gap-0',

                            'flex sm:hidden',
                        )}
                    >
                        <FadeIn show={appear} delay={250} className="w-full">
                            <p>
                                {__(
                                    'landing.landing.projects.p_1',
                                    'Take a look at my projects.',
                                )}
                                <br />
                                {__(
                                    'landing.landing.projects.p_2',
                                    "I've currently worked on",
                                )}{' '}
                                <strong className="font-semibold">
                                    {projects.length}
                                </strong>{' '}
                                {__(
                                    'landing.landing.projects.p_3',
                                    'impactful ones.',
                                )}
                            </p>
                        </FadeIn>
                        <FadeIn className="w-auto" show={appear} delay={250}>
                            <UnderlineLink
                                aria_label={__(
                                    'landing.seo.scroll_to_section',
                                    'Scroll to :section section',
                                    { section: 'sandbox' },
                                )}
                                href="#sandbox"
                                showUnderline
                                className={cn(
                                    // Default styles
                                    'group flex w-max items-center gap-2',

                                    // Responsive styles
                                    'font-normal',
                                    'sm:translate-x-[8px]',
                                )}
                            >
                                {__('landing.landing.projects.skip', 'Skip')}
                                <ArrowDownRight
                                    size={32}
                                    className="stroke-1 transition-all group-hover:rotate-45 group-focus-visible:rotate-45"
                                />
                            </UnderlineLink>
                        </FadeIn>
                    </div>
                </Delimiter>
            </div>

            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',

                    'border-b border-dashed',
                    'mt-0 sm:mt-10 md:mt-12 lg:mt-14',

                    'hidden sm:block',
                )}
            >
                {/* Subtitle */}
                <div
                    className={cn(
                        // Default styles
                        'flex justify-between',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-6 sm:py-6 md:py-8 lg:py-10',

                        'flex-col sm:flex-row',
                        'items-start sm:items-center',
                        'gap-6 sm:gap-0',

                        'border-r border-l border-dashed sm:border-0',
                    )}
                >
                    <FadeIn show={appear} delay={250} className="w-full">
                        <p>
                            {__(
                                'landing.landing.projects.p_1',
                                'Take a look at my projects.',
                            )}
                            <br />
                            {__(
                                'landing.landing.projects.p_2',
                                "I've currently worked on",
                            )}{' '}
                            <strong className="font-semibold">
                                {projects.length}
                            </strong>{' '}
                            {__(
                                'landing.landing.projects.p_3',
                                'impactful ones.',
                            )}
                        </p>
                    </FadeIn>
                    <FadeIn className="w-auto" show={appear} delay={250}>
                        <UnderlineLink
                            aria_label={__(
                                'landing.seo.scroll_to_section',
                                'Scroll to :section section',
                                { section: 'sandbox' },
                            )}
                            href="#sandbox"
                            showUnderline
                            className={cn(
                                // Default styles
                                'group flex w-max items-center gap-2',

                                // Responsive styles
                                'font-normal',
                                'sm:translate-x-[8px]',
                            )}
                        >
                            {__('landing.landing.projects.skip', 'Skip')}
                            <ArrowDownRight
                                size={32}
                                className="stroke-1 transition-all group-hover:rotate-45 group-focus-visible:rotate-45"
                            />
                        </UnderlineLink>
                    </FadeIn>
                </div>
            </div>

            <div
                ref={containerRef}
                id="projects-list"
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',

                    'border-b border-dashed border-border',
                )}
            >
                {/* Content */}
                <Delimiter
                    dashedBorders={['right', 'left']}
                    plusCorners={['all']}
                    className={cn(
                        // Default styles
                        'relative flex flex-col transition-all duration-1000',
                    )}
                >
                    {/* Sticky Top Progressive Blur */}
                    <div
                        className={cn(
                            'pointer-events-none sticky top-0 z-20 -mb-24 h-24 w-full sm:-mb-32 sm:h-32 lg:-mb-36 lg:h-36',
                            'bg-gradient-to-b from-card via-card/75 to-transparent backdrop-blur-md',
                            '[mask-image:linear-gradient(to_bottom,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_bottom,black_30%,transparent)]',
                            'transition-opacity duration-500 ease-out',
                            canScrollTop ? 'opacity-100' : 'opacity-0',
                        )}
                    />

                    <FlowingMenu
                        items={items}
                        speed={5}
                        bgColor="var(--card)"
                        borderColor="var(--border)"
                        textColor="var(--foreground)"
                        marqueeBgColor="var(--primary)"
                        marqueeTextColor="var(--primary-foreground)"
                        itemClassName={cn(
                            'py-8 sm:py-10 md:py-12 lg:py-14',
                            'text-xl sm:text-5xl',
                            'font-light',
                        )}
                    />

                    {/* Sticky Bottom Progressive Blur */}
                    <div
                        className={cn(
                            'pointer-events-none sticky bottom-0 z-20 -mt-24 h-24 w-full sm:-mt-32 sm:h-32 lg:-mt-36 lg:h-36',
                            'bg-gradient-to-t from-card via-card/75 to-transparent backdrop-blur-md',
                            '[mask-image:linear-gradient(to_top,black_30%,transparent)] [-webkit-mask-image:linear-gradient(to_top,black_30%,transparent)]',
                            'transition-opacity duration-500 ease-out',
                            canScrollBottom ? 'opacity-100' : 'opacity-0',
                        )}
                    />
                </Delimiter>
            </div>

            {/* Borders */}
            <div
                className={cn(
                    // Before pseudo-element styles
                    'relative',

                    'px-6',
                )}
            >
                <div
                    className={cn(
                        // Before pseudo-element styles
                        'relative',

                        'h-36 sm:h-0',
                        'border-r border-l border-dashed',
                    )}
                ></div>
            </div>
        </section>
    );
}
