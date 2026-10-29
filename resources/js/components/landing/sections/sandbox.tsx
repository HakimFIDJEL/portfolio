// resources/js/components/landing/sections/sandbox.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

// UI Components
import Magnet from '@/components/ui/magnet';
import { Separator } from '@/components/ui/separator';

// Components
import Carousel from '@/components/landing/carousel';
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
    const [selectedProject, setSelectedProject] =
        React.useState<Project | null>(null);
    const __ = useTrans();

    const [cols, setCols] = React.useState(3);

    React.useEffect(() => {
        const handleResize = () => {
            setCols(
                window.innerWidth >= 1279
                    ? 3
                    : window.innerWidth >= 639
                      ? 2
                      : 1,
            );
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const columns: Project[][] = Array.from({ length: cols }, () => []);

    projects
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach((item: Project, index) => {
            const columnIndex = index % cols;
            columns[columnIndex].push(item);
        });

    return (
        <section
            className={cn(
                // Default styles
                'flex scroll-mt-24 items-stretch justify-between',
                'relative w-full border-t border-b border-dashed',

                // Responsive styles
                'px-0 sm:px-8 md:px-10 lg:px-12.5',
                'flex-col lg:flex-row',
                // 'mt-36 lg:mt-48',
            )}
            id="sandbox"
        >
            {/* Left Panel - Desktop */}
            <div
                className={cn(
                    // Default styles

                    // Responsive styles
                    'w-full lg:w-[25%] lg:min-w-[285px]',

                    'px-6 lg:pr-12.5 lg:pl-0',
                    'py-4 sm:py-6 md:py-8 lg:py-10',

                    'border-r border-b border-l border-dashed',
                    'lg:border-0',

                    'hidden lg:block',
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
                    <FadeIn show={appear} className="w-full" delay={0}>
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            {__('landing.landing.sandbox.h2', 'The Sand Box')}
                        </h2>
                    </FadeIn>

                    <FadeIn show={appear} className="w-full" delay={250}>
                        <p
                            className={cn(
                                // Default styles
                                'text-base sm:text-lg',
                            )}
                        >
                            {__(
                                'landing.landing.sandbox.p_1',
                                'My less impactful but still taughtful works, I’ve currently worked on',
                            )}{' '}
                            <strong className="font-semibold">
                                {projects.length}{' '}
                            </strong>{' '}
                            {__(
                                'landing.landing.sandbox.p_2',
                                'small projects here.',
                            )}
                        </p>
                    </FadeIn>

                    <FadeIn className="w-auto" show={appear} delay={500}>
                        <UnderlineLink
                            aria_label={__(
                                'landing.seo.scroll_to_section',
                                'Scroll to :section section',
                                { section: 'contact' },
                            )}
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
                    </FadeIn>
                </div>
            </div>

            {/* Left Panel - Mobile */}
            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',
                    'border-b border-dashed',
                    'sm:border-0',
                    'block lg:hidden',
                )}
            >
                <Delimiter
                    plusCorners={['top-left', 'top-right']}
                    className={cn(
                        // Default styles

                        // Responsive styles
                        'w-full lg:w-[25%] lg:min-w-[285px]',

                        'px-6 lg:pr-12.5 lg:pl-0',
                        'py-8 sm:py-6 md:py-8 lg:py-10',

                        'border-r border-l border-dashed',
                        'lg:border-0',

                        'flex flex-col',
                        'gap-4 sm:gap-8',
                    )}
                >
                    <FadeIn show={appear} className="w-full" delay={0}>
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            {__('landing.landing.sandbox.h2', 'The Sand Box')}
                        </h2>
                    </FadeIn>

                    <FadeIn show={appear} className="w-full" delay={250}>
                        <p
                            className={cn(
                                // Default styles
                                'text-base sm:text-lg',
                            )}
                        >
                            {__(
                                'landing.landing.sandbox.p_1',
                                'My less impactful but still taughtful works, I’ve currently worked on',
                            )}{' '}
                            <strong className="font-semibold">
                                {projects.length}{' '}
                            </strong>{' '}
                            {__(
                                'landing.landing.sandbox.p_2',
                                'small projects here.',
                            )}
                        </p>
                    </FadeIn>

                    <FadeIn className="w-auto" show={appear} delay={500}>
                        <UnderlineLink
                            aria_label={__(
                                'landing.seo.scroll_to_section',
                                'Scroll to :section section',
                                { section: 'contact' },
                            )}
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
                    </FadeIn>
                </Delimiter>
            </div>

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

                    'mx-6 sm:mx-0',

                    'w-auto sm:w-full',
                    'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                )}
            >
                {columns.map((columnItems, colIndex) => (
                    <div
                        key={`column-${colIndex}`}
                        className={cn('flex flex-col gap-4 md:gap-8', 'w-full')}
                    >
                        {columnItems.map((item: Project) => (
                            <FadeIn
                                show={appear}
                                key={item.id}
                                className="w-full"
                                delay={250}
                            >
                                <Magnet magnetStrength={16} padding={10}>
                                    <SandboxItem
                                        project={item}
                                        active={selectedProject?.id === item.id}
                                        handleClick={() =>
                                            setSelectedProject((prev) =>
                                                prev?.id === item.id
                                                    ? null
                                                    : item,
                                            )
                                        }
                                        dialog_open={selectedProject !== null}
                                    />
                                </Magnet>
                            </FadeIn>
                        ))}
                    </div>
                ))}
            </Delimiter>

            {/* Dialog */}
            <SandboxDialog
                item={selectedProject}
                handleClose={() => setSelectedProject(null)}
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
                'group relative h-max overflow-hidden',
                'flex flex-col',
                'cursor-pointer transition-all duration-500',
                'border border-border bg-card text-foreground',
                'text-start',

                // Responsive styles
                'px-6 sm:px-6 md:px-6 lg:px-6',
                'py-4 sm:py-4 md:py-4 lg:py-6',

                'gap-4',

                // Hover & Focus styles
                'duration-500 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                'duration-500 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none',
                active && 'border-primary bg-primary text-primary-foreground',
            )}
            tabIndex={dialog_open ? -1 : 0}
            onClick={handleClick}
            aria-label={__('landing.seo.open_dialog', 'Open dialog')}
        >
            {/* Top-right corner arrow with localized backdrop-blur and slide-up opacity transition */}
            <div
                className={cn(
                    'pointer-events-none absolute top-3 right-3 z-10 sm:top-4 sm:right-4',
                    'flex size-10 items-center justify-center backdrop-blur-sm sm:size-11',
                    'translate-y-2.5 text-primary-foreground opacity-0 transition-all duration-300 ease-out',
                    'group-hover:translate-y-0 group-hover:opacity-100',
                    'group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
                    active && 'translate-y-0 opacity-100',
                )}
            >
                <ArrowUpRight
                    className={cn('size-7 stroke-[1.25] sm:size-8')}
                />
            </div>

            {/* Tags */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-wrap gap-1.5 pr-12 sm:gap-2 sm:pr-14',
                )}
            >
                {project.is_new == true && (
                    <span
                        className={cn(
                            // Default styles
                            'border border-primary bg-primary px-2 py-0.5 text-xs font-light text-primary-foreground sm:text-xs',
                            'transition-all duration-500',

                            // Hover & Focus styles
                            'group-hover:border-primary-foreground group-hover:bg-primary-foreground group-hover:text-primary',
                            'group-focus-visible:border-primary-foreground group-focus-visible:bg-primary-foreground group-focus-visible:text-primary',
                            active &&
                                'border-primary-foreground bg-primary-foreground text-primary',
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
                                'border border-border bg-card/60 px-2 py-0.5 text-xs font-light text-foreground sm:text-xs',
                                'transition-all duration-500',

                                // Hover & Focus styles
                                'group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground',
                                'group-focus-visible:border-primary-foreground/30 group-focus-visible:bg-primary-foreground/10 group-focus-visible:text-primary-foreground',
                                active &&
                                    'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground',
                            )}
                        >
                            {tag.name}
                        </span>
                    ))}
            </div>

            {/* Title */}
            <h3
                className={cn(
                    // Default styles
                    'font-medium tracking-tight transition-colors duration-500',
                    'text-lg',
                    'group-hover:text-primary-foreground group-focus-visible:text-primary-foreground',
                )}
            >
                {project.title}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed font-light text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/90 group-focus-visible:text-primary-foreground/90 sm:text-base">
                {project.subtitle}
            </p>

            <Separator className="mt-2 bg-muted-foreground transition-all duration-500 group-hover:bg-primary-foreground group-focus-visible:bg-primary-foreground" />

            {/* Date */}
            {project.end_date ? (
                <time className="text-xs font-light text-muted-foreground transition-colors duration-500 group-hover:text-primary-foreground/80 group-focus-visible:text-primary-foreground/80 sm:text-sm">
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
                        'w-max border border-border bg-card/60 px-2 py-0.5 text-xs font-light text-foreground sm:text-xs',
                        'transition-all duration-500',

                        // Hover & Focus styles
                        'group-hover:border-primary-foreground/30 group-hover:bg-primary-foreground/10 group-hover:text-primary-foreground',
                        'group-focus-visible:border-primary-foreground/30 group-focus-visible:bg-primary-foreground/10 group-focus-visible:text-primary-foreground',
                        active &&
                            'border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground',
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

function cleanHtml(html: string | null | undefined): string {
    if (!html) return '';
    return html
        .replace(/<li>\s*(?:<p>(?:&nbsp;|\s|<br\s*\/?>)*<\/p>)?\s*<\/li>/gi, '')
        .replace(/<p>(?:&nbsp;|\s|<br\s*\/?>)*<\/p>/gi, '')
        .trim();
}

function hasContent(html: string | null | undefined): boolean {
    if (!html) return false;
    const textOnly = html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .trim();
    return textOnly.length > 0;
}

function SandboxDialog({ item, handleClose }: SandboxDialogProps) {
    const __ = useTrans();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [canScrollTop, setCanScrollTop] = React.useState(false);
    const [canScrollBottom, setCanScrollBottom] = React.useState(false);
    const [isScrolled, setIsScrolled] = React.useState(false);

    const handleScroll = React.useCallback(() => {
        const el = contentRef.current;
        if (!el) return;

        const scrollTop = el.scrollTop;
        const scrollBottom = el.scrollHeight - scrollTop - el.clientHeight;

        setCanScrollTop(scrollTop > 6);
        setCanScrollBottom(scrollBottom > 6);
        setIsScrolled(scrollTop > 10);
    }, []);

    React.useEffect(() => {
        if (!item) return;

        const originalOverflow = document.body.style.overflow;
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [item, handleClose]);

    React.useEffect(() => {
        if (!item) return;

        handleScroll();
        const timer = setTimeout(handleScroll, 100);
        const resizeObserver = new ResizeObserver(() => handleScroll());
        if (contentRef.current) {
            resizeObserver.observe(contentRef.current);
        }

        return () => {
            clearTimeout(timer);
            resizeObserver.disconnect();
        };
    }, [item, handleScroll]);

    const activeItemRef = React.useRef(item);
    if (item) {
        activeItemRef.current = item;
    }
    const displayItem = item || activeItemRef.current;

    const cleanedDescription = cleanHtml(displayItem?.description);
    const cleanedFeedback = cleanHtml(displayItem?.feedback);
    const cleanedWhatILearned = cleanHtml(displayItem?.what_i_learned);

    const hasDescription = hasContent(cleanedDescription);
    const hasFeedback = hasContent(cleanedFeedback);
    const hasWhatILearned = hasContent(cleanedWhatILearned);
    const hasTags =
        Boolean(displayItem?.is_new) ||
        Boolean(displayItem?.tags && displayItem.tags.length > 0);

    const portfolioEase = [0.25, 0.38, 0, 0.99] as const;

    return (
        <AnimatePresence>
            {item && displayItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-6 md:p-10">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            transition: {
                                duration: 0.8,
                                ease: portfolioEase,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            transition: {
                                duration: 0.6,
                                ease: portfolioEase,
                            },
                        }}
                        className="fixed inset-0 cursor-pointer bg-background/80 backdrop-blur-xs"
                        onClick={handleClose}
                    />

                    {/* Dialog Window */}
                    <motion.aside
                        role="dialog"
                        aria-modal="true"
                        initial={{ opacity: 0, y: 60 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            transition: {
                                duration: 0.9,
                                ease: portfolioEase,
                            },
                        }}
                        exit={{
                            opacity: 0,
                            y: 40,
                            scale: 0.98,
                            transition: {
                                duration: 0.6,
                                ease: portfolioEase,
                            },
                        }}
                        className="relative z-10 flex h-full w-full max-w-5xl flex-col overflow-hidden border-0 bg-background sm:h-[88vh] sm:max-h-[820px] sm:border sm:border-border"
                        onClick={(e: React.MouseEvent) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div
                            className={cn(
                                'flex shrink-0 flex-col-reverse gap-3 border-b border-border bg-card px-6 transition-all duration-200 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-8 md:px-12',
                                isScrolled ? 'py-3 sm:py-3.5' : 'py-4 sm:py-5',
                            )}
                        >
                            <div className="flex min-w-0 flex-col">
                                <AnimatePresence initial={false}>
                                    {!isScrolled && hasTags && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: portfolioEase,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <div className="flex flex-wrap items-center gap-2 pb-1.5">
                                                {Boolean(
                                                    displayItem.is_new,
                                                ) && (
                                                    <span className="border border-primary bg-primary px-3.5 py-1.5 text-xs font-light tracking-wide text-primary-foreground uppercase sm:text-sm">
                                                        {__(
                                                            'landing.projects.new',
                                                            'New',
                                                        )}
                                                    </span>
                                                )}
                                                {displayItem.tags?.map(
                                                    (tag) => (
                                                        <span
                                                            key={tag.id}
                                                            className="border border-border bg-card/60 px-3.5 py-1.5 text-xs font-light text-foreground sm:text-sm"
                                                        >
                                                            {tag.name}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <h3 className="text-xl font-medium tracking-tight text-foreground transition-all duration-200 sm:text-2xl">
                                    {displayItem.title}
                                </h3>

                                <AnimatePresence initial={false}>
                                    {!isScrolled && displayItem.subtitle && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                                opacity: 1,
                                                height: 'auto',
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: portfolioEase,
                                            }}
                                            className="overflow-hidden"
                                        >
                                            <p className="pt-1 text-sm font-light text-muted-foreground sm:text-base">
                                                {displayItem.subtitle}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Magnetic Action Buttons */}
                            <div className="flex shrink-0 items-center gap-3 self-start sm:self-center">
                                {displayItem.source_code_url && (
                                    <Magnet magnetStrength={3} padding={20}>
                                        <RoundedButton
                                            href={displayItem.source_code_url}
                                            target="_blank"
                                            aria_label={__(
                                                'landing.seo.view_source_code',
                                                'View source code',
                                            )}
                                        >
                                            <Code2 className="stroke-1" />
                                        </RoundedButton>
                                    </Magnet>
                                )}

                                {displayItem.live_demo_url && (
                                    <Magnet magnetStrength={3} padding={20}>
                                        <RoundedButton
                                            href={displayItem.live_demo_url}
                                            target="_blank"
                                            aria_label={__(
                                                'landing.seo.view_live_demo',
                                                'View live demo',
                                            )}
                                        >
                                            <SquareArrowOutUpRight className="stroke-1" />
                                        </RoundedButton>
                                    </Magnet>
                                )}

                                <Magnet magnetStrength={3} padding={20}>
                                    <RoundedButton
                                        onClick={handleClose}
                                        aria_label={__(
                                            'landing.seo.close_dialog',
                                            'Close dialog',
                                        )}
                                    >
                                        <X className="stroke-1" />
                                    </RoundedButton>
                                </Magnet>
                            </div>
                        </div>

                        {/* Scrollable Area Wrapper with Floating Gradients */}
                        <div className="relative flex min-h-0 flex-1 flex-col">
                            {/* Top Gradient */}
                            <div
                                className={cn(
                                    'pointer-events-none absolute top-0 right-0 left-0 z-10 h-8 bg-gradient-to-b from-background to-transparent transition-opacity duration-200',
                                    canScrollTop ? 'opacity-100' : 'opacity-0',
                                )}
                            />

                            {/* Scrollable Content Body */}
                            <div
                                ref={contentRef}
                                onScroll={handleScroll}
                                className="flex flex-1 flex-col gap-8 overflow-y-auto bg-background px-6 py-8 sm:gap-10 sm:px-8 md:px-12"
                            >
                                {/* Attachments */}
                                {displayItem.attachments &&
                                    displayItem.attachments.length > 0 && (
                                        <div className="w-full">
                                            <Carousel
                                                attachments={
                                                    displayItem.attachments
                                                }
                                                show_navigation={false}
                                                show_pagination={true}
                                                className="w-full overflow-hidden border border-border"
                                            />
                                        </div>
                                    )}

                                {/* Tech Stack */}
                                {displayItem.stack_items &&
                                    displayItem.stack_items.length > 0 && (
                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-lg font-medium text-foreground">
                                                {__(
                                                    'landing.projects.sections.tech_stack',
                                                    'Tech Stack',
                                                )}
                                            </h4>
                                            <div className="flex flex-wrap gap-2">
                                                {displayItem.stack_items
                                                    .sort(
                                                        (a, b) =>
                                                            a.sort_order -
                                                            b.sort_order,
                                                    )
                                                    .map((tech, techIdx) => (
                                                        <span
                                                            key={`dialog-stack-${techIdx}`}
                                                            className="border border-border bg-card/60 px-3.5 py-1.5 text-xs font-light text-foreground sm:text-sm"
                                                        >
                                                            {tech.name}
                                                        </span>
                                                    ))}
                                            </div>
                                        </div>
                                    )}

                                {/* Description */}
                                {hasDescription && (
                                    <div className="flex flex-col gap-3">
                                        <h4 className="text-lg font-medium text-foreground">
                                            {__(
                                                'landing.projects.sections.description',
                                                'Description',
                                            )}
                                        </h4>
                                        <div
                                            className="flex flex-col gap-3 text-sm leading-relaxed font-light text-foreground/85 sm:text-base [&_a]:underline hover:[&_a]:text-primary [&_li:empty]:hidden [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                                            dangerouslySetInnerHTML={{
                                                __html: cleanedDescription,
                                            }}
                                        />
                                    </div>
                                )}

                                {/* Feedback & What I Learned */}
                                {(hasFeedback || hasWhatILearned) && (
                                    <div className="border-t border-border pt-8">
                                        <div
                                            className={cn(
                                                'grid gap-8 lg:gap-12',
                                                hasFeedback && hasWhatILearned
                                                    ? 'grid-cols-1 md:grid-cols-2'
                                                    : 'grid-cols-1',
                                            )}
                                        >
                                            {hasFeedback && (
                                                <div className="flex flex-col gap-3">
                                                    <h4 className="text-lg font-medium text-foreground">
                                                        {__(
                                                            'landing.projects.sections.feedback',
                                                            'Feedback',
                                                        )}
                                                    </h4>
                                                    <div
                                                        className="flex flex-col gap-3 text-sm leading-relaxed font-light text-foreground/80 sm:text-base [&_li:empty]:hidden [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                                                        dangerouslySetInnerHTML={{
                                                            __html: cleanedFeedback,
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {hasWhatILearned && (
                                                <div className="flex flex-col gap-3">
                                                    <h4 className="text-lg font-medium text-foreground">
                                                        {__(
                                                            'landing.projects.sections.what_i_learned',
                                                            'What I Learned',
                                                        )}
                                                    </h4>
                                                    <div
                                                        className="flex flex-col gap-3 text-sm leading-relaxed font-light text-foreground/80 sm:text-base [&_li:empty]:hidden [&_strong]:font-medium [&_strong]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
                                                        dangerouslySetInnerHTML={{
                                                            __html: cleanedWhatILearned,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Bottom Gradient */}
                            <div
                                className={cn(
                                    'pointer-events-none absolute right-0 bottom-0 left-0 z-10 h-8 bg-gradient-to-t from-background to-transparent transition-opacity duration-200',
                                    canScrollBottom
                                        ? 'opacity-100'
                                        : 'opacity-0',
                                )}
                            />
                        </div>
                    </motion.aside>
                </div>
            )}
        </AnimatePresence>
    );
}
