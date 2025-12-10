// resources/js/components/landing/sections/sandbox.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

// UI Components
import { Separator } from '@/components/ui/separator';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import RoundedButton from '@/components/landing/rounded-button';
import UnderlineLink from '@/components/landing/underline-link';

// Icons
import { Attachment } from '@/types';
import {
    ArrowDownRight,
    ArrowUpRight,
    Code2,
    SquareArrowOutUpRight,
    X,
} from 'lucide-react';

const sandboxItems = [
    {
        id: '1',
        sort_order: 1,
        title: 'Sample Project 1',
        subtitle: 'This is a description for Sample Project 1.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
        description: `My portfolio is a personal project designed to showcase my  skills, projects, and achievements in a structured and visually  appealing way.
Backoffice Excellence: I utilized ShadCN UI to build a sleek and functional backoffice, making content management  simple and intuitive. The components provide a modern and polished  design that aligns with my portfolio's professional tone.

Innovative Integration: For the first time, I combined React (frontend) and Laravel (backend) using Inertia.js, which offered an incredible developer experience. This setup allowed me to bridge the gap between client-side interactivity and server-side  functionality seamlessly, significantly enhancing my React proficiency.

Theming System: The portfolio includes a customizable theme system, featuring:
A light theme for clarity.
A dark theme for a modern and sleek look.
A minimalist version, currently completed, prioritizing simplicity and focus.
A planned graphic design version, awaiting UX design mockups from my collaborator.

Learning and Growth: This project was highly instructive, pushing me to experiment with  advanced tools and architectures. It’s a testament to my ability to  combine aesthetics with functionality while constantly improving my  technical skills.`,
        feedback: `This project is one of my favorites for several reasons:
I’m incredibly proud of the result, as it reflects my growth and expertise as a developer.
The backoffice system built with ShadCN UI exceeded my expectations in terms of usability and design.
Exploring Inertia.js was a game-changer for my skills, and the hybrid React-Laravel architecture was a joy to work with.
The theming system gave me the opportunity to push my creativity and technical capabilities.
Overall, I see this project as a foundation for showcasing my future achievements, and I’m thrilled with how it turned out.`,
        what_i_learned: `Working on my portfolio was an enriching experience that taught me:
How to integrate React and Laravel using Inertia.js, opening up new possibilities for hybrid front-end and back-end development.
The power of ShadCN UI to simplify UI design while maintaining a modern and professional look.
How to implement a custom theming system, allowing me to experiment with user experience through light/dark modes and minimalist/graphic design layouts.
The importance of clean and maintainable code to manage a project that will evolve over time.
How to manage the balance between functionality and aesthetics, especially  when building a professional portfolio to represent myself.`,
        stacks: ['JavaScript', 'React', 'CSS'],
        images: [],
    },
    {
        id: '2',
        sort_order: 2,
        title: 'Sample Project 2',
        subtitle:
            'This is a description for Sample Project 2. This is a description for Sample Project 2.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
        description: '',
        feedback: '',
        what_i_learned: '',
        stacks: ['JavaScript', 'React', 'CSS'],
        images: [],
    },
    {
        id: '3',
        sort_order: 3,
        title: 'Sample Project 3',
        subtitle: 'This is a description for Sample Project 3.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
        description: '',
        feedback: '',
        what_i_learned: '',
        stacks: ['JavaScript', 'React', 'CSS'],
        images: [],
    },
    {
        id: '4',
        sort_order: 4,
        title: 'Sample Project 4',
        subtitle: 'This is a description for Sample Project 4.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
        description: '',
        feedback: '',
        what_i_learned: '',
        stacks: ['JavaScript', 'React', 'CSS'],
        images: [],
    },
    {
        id: '5',
        sort_order: 5,
        title: 'Sample Project 5',
        subtitle: 'This is a description for Sample Project 5.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
        description: '',
        feedback: '',
        what_i_learned: '',
        stacks: ['JavaScript', 'React', 'CSS'],
        images: [],
    },
];

interface SandboxItemType {
    id: string;
    sort_order: number;
    title: string;
    subtitle: string;
    date: string;
    tags: string[];

    images?: Attachment[];
    source_code_url?: string;
    live_demo_url?: string;
    stacks?: string[];
    description?: string;
    feedback?: string;
    what_i_learned?: string;
}

export default function Sandbox({ appear }: { appear: boolean }) {
    const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

    const cols =
        window.innerWidth >= 1279 ? 3 : window.innerWidth >= 639 ? 2 : 1;

    const columns: SandboxItemType[][] = Array.from({ length: cols }, () => []);

    sandboxItems
        .sort((a, b) => a.sort_order - b.sort_order)
        .forEach((item: SandboxItemType, index) => {
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
                'mt-12 md:mt-24 lg:mt-48',
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
                            The Sand box
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
                            My less impactful but still taughtful works, I’ve
                            currently worked on{' '}
                            <strong className="font-semibold">13</strong> small
                            projects.
                        </p>
                    </Curtain>

                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={500}
                    >
                        <UnderlineLink
                            href="#projects"
                            className={cn(
                                // Default styles
                                'group flex w-max items-center gap-2',

                                // Responsive styles
                                'text-lg',
                                'ml-1.5',
                            )}
                        >
                            Skip
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
                    'gap-4 md:gap-12',

                    'w-full',
                    'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3',
                )}
            >
                {columns.map((columnItems, colIndex) => (
                    <div
                        key={`column-${colIndex}`}
                        className={cn(
                            'flex flex-col gap-4 md:gap-12',
                            'w-full',
                        )}
                    >
                        {columnItems.map((item: SandboxItemType, itemIndex) => (
                            <FadeIn
                                show={appear}
                                key={item.id}
                                className="w-full"
                                // Ajuster le délai pour la séquence dans la colonne
                                delay={(colIndex + itemIndex * cols) * 100}
                            >
                                <SandboxItem
                                    id={item.id}
                                    title={item.title}
                                    subtitle={item.subtitle}
                                    date={item.date}
                                    tags={item.tags}
                                    active={
                                        activeIndex ===
                                        colIndex + itemIndex * cols
                                    }
                                    handleClick={() =>
                                        handleClick(colIndex + itemIndex * cols)
                                    }
                                />
                            </FadeIn>
                        ))}
                    </div>
                ))}
            </Delimiter>

            {/* Dialog */}
            <SandboxDialog
                item={sandboxItems[activeIndex ?? -1] || null}
                handleClose={() => handleClick(null)}
            />
        </section>
    );
}

