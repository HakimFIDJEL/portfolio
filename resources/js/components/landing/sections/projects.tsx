// resources/js/components/landing/sections/projects.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import UnderlineLink from '@/components/landing/underline-link';

// Icons
import { ArrowDownRight, ArrowRight } from 'lucide-react';

// Types
import { Project } from '@/types';

// Translation
import { useTrans } from '@/lib/translation';

interface ProjectsProps {
    appear: boolean;
    projects: Project[];
}

export default function Projects({ appear, projects }: ProjectsProps) {
    const { _navigateToPage } = useLandingContext();
    const __ = useTrans();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
    ) {
        e.preventDefault();
        _navigateToPage(href, 'top');
    }

    return (
        <section
            className={cn(
                // Default styles
                'flex flex-col',

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
                        <Curtain
                            showCurtain={!appear}
                            background="background"
                            delay={250}
                            className="w-full"
                        >
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
                        </Curtain>
                        <Curtain
                            showCurtain={!appear}
                            background="background"
                            delay={250}
                        >
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
                        </Curtain>
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
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                        className="w-full"
                    >
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
                    </Curtain>
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
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
                    </Curtain>
                </div>
            </div>

            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',

                    'border-b border-dashed',
                )}
            >
                {/* Content */}
                <Delimiter
                    // dashedBorders={['all']}
                    plusCorners={['all']}
                    className={cn(
                        // Default styles
                        'relative flex flex-col transition-all duration-1000',
                    )}
                >
                    {projects
                        .sort((a, b) => a.sort_order - b.sort_order)
                        .map((project, index) => (
                            <FadeIn
                                show={appear}
                                key={index}
                                className="w-full"
                                delay={250}
                            >
                                <a
                                    {...(appear
                                        ? {
                                              href: route('project', {
                                                  slug: project.slug,
                                              }),
                                          }
                                        : {})}
                                    onClick={(e) =>
                                        handleProjectClick(
                                            e,
                                            route('project', {
                                                slug: project.slug,
                                            }),
                                        )
                                    }
                                    tabIndex={appear ? 0 : -1}
                                    className={cn(
                                        // Default styles
                                        'group relative flex overflow-hidden transition-all duration-1000',
                                        'items-center justify-center',

                                        // Focus & hover styles
                                        'hover:!text-primary-foreground',
                                        'focus-visible:!text-primary-foreground focus-visible:md:outline-none',

                                        // Responsive styles
                                        'text-xl sm:text-5xl',
                                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                                        'py-8 sm:py-10 md:py-12 lg:py-14',

                                        'bg-card',

                                        index !== projects.length - 1 &&
                                            'border-b',
                                    )}
                                >
                                    {/* Label */}
                                    <h3
                                        className={cn(
                                            // Default styles
                                            'relative text-center font-medium transition-all duration-1000',

                                            // Focus & hover styles
                                            'z-1 pl-0',
                                            'group-hover:pl-4 sm:group-hover:pl-6',
                                            'group-focus-visible:pl-4 sm:group-focus-visible:pl-6',
                                        )}
                                    >
                                        <ArrowRight
                                            className={cn(
                                                // Default styles
                                                'absolute top-1/2 -left-10 -translate-y-1/2',
                                                'stroke-1 transition-all',

                                                // Responsive styles
                                                'h-8 w-8 sm:h-12 sm:w-12',

                                                // Focus & hover styles
                                                'translate-x-[-100%] opacity-0 transition-all duration-500',
                                                'group-hover:translate-x-0 group-hover:opacity-100 group-hover:duration-1000',
                                                'group-focus-visible:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:duration-1000',
                                            )}
                                        />

                                        {project.title}
                                    </h3>

                                    {/* Background animation */}
                                    <div
                                        className={cn(
                                            'absolute inset-0 z-[0] h-full w-0 bg-primary transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000',
                                        )}
                                    ></div>
                                </a>
                            </FadeIn>
                        ))}
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
