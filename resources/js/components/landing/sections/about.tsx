// resources/js/components/landing/sections/about.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

// Components
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';
import UnderlineLink from '@/components/landing/underline-link';

// UI Components
import { Separator } from '@/components/ui/separator';

// Icons
import { ArrowDownRight, Download, Minus, Plus } from 'lucide-react';

interface AboutProps {
    appear: boolean;
}

export default function About({ appear }: AboutProps) {
    console.log(appear);

    return (
        <section
            className={cn(
                // Default styles
                'mt-48 flex flex-col',

                // Responsive styles
                'gap-0 md:gap-12 lg:gap-24',
            )}
        >
            {/* Panels */}
            <Panels />

            {/* Accordion */}
            <Accordions />
        </section>
    );
}

// -------------------------
// Panels
// -------------------------

function Panels() {
    return (
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

                    'text-lg sm:text-xl md:text-2xl',
                    'border-t border-r border-l border-dashed border-border md:border-0',
                    'w-full md:w-max md:max-w-[55%] lg:max-w-[45%]',
                )}
            >
                <p>
                    <strong className="font-semibold">Hi, I’m Hakim.</strong>
                </p>
                <p>
                    <strong className="font-semibold">
                        I'm a french fullstack engineer
                    </strong>{' '}
                    with a strong focus on development, infrastructure, and
                    automation. I build and manage scalable projects, ensuring
                    smooth deployments and efficient workflows.
                </p>
                <p>
                    With a hands-on approach, I handle everything from backend
                    logic to server administration, always paying attention to
                    design and usability. I strive to create solutions that are
                    both{' '}
                    <strong className="font-semibold">
                        functional and visually refined.
                    </strong>
                </p>
            </div>
        </div>
    );
}

// -------------------------
// Accordions
// -------------------------

function Accordions() {
    const [openIndex, setOpenIndex] = React.useState<number | null>(2);

    return (
        <div
            className={cn(
                // Default styles
                'w-full border border-dashed border-border',

                // Responsive styles
                'px-8 lg:px-12.5',
            )}
        >
            <Delimiter
                className={cn(
                    // Default styles
                    'w-full transition-all',

                    // Responsive styles
                    'max-w-full lg:max-w-[70%]',
                )}
                dashedBorders={['right', 'left']}
                plusCorners={['all']}
            >
                <AccordionAbout
                    index={1}
                    title={'About me'}
                    open={openIndex === 1}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
                <Separator />
                <AccordionWork
                    index={2}
                    title={'Work Experience'}
                    open={openIndex === 2}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
                <Separator />
                <AccordionSchool
                    index={3}
                    title={'School & Diplomas'}
                    open={openIndex === 3}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
                <Separator />
                <AccordionTechStack
                    index={4}
                    title={'Tech Stack'}
                    open={openIndex === 4}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
                <Separator />
                <AccordionTools
                    index={5}
                    title={'Tools & Software'}
                    open={openIndex === 5}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                />
            </Delimiter>
        </div>
    );
}

interface AccordionItemProps {
    index: number;
    title: string;
    open?: boolean;
    onChange?: (index: number) => void;
}

interface AccordionLayoutProps extends AccordionItemProps {
    children: React.ReactNode;
}