interface SandboxItemProps {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    tags: string[];
    active?: boolean;
    handleClick?: () => void;
}

function SandboxItem({
    id,
    title,
    subtitle,
    date,
    tags,
    active,
    handleClick,
}: SandboxItemProps) {
    return (
        <a
            href="#"
            className={cn(
                // Default styles
                'group relative h-max',
                'flex flex-col',
                'cursor-pointer transition-all duration-500',
                'border bg-card text-foreground',

                // Responsive styles
                'px-6 sm:px-6 md:px-6 lg:px-6',
                'py-4 sm:py-4 md:py-4 lg:py-6',

                'gap-4',

                // Hover & Focus styles
                'duration-1000 hover:border-primary hover:bg-primary hover:text-primary-foreground',
                'duration-1000 focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none',
                active && 'border-primary bg-primary text-primary-foreground',
            )}
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
                {tags.map((tag, index) => (
                    <span
                        key={`sandbox-${id}-tag-${index}`}
                        className={cn(
                            // Default styles
                            'border border-foreground px-1.5 py-0.5 text-sm font-light',
                        )}
                    >
                        {tag}
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
                {title}
            </h4>

            {/* Description */}
            <p
                className={
                    cn()
                    // Default styles
                }
            >
                {subtitle}
            </p>

            <Separator className="mt-2 bg-foreground" />

            {/* Date */}
            <time
                className={
                    cn()
                    // Default styles
                }
            >
                {new Date(date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                })}
            </time>
        </a>
    );
}

interface SandboxDialogProps {
    item: SandboxItemType | null;
    handleClose: () => void;
}

function SandboxDialog({ item, handleClose }: SandboxDialogProps) {

    const [open, setOpen] = React.useState<boolean>(false);
    const [isFullyClosed, setIsFullyClosed] = React.useState<boolean>(true);

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
                'fixed inset-0 z-40 flex items-center justify-center bg-background/50 backdrop-blur-md cursor-pointer',

                // Transition
                'transition-opacity duration-1000',

                // Visibility
                open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none delay-250',
            )}
            onClick={() => setOpen(false)}
        >
            <aside
                className={cn(
                    // Default styles
                    'fixed inset-0 z-50 mx-auto my-auto border-4 bg-card',
                    'overflow-auto cursor-auto',
                    'transition-all focus-visible:outline-4 focus-visible:outline-primary',

                    // Transition
                    'translate-y-0 opacity-100 transition-all delay-250 duration-1000',
                    !open && 'translate-y-[50%] opacity-0 delay-0 duration-1000',

                    // Responsive styles
                    'sm:h-[70vh] sm:w-[90%] sm:max-w-4xl',
                    'h-full w-full',
                )}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div
                    className={cn(
                        // Default styles
                        'sticky top-0 z-1',
                        'flex',
                        'border-b border-border bg-card',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-8 lg:px-8',
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
                            'flex items-center gap-3',
                        )}
                    >
                        {/* Code source */}
                        <RoundedButton disabled={!item?.source_code_url}>
                            <a href={item?.source_code_url} target='_blank' tabIndex={(item && item.source_code_url) ? 0 : -1}>
                                <Code2 />
                            </a>
                        </RoundedButton>
                        
                        {/* Live demo */}
                        <RoundedButton disabled={!item?.live_demo_url}>
                            <a href={item?.live_demo_url} target='_blank' tabIndex={(item && item.live_demo_url) ? 0 : -1}>
                                <SquareArrowOutUpRight />
                            </a>
                        </RoundedButton>
                        {/* Code source */}
                        <RoundedButton onClick={() => setOpen(false)}>
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
                        'px-6 sm:px-8 md:px-8 lg:px-8',
                        'py-4 sm:py-6 md:py-8 lg:py-10',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {/* Tech Stack */}
                    {item?.stacks && item?.stacks.length > 0 && (
                        <FadeIn show={open} className='w-full' delay={250}>
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
                                        Tech Stack
                                    </h4>
                                </div>
                                <div
                                    className={cn(
                                        // Default styles
                                        'flex flex-wrap gap-2.5 sm:w-[65%]',
                                    )}
                                >
                                    {item.stacks.map((tech, techIdx) => (
                                        <span
                                            key={`stack-${techIdx}`}
                                            className={cn(
                                                // Default styles
                                                'border border-primary px-2.5 py-1 font-light',
                                            )}
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    )}

                    {/* Description */}
                    {item?.description && (
                        <FadeIn show={open} className='w-full' delay={250}>
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
                                        Description
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {item.description}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* Feedback */}
                    {item?.feedback && (
                        <FadeIn show={open} className='w-full' delay={250}>
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
                                        Feedback
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {item.feedback}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* What I Learned */}
                    {item?.what_i_learned && (
                        <FadeIn show={open} className='w-full' delay={250}>
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
                                        What I Learned
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {item.what_i_learned}
                                </p>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </aside>
        </div>
    );
}