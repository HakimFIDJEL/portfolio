// resources/js/components/landing/sections/about.tsx

// Necessary imports
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// Components
import Delimiter from '@/components/landing/delimiter';
import UnderlineLink from '@/components/landing/underline-link';
import RoundedButton from '@/components/landing/rounded-button';

// UI Components
import { Separator } from '@/components/ui/separator';

// Icons
import { ArrowDownRight, Minus, Plus } from 'lucide-react';

interface AboutProps {
    appear: boolean;
}

export default function About({ appear }: AboutProps) {

    console.log(appear);

    return (
        <section className="mt-48 flex flex-col gap-24">
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
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

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
                className={cn('w-full max-w-[70%]')}
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
        <div className="flex flex-col">
            <div
                className={cn(
                    'flex items-center justify-between px-8 py-6 transition-all duration-500 lg:px-10 lg:py-8 border-b border-transparent bg-card ',
                    open && 'bg-primary text-primary-foreground duration-1000 border-border',
                )}
            >
                <div className="flex items-center gap-6">
                    <h3 className="text-3xl font-semibold">0{index}</h3>
                    <p className="text-3xl font-light">{title}</p>
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
                className={cn('overflow-hidden py-0 transition-all duration-500')}
            >
                <div className={cn(
                    // Default styles
                    'bg-background border-border border-l border-r',

                    // Responsive styles
                    'px-8 py-6 lg:px-10 lg:py-8',
                )}>
                    {children}
                </div>
            </div>
        </div>
    );
}

function AccordionAbout({ index, title, open, onChange }: AccordionItemProps) {
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

function AccordionWork({ index, title, open, onChange }: AccordionItemProps) {
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