function AccordionItem({
    index,
    title,
    children,
    open,
    onChange,
}: AccordionLayoutProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setHeight(open ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [open]);

    return (
        <div
            className={cn(
                'flex flex-col',

                // "bg-red-400 sm:bg-blue-400 md:bg-green-400"
            )}
        >
            <div
                className={cn(
                    // Default styles
                    'flex items-center justify-between gap-4 border-b border-transparent transition-all duration-500',
                    'bg-card',

                    // Responsive styles
                    'p-4 lg:px-10 lg:py-8',

                    // Open styles
                    open &&
                        'border-border bg-primary text-primary-foreground duration-1000',
                )}
            >
                <div
                    className={cn(
                        'flex',
                        'flex-col gap-0 sm:flex-row sm:items-center sm:gap-6',
                    )}
                >
                    <h3
                        className={cn(
                            // Default styles
                            'font-semibold',

                            // Responsive styles
                            'text-xl sm:text-3xl',
                        )}
                    >
                        0{index}
                    </h3>
                    <p
                        className={cn(
                            // Default styles
                            'font-light',

                            // Responsive styles
                            'text-xl sm:text-3xl',
                        )}
                    >
                        {title}
                    </p>
                </div>
                <RoundedButton
                    className={cn(
                        'z-10',
                        open &&
                            'border-primary-foreground !text-primary-foreground',
                    )}
                    onClick={() => onChange && onChange(index)}
                >
                    {open ? <Minus /> : <Plus />}
                </RoundedButton>
            </div>

            <div
                ref={contentRef}
                style={{ maxHeight: height }}
                className={cn(
                    'overflow-hidden py-0 transition-all duration-500',
                )}
            >
                <div
                    className={cn(
                        // Default styles
                        'border-r border-l border-border',
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

function AccordionAbout({ index, title, open, onChange }: AccordionItemProps) {
    const quotes = [
        '“Aiming to build the future one line of code at a time.”',
        "“It's never a bug, it's a feature.”",
        '“My journey balances expertise in tools I know and excitement for those I’ve yet to explore.”',
        '“If it’s not broken, do not fix it.”',
    ];

    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
        >
            <div
                className={cn(
                    // Default styles
                    'flex justify-between bg-background',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                {/* Left Panel - Photo */}
                <div
                    className={cn(
                        // Default styles
                        'aspect-[9/16] shrink-0 bg-card',
                        'w-1/3',

                        'flex items-center justify-center',
                    )}
                >
                    Photo
                </div>

                {/* Right Panel - Text + Button */}
                <div
                    className={cn(
                        // Default styles
                        'flex flex-col justify-between',
                    )}
                >
                    {/* My philosophy */}
                    <div
                        className={cn(
                            // Default styles
                            'flex flex-col justify-between gap-6',

                            // Responsive styles
                            'p-4 lg:px-16 lg:py-12',
                        )}
                    >
                        <h4
                            className={cn(
                                // Default styles
                                'text-xl font-light',
                            )}
                        >
                            My philosophy
                        </h4>
                        <ul
                            className={cn(
                                // Default styles
                                'flex flex-col gap-6',
                                'text-xl font-medium',
                            )}
                        >
                            {quotes.map((quote, index) => (
                                <li key={index}>{quote}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Temp Button */}
                    <button
                        className={cn(
                            'group relative w-full cursor-pointer bg-secondary text-xl',
                            'p-4',

                            // Hover styles
                            'border-t border-border',
                            'focus-visible:outline-none',
                        )}
                        tabIndex={open ? 0 : -1}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-center gap-4',
                                'relative z-1',
                            )}
                        >
                            Download my resume
                            <Download className="stroke-1" />
                        </div>

                        <div
                            className={cn(
                                'absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000',
                            )}
                        ></div>
                    </button>
                </div>
            </div>
        </AccordionItem>
    );
}

function AccordionWork({ index, title, open, onChange }: AccordionItemProps) {
    const experiences = [
        {
            company: 'Réservoir Digital',
            status: 'Apprenticeship',
            duration: '09/23 - Present',
            description:
                'I oversee the development of web projects from analysis to production.  My role includes ensuring compliance with business needs, streamlining  workflows, and modernizing internal processes.',
        },
        {
            company: 'Réservoir Digital',
            status: 'Internship',
            duration: '05/23 - 08/23',
            description:
                'During my internship at Réservoir Digital, I  improved my skills in new technologies while contributing to digital  solution development. Collaborating within a team was a key part of this experience.',
        },
        {
            company: 'Hôpital Maritime de Zuydcoote',
            status: 'Internship',
            duration: '06/22 - 08/22',
            description:
                'I managed IT  infrastructure to ensure system connectivity and reliability. I also  developed an internal website that optimized patient file management,  replacing outdated Excel processes.',
        },
    ];

    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
        >
            {/* Content goes here */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-col gap-12',

                    // Responsive styles
                    'p-4 lg:px-16 lg:py-12',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                <ul
                    className={cn(
                        // Default styles
                        'flex flex-col gap-10',
                    )}
                >
                    {experiences.map((exp, idx) => (
                        <li
                            key={idx}
                            className={cn(
                                // Default styles
                                'flex items-start justify-between',
                            )}
                        >
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-col shrink-0',

                                    'w-[25%]',
                                )}
                            >
                                <h4
                                    className={cn(
                                        // Default styles
                                        'font-medium',
                                        'text-lg',
                                    )}
                                >
                                    {exp.company}
                                </h4>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                    )}
                                >
                                    {exp.status}
                                </p>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                    )}
                                >
                                    {exp.duration}
                                </p>

                            </div>
                            <p
                                className={cn(
                                    // Default styles
                                    'font-light',
                                    'text-base',
                                    'shrink-0 w-[65%]'
                                )}
                            >
                                {exp.description}
                            </p>
                        </li>
                    ))}
                </ul>
                <div
                    className={cn(
                        // Default styles
                        'text-lg font-medium',
                    )}
                >
                    These roles have sharpened my ability to deliver efficient,
                    innovative solutions while adapting to diverse professional
                    environments.
                </div>
            </div>
        </AccordionItem>
    );
}

function AccordionSchool({ index, title, open, onChange }: AccordionItemProps) {
    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
        >
            {/* Content goes here */}
            <div></div>
        </AccordionItem>
    );
}

function AccordionTechStack({
    index,
    title,
    open,
    onChange,
}: AccordionItemProps) {
    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
        >
            {/* Content goes here */}
            <div></div>
        </AccordionItem>
    );
}

function AccordionTools({ index, title, open, onChange }: AccordionItemProps) {
    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
        >
            {/* Content goes here */}
            <div></div>
        </AccordionItem>
    );
}
