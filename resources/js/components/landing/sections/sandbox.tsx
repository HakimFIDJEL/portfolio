// resources/js/components/landing/sections/sandbox.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

// UI Components
import Magnet from '@/components/ui/magnet';
import { Separator } from '@/components/ui/separator';

// Components
import Carousel from '@/components/landing/carousel';
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import RoundedButton from '@/components/landing/rounded-button';
import UnderlineLink from '@/components/landing/underline-link';

// Types
import { Project } from '@/types';

// Icons
import {
    ArrowDownRight,
    ArrowUpRight,
    Code2,
    SquareArrowOutUpRight,
    X,
} from 'lucide-react';

// Translation
import { useTrans } from '@/lib/translation';

export default function Sandbox({
    appear,
    projects,
}: {
    appear: boolean;
    projects: Project[];
}) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);
    const __ = useTrans();

    const cols =
        window.innerWidth >= 1279 ? 3 : window.innerWidth >= 639 ? 2 : 1;

    const columns: Project[][] = Array.from({ length: cols }, () => []);

    projects
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach((item: Project, index) => {
            const columnIndex = index % cols;
            columns[columnIndex].push(item);
        });

    function handleClick(index: number | null) {
        if (activeIndex === index) {
            setActiveIndex(null);
            return;
        }

        setActiveIndex(index);
    }

    return (
        <section
            className={cn(
                // Default styles
                'flex items-stretch justify-between',
                'relative w-full border-t border-b border-dashed',

                // Responsive styles
                'px-6 sm:px-8 md:px-10 lg:px-12.5',
                'flex-col lg:flex-row',
                'mt-24 lg:mt-48',
            )}
            id="sandbox"
        >
            {/* Left Panel */}
            <Delimiter
                className={cn(
                    // Default styles

                    // Responsive styles
                    'w-full lg:w-[25%] lg:min-w-[285px]',

                    'px-6 lg:pr-12.5 lg:pl-0',
                    'py-4 sm:py-6 md:py-8 lg:py-10',

                    'border-r border-b border-l border-dashed',
                    'lg:border-0',
                )}
            >
                <div
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        'sticky top-[100px]',

                        'gap-4 sm:gap-8',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        className="w-full"
                        delay={0}
                    >
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            {__('landing.landing.sandbox.h2', 'The Sand Box')}
                        </h2>
                    </Curtain>

                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        className="w-full"
                        delay={250}
                    >
                        <p
                            className={cn(
                                // Default styles
                                'text-base sm:text-lg',
                            )}
                        >
                            {__('landing.landing.sandbox.p_1', 'My less impactful but still taughtful works, I’ve currently worked on')}{' '}
                            <strong className="font-semibold">{projects.length}{' '}</strong> {__('landing.landing.sandbox.p_2', 'small projects here.')}
                        </p>
                    </Curtain>

                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={500}
                    >
                        <UnderlineLink
                            href="#contact"
                            showUnderline
                            className={cn(
                                // Default styles
                                'group flex w-max items-center gap-2',

                                // Responsive styles
                                'font-normal',
                                'translate-x-[0px]',
                            )}
                        >
                            {__('landing.landing.sandbox.skip', 'Skip')}
                            <ArrowDownRight
                                size={32}
                                className="stroke-1 transition-all group-hover:rotate-45 group-focus-visible:rotate-45"
                            />
                        </UnderlineLink>
                    </Curtain>
                </div>
            </Delimiter>

            {/* Right Panel */}
            <Delimiter
                dashedBorders={['left', 'right']}
                plusCorners={['all']}
                className={cn(
                    // Default styles
                    'font-light',
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-6 lg:px-12.5',
                    'py-12 md:py-10',
                    'gap-4 md:gap-8',

                    'w-full',
                    'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                )}
            >
                {columns.map((columnItems, colIndex) => (
                    <div
                        key={`column-${colIndex}`}
                        className={cn('flex flex-col gap-4 md:gap-8', 'w-full')}
                    >
                        {columnItems.map((item: Project, itemIndex) => (
                            <FadeIn
                                show={appear}
                                key={item.id}
                                className="w-full"
                                // Ajuster le délai pour la séquence dans la colonne
                                delay={(colIndex + itemIndex * cols) * 100}
                            >
                                <Magnet magnetStrength={5} padding={10}>
                                    <SandboxItem
                                        project={item}
                                        active={
                                            activeIndex ===
                                            colIndex + itemIndex * cols
                                        }
                                        handleClick={() =>
                                            handleClick(
                                                colIndex + itemIndex * cols,
                                            )
                                        }
                                        dialog_open={activeIndex !== null}
                                    />
                                </Magnet>
                            </FadeIn>
                        ))}
                    </div>
                ))}
            </Delimiter>

            {/* Dialog */}
            <SandboxDialog
                item={projects[activeIndex ?? -1] || null}
                handleClose={() => handleClick(null)}
            />
        </section>
    );
}

interface SandboxItemProps {
    project: Project;
    active?: boolean;
    handleClick?: () => void;
    dialog_open?: boolean;
}

function SandboxItem({
    project,
    active,
    handleClick,
    dialog_open,
}: SandboxItemProps) {

    const __ = useTrans();

    return (
        <button
            className={cn(
                // Default styles
                'group relative h-max',
                'flex flex-col',
                'cursor-pointer transition-all duration-500',
                'border bg-card text-foreground',
                'text-start',

                // Responsive styles
                'px-6 sm:px-6 md:px-6 lg:px-6',
                'py-4 sm:py-4 md:py-4 lg:py-6',

                'gap-4',

                // Hover & Focus styles
                'duration-1000 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                'duration-1000 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none',
                active && 'border-primary bg-primary text-primary-foreground',
            )}
            tabIndex={dialog_open ? -1 : 0}
            onClick={handleClick}
        >
            {/* Button */}
            <ArrowUpRight
                className={cn(
                    // Default styles
                    'absolute top-4 right-4 h-8 w-8 stroke-1 transition-all',
                    'translate-x-0 translate-y-0 opacity-0',

                    // Hover & Focus styles
                    'group-hover:translate-x-[4px] group-hover:translate-y-[-4px] group-hover:opacity-100',
                    'group-focus-visible:translate-x-[4px] group-focus-visible:translate-y-[-4px] group-focus-visible:opacity-100',
                    active &&
                        'translate-x-[4px] translate-y-[-4px] opacity-100',
                )}
            />

            {/* Tags */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-wrap gap-2',
                )}
            >
                {project.is_new && (
                    <span
                        className={cn(
                            // Default styles
                            'border px-1.5 py-0.5 text-sm font-light',
                            'transition-all duration-1000',

                            // Hover & Focus styles
                            'border-foreground group-hover:border-primary-foreground group-focus-visible:border-primary-foreground',
                        )}
                    >
                        {__('landing.projects.sections.new', 'New')}
                    </span>
                )}
                {project.tags
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((tag, index) => (
                        <span
                            key={`sandbox-${project.id}-tag-${index}`}
                            className={cn(
                                // Default styles
                                'border px-1.5 py-0.5 text-sm font-light',
                                'transition-all duration-1000',

                                // Hover & Focus styles
                                'border-foreground group-hover:border-primary-foreground group-focus-visible:border-primary-foreground',
                            )}
                        >
                            {tag.name}
                        </span>
                    ))}
            </div>

            {/* Title */}
            <h4
                className={cn(
                    // Default styles
                    'font-medium',

                    'text-lg',
                )}
            >
                {project.title}
            </h4>

            {/* Description */}
            <p>
                {project.subtitle}
            </p>

            <Separator className="mt-2 bg-foreground transition-all duration-1000 group-hover:bg-primary-foreground group-focus-visible:bg-primary-foreground" />

            {/* Date */}
            {project.end_date ? (
                <time>
                    {new Date(project.end_date).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })}
                </time>
            ) : (
                <span
                    className={cn(
                        // Default styles
                        'border px-1.5 py-0.5 text-sm font-light w-max',
                        'transition-all duration-1000',

                        // Hover & Focus styles
                        'border-foreground group-hover:border-primary-foreground group-focus-visible:border-primary-foreground',
                    )}
                >
                    {__('landing.projects.sections.ongoing', 'Ongoing')}
                </span>
            )}
        </button>
    );
}

