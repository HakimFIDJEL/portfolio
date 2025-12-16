// resources/js/components/landing/sections/Hero.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Hooks
import { useAppearance } from '@/hooks/use-appearance';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';
import FadeIn from '@/components/landing/fade-in';
import LanguageToggle from '@/components/landing/language-toggle';

// UI Components
import Magnet from '@/components/ui/magnet';

// Icons
import {
    ArrowDown,
    Code2,
    Monitor,
    Moon,
    SquareArrowOutUpRight,
    Sun,
} from 'lucide-react';

// Types
import { Project } from '@/types';

// Translation
import { useTrans } from '@/lib/translation';

interface HeroProps {
    appear: boolean;
    project: Project;
}

export default function Hero({ appear, project }: HeroProps) {
    const { appearance, updateAppearance } = useAppearance();
    const __ = useTrans();

    function handleSwitchAppearance() {
        const newAppearance =
            appearance === 'light'
                ? 'dark'
                : appearance === 'dark'
                  ? 'system'
                  : 'light';

        updateAppearance(newAppearance);
    }

    return (
        <section
            className="flex h-[calc(100vh-73px)] flex-col justify-between lg:h-[calc(100vh-105px)]"
            id="hero"
        >
            <Delimiter
                dashedBorders={['top', 'bottom']}
                plusCorners={['top-left', 'top-right']}
                className="h-12"
            />

            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'items-start md:items-end',
                )}
            >
                {/* Title */}
                <Delimiter
                    dashedBorders={['top', 'bottom']}
                    plusCorners={['all']}
                    className={cn(
                        // Default styles
                        'flex w-full justify-between',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',
                        'flex-col lg:flex-row',
                        'items-start md:items-start',
                        'gap-4',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={0}
                        className="w-full"
                    >
                        <h1
                            className={cn(
                                // Default styles
                                '!leading-none font-semibold',
                                'text-[2.65rem] md:text-6xl lg:text-7xl xl:text-8xl',
                            )}
                        >
                            {project.title}
                        </h1>
                    </Curtain>

                    <div
                        className={cn(
                            // Default styles
                            'flex',

                            // Responsive styles
                            'lg:translate-y-[15px]',
                            'flex-col md:flex-row lg:flex-col',
                            'items-start md:items-center lg:items-end',
                            'gap-4 md:gap-4 lg:gap-0',
                        )}
                    >
                        <Curtain
                            showCurtain={!appear}
                            background="background"
                            delay={0}
                        >
                            <h2
                                className={cn(
                                    // Default styles
                                    '!leading-none font-medium uppercase',

                                    // Responsive styles
                                    'text-xl md:text-2xl lg:text-3xl',
                                    'text-left md:text-right',
                                    'ml-0 lg:ml-2',
                                    'p-0 md:pb-1 lg:pb-2.5 xl:pb-3',
                                )}
                            >
                                {__('landing.projects.hero.h2', 'Project')}
                            </h2>
                        </Curtain>
                        <Curtain
                            showCurtain={!appear}
                            background="background"
                            delay={0}
                        >
                            <div
                                className={cn(
                                    // Default styles
                                    'flex items-center justify-end gap-2',

                                    // 'max-w-1/3',
                                    'flex-wrap',
                                )}
                            >
                                {project.is_new === true && (
                                    <span
                                        className={cn(
                                        // Default styles
                                            'border px-2.5 py-0.5 text-sm font-medium',
                                            'transition-all duration-1000',

                                            // Hover & Focus styles
                                            'border-primary',
                                            'bg-primary',
                                            'text-primary-foreground',
                                            'whitespace-nowrap',
                                        )}
                                    >
                                        {__('landing.projects.sections.new', 'New')}
                                    </span>
                                )}
                                {project.tags
                                    .sort((a, b) => a.sort_order - b.sort_order)
                                    .map((tag, index) => (
                                        <span
                                            key={`project-${project.id}-tag-${index}`}
                                            className={cn(
                                                // Default styles
                                                'border px-2.5 py-0.5 text-sm font-medium',
                                                'transition-all duration-1000',

                                                // Hover & Focus styles
                                                'border-foreground',
                                                'whitespace-nowrap',
                                            )}
                                        >
                                            {tag.name}
                                        </span>
                                    ))}
                                <span
                                    className={cn(
                                        // Default styles
                                        'border px-2.5 py-0.5 text-sm font-medium',
                                        'transition-all duration-1000',

                                        // Hover & Focus styles
                                        'border-foreground',
                                        'whitespace-nowrap',
                                    )}
                                >
                                    {project.end_date
                                        ? new Date(
                                              project.end_date,
                                          ).toLocaleDateString(undefined, {
                                              year: 'numeric',
                                              month: 'numeric',
                                              day: 'numeric',
                                          })
                                        : __(
                                              'landing.projects.sections.ongoing',
                                              'Ongoing',
                                          )}
                                </span>
                            </div>
                        </Curtain>
                    </div>
                </Delimiter>

                {/* Subtitle & Actions */}
                <div
                    className={cn(
                        // Default styles
                        'flex w-full',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-5 md:py-6 lg:py-8',

                        'flex-col md:flex-row',
                        'items-start md:items-center',
                        'justify-start md:justify-between',
                        'gap-4 md:gap-5',
                    )}
                >
                    <FadeIn className='w-auto' show={appear} delay={250}>
                        <p
                            className={cn(
                                // Default styles
                                'text-lg font-medium',
                            )}
                        >
                            {project.subtitle}
                        </p>
                    </FadeIn>
                    <div
                        className={cn(
                            // Default styles
                            'flex flex-wrap items-center gap-5',
                            
                            'shrink-1 md:shrink-0',
                        )}
                    >
                        <div
                            className={cn(
                                // Default styles
                                'flex flex-wrap items-center gap-5',

                            )}
                        >
                            <Curtain
                                showCurtain={!appear}
                                background="background"
                                delay={500}
                            >
                                <Magnet magnetStrength={3} padding={20}>
                                    <a
                                        {...(project?.source_code_url && {
                                            href: project.source_code_url,
                                        })}
                                        target="_blank"
                                        tabIndex={-1}
                                        aria-label={__('landing.seo.view_source_code', 'View source code for :project project', { project: project.title })}
                                    >
                                        <RoundedButton
                                            disabled={!project?.source_code_url}
                                            tabIndex={
                                                project?.source_code_url
                                                    ? 0
                                                    : -1
                                            }
                                            aria_label={__('landing.seo.view_source_code', 'View source code for :project project', { project: project.title })}
                                        >
                                            <Code2 className="stroke-1" />
                                        </RoundedButton>
                                    </a>
                                </Magnet>
                            </Curtain>
                            <Curtain
                                showCurtain={!appear}
                                background="background"
                                delay={750}
                            >
                                <Magnet magnetStrength={3} padding={20}>
                                    <a
                                        {...(project?.live_demo_url && {
                                            href: project.live_demo_url,
                                        })}
                                        target="_blank"
                                        tabIndex={-1}
                                        aria-label={__('landing.seo.view_live_demo', 'View live demo for :project project', { project: project.title })}
                                    >
                                        <RoundedButton
                                            disabled={!project?.live_demo_url}
                                            tabIndex={
                                                project?.live_demo_url ? 0 : -1
                                            }
                                            aria_label={__('landing.seo.view_live_demo', 'View live demo for :project project', { project: project.title })}
                                        >
                                            <SquareArrowOutUpRight className="stroke-1" />
                                        </RoundedButton>
                                    </a>
                                </Magnet>
                            </Curtain>
                        </div>
                        <div
                            className={cn(
                                // Default styles
                                'flex flex-wrap items-center gap-5',
                            )}
                        >
                            <Curtain
                                showCurtain={!appear}
                                background="background"
                                delay={1000}
                            >
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
                            </Curtain>
                            <Curtain
                                showCurtain={!appear}
                                background="background"
                                delay={1250}
                            >
                                <LanguageToggle />
                            </Curtain>
                            <Curtain
                                showCurtain={!appear}
                                background="background"
                                delay={1500}
                            >
                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton aria_label={__('landing.seo.scroll_to_content', 'Scroll to content')}>
                                        <a href="#content" tabIndex={-1} aria-label={__('landing.seo.scroll_to_content', 'Scroll to content')}>
                                            <ArrowDown className="stroke-1" />
                                        </a>
                                    </RoundedButton>
                                </Magnet>
                            </Curtain>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
