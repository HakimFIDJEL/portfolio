// resources/js/components/landing/sections/sandbox.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import UnderlineLink from '@/components/landing/underline-link';
import FadeIn from '@/components/landing/fade-in';

// Icons
import { Separator } from '@/components/ui/separator';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

const sandboxItems = [
    {
        id: '1',
        sort_order: 1,
        title: 'Sample Project 1',
        subtitle: 'This is a description for Sample Project 1.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
    },
    {
        id: '2',
        sort_order: 2,
        title: 'Sample Project 2',
        subtitle: 'This is a description for Sample Project 2. This is a description for Sample Project 2.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
    },
    {
        id: '3',
        sort_order: 3,
        title: 'Sample Project 3',
        subtitle: 'This is a description for Sample Project 3.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
    },
    {
        id: '4',
        sort_order: 4,
        title: 'Sample Project 4',
        subtitle: 'This is a description for Sample Project 4.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
    },
    {
        id: '5',
        sort_order: 5,
        title: 'Sample Project 5',
        subtitle: 'This is a description for Sample Project 5.',
        date: '2023-01-15',
        tags: ['JavaScript', 'Web Development'],
    },
];

export default function Sandbox({ appear }: { appear: boolean }) {
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

                    'px-0 lg:pr-12.5 lg:pl-0',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
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
                    'px-6 sm:px-8 md:px-2 lg:px-12.5',
                    'py-12 md:py-10',
                    'gap-4 md:gap-12',

                    'w-full',
                    'grid grid-cols-2 md:grid-cols-3',
                )}
            >
                {/* TODO : When grid-cols-2, add 2 grids for a column, same for grid-cols-3 and 3 grids */}
                {sandboxItems
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((item, index) => (
                        <FadeIn
                            show={appear}
                            key={item.id}
                            className='w-full'
                            delay={index * 100}
                        >
                            <SandboxItem
                                id={item.id}
                                title={item.title}
                                subtitle={item.subtitle}
                                date={item.date}
                                tags={item.tags}
                            />
                        </FadeIn>
                    ))}
            </Delimiter>
        </section>
    );
}

interface SandboxItemProps {
    id: string;
    title: string;
    subtitle: string;
    date: string;
    tags: string[];
}

function SandboxItem({
    id,
    title,
    subtitle,
    date,
    tags,
}: SandboxItemProps) {
    return (
        <a
            href="#"
            className={cn(
                // Default styles
                'group relative h-max',
                'flex flex-col',
                'cursor-pointer transition-all duration-1000',
                'border bg-card text-foreground',

                // Responsive styles
                'px-6 sm:px-6 md:px-6 lg:px-6',
                'py-4 sm:py-4 md:py-4 lg:py-6',

                'gap-4',

                // Hover & Focus styles
                'hover:border-primary hover:bg-primary hover:text-primary-foreground',
                'focus-visible:border-primary focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none',
            )}
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
                className={cn()
                // Default styles
                }
            >
                {subtitle}
            </p>

            <Separator className="mt-2 bg-foreground" />

            {/* Date */}
            <time
                className={cn()
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