interface SandboxDialogProps {
    item: Project | null;
    handleClose: () => void;
}

function SandboxDialog({ item, handleClose }: SandboxDialogProps) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [isFullyClosed, setIsFullyClosed] = React.useState<boolean>(true);
    const __ = useTrans();

    React.useEffect(() => {
        if (item) {
            setOpen(true);
            setIsFullyClosed(false);
        } else {
            setOpen(false);
        }
    }, [item]);

    React.useEffect(() => {
        let timeoutId: NodeJS.Timeout;

        if (!open && !isFullyClosed) {
            timeoutId = setTimeout(() => {
                handleClose();
                setIsFullyClosed(true);
            }, 500);
        }

        return () => {
            clearTimeout(timeoutId);
        };
    }, [open, isFullyClosed, handleClose]);

    React.useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setOpen(false);
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div
            className={cn(
                // Default styles
                'fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-background/50 backdrop-blur-md',

                // Transition
                'transition-opacity duration-1000',

                // Visibility
                open
                    ? 'pointer-events-auto opacity-100'
                    : 'pointer-events-none opacity-0 delay-250',
            )}
            onClick={() => setOpen(false)}
        >
            <aside
                className={cn(
                    // Default styles
                    'fixed inset-0 z-50 mx-auto my-auto border-4 bg-card',
                    'cursor-auto overflow-auto',
                    'transition-all focus-visible:outline-4 focus-visible:outline-primary',

                    // Transition
                    'translate-y-0 opacity-100 transition-all delay-250 duration-1000',
                    !open &&
                        'translate-y-[50%] opacity-0 delay-0 duration-1000',

                    // Responsive styles
                    'sm:h-[80vh] sm:w-[90%] sm:max-w-5xl',
                    'h-full w-full',
                )}
                onClick={(e) => e.stopPropagation()}
                tabIndex={-1}
            >
                {/* Header */}
                <div
                    className={cn(
                        // Default styles
                        'sticky top-0 z-1',
                        'flex',
                        'border-b border-border bg-card',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-16',
                        'py-10 sm:py-6 md:py-6 lg:py-6',

                        'sm:flex-row sm:items-start sm:justify-between sm:gap-6',
                        'flex-col-reverse items-start justify-center gap-4',
                    )}
                >
                    {/* Text */}
                    <div
                        className={cn(
                            // Default styles
                            'flex flex-col gap-1',
                        )}
                    >
                        {/* Title */}
                        <h3
                            className={cn(
                                // Default styles
                                'text-xl font-medium',
                            )}
                        >
                            {item?.title}
                        </h3>

                        {/* Subtitle */}
                        <p>{item?.subtitle}</p>
                    </div>

                    {/* Buttons */}
                    <div
                        className={cn(
                            // Default styles
                            'flex items-center gap-4',
                        )}
                    >
                        {/* Code source */}
                        <RoundedButton
                            disabled={!item?.source_code_url}
                            className="p-2.5"
                            tabIndex={
                                open && item && item.source_code_url ? 0 : -1
                            }
                        >
                            <a
                                {...(item?.source_code_url && {
                                    href: item.source_code_url,
                                })}
                                target="_blank"
                                tabIndex={
                                    open && item && item.source_code_url
                                        ? 0
                                        : -1
                                }
                            >
                                <Code2 />
                            </a>
                        </RoundedButton>

                        {/* Live demo */}
                        <RoundedButton
                            disabled={!item?.live_demo_url}
                            className="p-2.5"
                            tabIndex={
                                open && item && item.live_demo_url ? 0 : -1
                            }
                        >
                            <a
                                {...(item?.live_demo_url && {
                                    href: item.live_demo_url,
                                })}
                                target="_blank"
                                tabIndex={
                                    open && item && item.live_demo_url ? 0 : -1
                                }
                            >
                                <SquareArrowOutUpRight />
                            </a>
                        </RoundedButton>

                        {/* Code source */}
                        <RoundedButton
                            onClick={() => setOpen(false)}
                            className="p-2.5"
                            tabIndex={open ? 0 : -1}
                        >
                            <X />
                        </RoundedButton>
                    </div>
                </div>

                {/* Content */}
                <div
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-16',
                        'py-4 sm:py-6 md:py-8 lg:py-10',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {/* Tech Stack */}
                    {item?.stack_items && item?.stack_items.length > 0 && (
                        <FadeIn show={open} className="w-full" delay={250}>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex items-start justify-between',

                                    // Responsive styles
                                    'flex-col gap-4 sm:flex-row sm:gap-0',
                                    'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                )}
                            >
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex shrink-0 flex-col',

                                        'sm:w-[25%]',
                                    )}
                                >
                                    <h4
                                        className={cn(
                                            // Default styles
                                            'font-medium',
                                            'text-lg',
                                        )}
                                    >
                                        {__('landing.projects.sections.tech_stack', 'Tech Stack')}
                                    </h4>
                                </div>
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex flex-wrap gap-2.5 sm:w-[65%]',
                                    )}
                                >
                                    {item.stack_items
                                        .sort(
                                            (a, b) =>
                                                a.sort_order - b.sort_order,
                                        )
                                        .map((tech, techIdx) => (
                                            <span
                                                key={`stack-${techIdx}`}
                                                className={cn(
                                                    // Default styles
                                                    'border border-primary px-2.5 py-1 font-light',
                                                )}
                                            >
                                                {tech.name}
                                            </span>
                                        ))}
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* Description */}
                    {item?.description && (
                        <FadeIn show={open} className="w-full" delay={250}>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex items-start justify-between',

                                    // Responsive styles
                                    'flex-col gap-4 sm:flex-row sm:gap-0',
                                    'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                )}
                            >
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex shrink-0 flex-col',

                                        'sm:w-[25%]',
                                    )}
                                >
                                    <h4
                                        className={cn(
                                            // Default styles
                                            'font-medium',
                                            'text-lg',
                                        )}
                                    >
                                        {__('landing.projects.sections.description', 'Description')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',
                                    )}
                                    dangerouslySetInnerHTML={{ __html: item.description }}
                                >
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* Attachments */}
                    {item?.attachments && item.attachments.length > 0 && (
                        <FadeIn show={open} className="w-full" delay={250}>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-col items-start',

                                    // Responsive styles
                                    'gap-4',
                                    'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                )}
                            >
                                <h4
                                    className={cn(
                                        // Default styles
                                        'font-medium',
                                        'text-lg',
                                    )}
                                >
                                    {__('landing.projects.sections.attachments', 'Attachments')}
                                </h4>

                                <Carousel
                                    attachments={item.attachments}
                                    show_navigation={false}
                                    show_pagination={true}
                                />
                            </div>
                        </FadeIn>
                    )}

                    {/* Feedback */}
                    {item?.feedback && (
                        <FadeIn show={open} className="w-full">
                            <div
                                className={cn(
                                    // Default styles
                                    'flex items-start justify-between',

                                    // Responsive styles
                                    'flex-col gap-4 sm:flex-row sm:gap-0',
                                    'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                )}
                            >
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex shrink-0 flex-col',

                                        'sm:w-[25%]',
                                    )}
                                >
                                    <h4
                                        className={cn(
                                            // Default styles
                                            'font-medium',
                                            'text-lg',
                                        )}
                                    >
                                        {__('landing.projects.sections.feedback', 'Feedback')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',
                                    )}

                                    dangerouslySetInnerHTML={{ __html: item.feedback }}
                                >
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* What I Learned */}
                    {item?.what_i_learned && (
                        <FadeIn show={open} className="w-full">
                            <div
                                className={cn(
                                    // Default styles
                                    'flex items-start justify-between',

                                    // Responsive styles
                                    'flex-col gap-4 sm:flex-row sm:gap-0',
                                    'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                )}
                            >
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex shrink-0 flex-col',

                                        'sm:w-[25%]',
                                    )}
                                >
                                    <h4
                                        className={cn(
                                            // Default styles
                                            'font-medium',
                                            'text-lg',
                                        )}
                                    >
                                        {__('landing.projects.sections.what_i_learned', 'What I Learned')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',
                                    )}

                                    dangerouslySetInnerHTML={{ __html: item.what_i_learned }}
                                >
                                </p>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </aside>
        </div>
    );
}
