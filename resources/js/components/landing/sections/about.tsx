// resources/js/components/landing/sections/about.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Delimiter from '@/components/landing/delimiter';
import UnderlineLink from '@/components/landing/underline-link';
import { ArrowDownRight } from 'lucide-react';

interface AboutProps {
    appear: boolean;
}

export default function About({ appear }: AboutProps) {
    return (
        <section className="mt-48">
            {/* Panels */}
            <div
                className={cn(
                    // Default styles
                    'relative border-t border-b border-dashed',

                    'flex items-stretch justify-between',

                    // Responsive styles
                    'px-8 lg:px-12.5',
                    'flex-col md:flex-row',
                    'gap-0 md:gap-8',

                    // 'bg-red-400 sm:bg-blue-400 md:bg-green-400'
                )}
            >
                {/* Left Panel */}
                <Delimiter
                    className={cn(
                        // Default styles
                        'relative',

                        // Responsive styles
                        'h-auto',
                        'w-full md:w-max',
                        'px-8 py-7',

                        // Before styles
                        'before:absolute before:inset-0 before:-z-1 before:h-48',
                        'before:translate-y-[-100%]',
                        'before:border-r before:border-l before:border-dashed before:border-border',
                    )}
                    dashedBorders={['right', 'left']}
                    plusCorners={['all']}
                >
                    <div
                        className={cn(
                            // Default styles
                            'flex flex-col',

                            'sticky top-[100px]',

                            'gap-4 sm:gap-8',
                        )}
                    >
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            About me
                        </h2>

                        <UnderlineLink
                            href="#"
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
                                className="stroke-1 transition-all group-hover:rotate-45"
                            />
                        </UnderlineLink>
                    </div>
                </Delimiter>

                {/* Right Panel */}
                <div
                    className={cn(
                        // Default styles
                        'font-light',
                        'flex flex-col',

                        // Responsive styles
                        'px-8 md:px-0',
                        'py-12',
                        'gap-4 md:gap-12',

                        'text-lg sm:text-2xl md:text-3xl',
                        'border-t border-r border-l border-dashed border-border md:border-0',
                        'w-full md:w-max md:max-w-[55%]',
                    )}
                >
                    <p>
                        <strong className="font-semibold">
                            Hi, I’m Hakim.
                        </strong>
                    </p>
                    <p>
                        <strong className="font-semibold">
                            I'm a french fullstack engineer
                        </strong>{' '}
                        with a strong focus on development, infrastructure, and
                        automation. I build and manage scalable projects,
                        ensuring smooth deployments and efficient workflows.
                    </p>
                    <p>
                        With a hands-on approach, I handle everything from
                        backend logic to server administration, always paying
                        attention to design and usability. I strive to create
                        solutions that are both{' '}
                        <strong className="font-semibold">
                            functional and visually refined.
                        </strong>
                    </p>
                </div>
            </div>

            {/* Accordion */}
        </section>
    );
}
