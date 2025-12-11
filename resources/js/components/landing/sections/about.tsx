// resources/js/components/landing/sections/about.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

// Components
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';
import UnderlineLink from '@/components/landing/underline-link';

// UI Components
import Curtain from '@/components/landing/curtain';
import FadeIn from '@/components/landing/fade-in';
import Magnet from '@/components/ui/magnet';
import { Separator } from '@/components/ui/separator';
import { TextReveal } from '@/components/ui/text-reveal';

// Icons
import { ArrowDownRight, Download, Minus, Plus } from 'lucide-react';

interface AboutProps {
    appear: boolean;
}

export default function About({ appear }: AboutProps) {
    return (
        <section
            className={cn(
                // Default styles
                'mt-48 flex flex-col',

                // Responsive styles
                'gap-0 md:gap-12 lg:gap-24',
                'mt-12 md:mt-24 lg:mt-48',
                'mb-12 md:mb-24 lg:mb-48',
            )}
            id='about'
        >
            {/* Panels */}
            <Panels appear={appear} />

            {/* Accordion */}
            <Accordions appear={appear} />
        </section>
    );
}

// -------------------------
// Panels
// -------------------------

function Panels({ appear }: AboutProps) {
    return (
        <div
            className={cn(
                // Default styles
                'relative border-t border-b border-dashed',

                'flex items-stretch justify-between',

                // Responsive styles
                'px-6 sm:px-8 md:px-10 lg:px-12.5',
                'flex-col lg:flex-row',
                'gap-0 lg:gap-8',
            )}
        >
            {/* Left Panel */}
            <Delimiter
                className={cn(
                    // Default styles
                    'relative',

                    // Responsive styles
                    'h-auto',
                    'w-full lg:w-max',

                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',

                    'before:h-12 md:before:h-24 lg:before:h-48',

                    // Before styles
                    'before:absolute before:inset-0 before:-z-1',
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

                        'gap-2 sm:gap-4 md:gap-6 lg:gap-8',
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
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            About me
                        </h2>
                    </Curtain>

                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <UnderlineLink
                            href="#projects"
                            showUnderline
                            className={cn(
                                // Default styles
                                'group flex w-max items-center gap-2',

                                // Responsive styles
                                'font-normal',
                                'translate-x-[4px]',
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
            <div
                className={cn(
                    // Default styles
                    'font-light',
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 lg:px-6 xl:px-12.5',
                    'py-12 lg:py-10',
                    'gap-4 lg:gap-12',

                    '!text-lg sm:!text-xl md:!text-2xl',
                    'border-t border-r border-l border-dashed border-border lg:border-0',
                    'w-full lg:w-max lg:max-w-[45%]',
                )}
            >
                {/* Reveal */}
                <TextReveal
                    text_className="!text-lg sm:!text-xl lg:!text-2xl"
                    className="h-[200vh] sm:h-[120vh] lg:h-[200vh] hidden lg:block"
                >
                    <strong className="font-semibold">Hi, I’m Hakim.</strong>
                    <br />
                    <p className="font-light">
                        <strong className="font-semibold">
                            I'm a french fullstack engineer
                        </strong>{' '}
                        with a strong focus on development, infrastructure, and
                        automation. I build and manage scalable projects,
                        ensuring smooth deployments and efficient workflows.
                    </p>
                    <br />
                    <p className="font-normal">
                        With a hands-on approach, I handle everything from
                        backend logic to server administration, always paying
                        attention to design and usability. I strive to create
                        solutions that are both{' '}
                        <strong className="font-semibold">
                            functional and visually refined.
                        </strong>
                    </p>
                </TextReveal>

                {/* Reveal */}
                <FadeIn className="lg:hidden w-full" delay={500} show={appear}>
                    <strong className="font-semibold">Hi, I’m Hakim.</strong>
                    <br />
                    <p className="font-light">
                        <strong className="font-semibold">
                            I'm a french fullstack engineer
                        </strong>{' '}
                        with a strong focus on development, infrastructure, and
                        automation. I build and manage scalable projects,
                        ensuring smooth deployments and efficient workflows.
                    </p>
                    <br />
                    <p className="font-normal">
                        With a hands-on approach, I handle everything from
                        backend logic to server administration, always paying
                        attention to design and usability. I strive to create
                        solutions that are both{' '}
                        <strong className="font-semibold">
                            functional and visually refined.
                        </strong>
                    </p>
                </FadeIn>
            </div>
        </div>
    );
}

// -------------------------
// Accordions
// -------------------------

function Accordions({ appear }: AboutProps) {
    const [openIndex, setOpenIndex] = React.useState<number | null>(null);

    return (
        <div
            className={cn(
                // Default styles
                'w-full border border-dashed border-border',

                // Responsive styles
                'px-6 sm:px-8 md:px-10 lg:px-12.5',
            )}
        >
            <Delimiter
                className={cn(
                    // Default styles
                    'w-full transition-all',

                    // Responsive styles
                    'max-w-full lg:max-w-[70%]',
                    'before:h-12 md:before:h-24 lg:before:h-48',

                    // Before styles
                    'relative',
                    'before:absolute before:right-0 before:bottom-0 before:left-0 before:-z-1',
                    'before:translate-y-[100%]',
                    'before:border-r before:border-l before:border-dashed before:border-border',
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
                    appear={appear}
                />
                <Separator />
                <AccordionWork
                    index={2}
                    title={'Work Experience'}
                    open={openIndex === 2}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                    appear={appear}
                />
                <Separator />
                <AccordionSchool
                    index={3}
                    title={'School & Diplomas'}
                    open={openIndex === 3}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                    appear={appear}
                />
                <Separator />
                <AccordionTechStack
                    index={4}
                    title={'Tech Stack'}
                    open={openIndex === 4}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                    appear={appear}
                />
                <Separator />
                <AccordionTools
                    index={5}
                    title={'Tools & Software'}
                    open={openIndex === 5}
                    onChange={(index) =>
                        setOpenIndex(openIndex === index ? null : index)
                    }
                    appear={appear}
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
    appear?: boolean;
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
    appear,
}: AccordionLayoutProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState('0px');

    useEffect(() => {
        if (contentRef.current) {
            setHeight(open ? `${contentRef.current.scrollHeight}px` : '0px');
        }
    }, [open]);

    return (
        <FadeIn className="w-full" delay={index * 150} show={appear ?? false}>
            <div className={cn('flex flex-col')}>
                {/* Accordion Head */}
                <div
                    className={cn(
                        // Default styles
                        'flex items-center justify-between gap-4 border-b border-transparent transition-all duration-500',
                        'bg-card',

                        // Responsive styles
                        'px-4 sm:px-6 md:px-8',
                        'py-4 sm:py-5 md:py-6',

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
                                'text-lg sm:text-3xl',
                            )}
                        >
                            {title}
                        </p>
                    </div>
                    <Magnet magnetStrength={3} padding={20}>
                        <RoundedButton
                            className={cn(
                                // Default styles
                                'z-1',

                                // Responsive styles
                                'scale-80 sm:scale-100',

                                // Open styles
                                open &&
                                    'border-primary-foreground !text-primary-foreground',
                            )}
                            onClick={() => onChange && onChange(index)}
                        >
                            {open ? <Minus /> : <Plus />}
                        </RoundedButton>
                    </Magnet>
                </div>

                {/* Accordion Content */}
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
                            index === 5 && 'border-b',
                        )}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}

function AccordionAbout({
    index,
    title,
    open,
    onChange,
    appear,
}: AccordionItemProps) {
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
            appear={appear}
        >
            <div
                className={cn(
                    // Default styles
                    'flex justify-between bg-background',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',

                    // Responsive styles
                    'flex-col sm:flex-row',
                )}
            >
                {/* Left Panel - Photo */}
                <div
                    className={cn(
                        // Default styles
                        'flex  shrink-0 bg-card',

                        ' items-center justify-center',

                        // Responsive styles
                        'aspect-square w-full max-w-[300px] sm:aspect-[9/16] sm:w-1/3 sm:max-w-none',
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
                            'px-6 sm:px-8 md:px-10 lg:px-12.5',
                            'py-10',
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
                                'text-base font-medium md:text-xl',
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

                            // Hover styles
                            'border-t border-border',
                            'focus-visible:outline-none',

                            // Responsive styles
                            'p-2 text-lg sm:p-4 sm:text-xl',
                        )}
                        tabIndex={open ? 0 : -1}
                    >
                        <div
                            className={cn(
                                'flex items-center justify-center gap-4 transition-all',
                                'relative z-1',
                                'group-hover:text-primary-foreground group-focus-visible:text-primary-foreground',
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

function AccordionWork({
    index,
    title,
    open,
    onChange,
    appear,
}: AccordionItemProps) {
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
            appear={appear}
        >
            {/* Content goes here */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
                    'gap-6 sm:gap-12',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                <ul
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {experiences.map((exp, idx) => (
                        <li
                            key={`experience-${idx}`}
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
                                    'shrink-0 sm:w-[65%]',
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
                        'text-base font-medium md:text-lg',
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

function AccordionSchool({
    index,
    title,
    open,
    onChange,
    appear,
}: AccordionItemProps) {
    const experiences = [
        {
            title: 'IG2I de Centrale Lille Institut',
            type: 'School',
            duration: '09/21 - Present',
            description:
                'Currently in my 4th year at IG2I Centrale Lille, I am pursuing an engineering degree specializing in industrial and computer science. The program combines academic excellence with real-world applications through hands-on projects and professional training.',
        },
        {
            title: 'TOEIC',
            type: 'Diploma',
            duration: '01/25',
            description:
                'Achieved a perfect score on the TOEIC (990/990) in 2025, demonstrating complete mastery of professional English.',
        },
        {
            title: 'Baccaulaureate',
            type: 'Diploma',
            duration: '08/21',
            description:
                'I completed my high school studies at Lycée Auguste Angellier, earning a Scientific Baccalaureate with Honors in 2021. My specialization in Mathematics and Physics provided a strong analytical foundation, fueling my interest in technology and complex problem-solving.',
        },
        {
            title: 'Cambridge First Certificate',
            type: 'Diploma',
            duration: '06/20',
            description:
                'Earned the Cambridge First Certificate in 2020,  validating my English proficiency at a B2 level. This certification  reflects my ability to communicate effectively in professional and  academic environments.',
        },
        {
            title: 'Lycée Auguste Angellier',
            type: 'School',
            duration: '09/18 - 08/21',
            description:
                'I completed my high school studies at Lycée  Auguste Angellier, earning a Scientific Baccalaureate in 2021. This  solid foundation in mathematics and sciences sparked my passion for  technology and problem-solving.',
        },
    ];

    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
            appear={appear}
        >
            {/* Content goes here */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
                    'gap-6 sm:gap-12',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                <ul
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {experiences.map((exp, idx) => (
                        <li
                            key={`school-${idx}`}
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
                                    {exp.title}
                                </h4>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                    )}
                                >
                                    {exp.type}
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
                                    'shrink-0 sm:w-[65%]',
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
                        'text-base font-medium md:text-lg',
                    )}
                >
                    These experiences have shaped my technical and analytical
                    mindset, preparing me for future challenges in the tech
                    world.
                </div>
            </div>
        </AccordionItem>
    );
}

function AccordionTechStack({
    index,
    title,
    open,
    onChange,
    appear,
}: AccordionItemProps) {
    const stack = [
        {
            category: 'Frontend',
            technologies: [
                'HTML',
                'CSS',
                'SCSS',
                'Tailwind',
                'JavaScript',
                'TypeScript',
                'React',
                'jQuery',
                'Next.js',
            ],
        },
        {
            category: 'Backend',
            technologies: [
                'PHP',
                'Laravel',
                'OctoberCMS',
                'Node.js',
                'NestJS',
                'Express.js',
                'Inertia.js',
            ],
        },
        {
            category: 'Databases',
            technologies: [
                'MySQL',
                'PostgreSQL',
                'PL/SQL',
                'NoSQL',
                'SQLite',
                'MongoDB',
            ],
        },
        {
            category: 'Software',
            technologies: ['C', 'Java', 'Python', 'Bash'],
        },
        {
            category: 'Mobile',
            technologies: ['React Native', 'Flutter'],
        },
    ];

    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
            appear={appear}
        >
            {/* Content goes here */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
                    'gap-6 sm:gap-12',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                <ul
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {stack.map((s, idx) => (
                        <li
                            key={`techstack-${idx}`}
                            className={cn(
                                // Default styles
                                'flex items-start justify-between',

                                // Responsive styles
                                'flex-col gap-4 sm:flex-row sm:gap-0',
                                'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                idx === stack.length - 1 && 'border-0',
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
                                    {s.category}
                                </h4>
                            </div>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-wrap gap-2.5 sm:w-[65%]',
                                )}
                            >
                                {s.technologies.map((tech, techIdx) => (
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
                        </li>
                    ))}
                </ul>
            </div>
        </AccordionItem>
    );
}

function AccordionTools({
    index,
    title,
    open,
    onChange,
    appear,
}: AccordionItemProps) {
    const stack = [
        {
            category: 'IDE',
            technologies: [
                'VS Code',
                'Visual Studio',
                'Sublime Text',
                'Notepad++',
                'Nano',
                'Vim',
                'PhpStorm',
                'IntelliJ IDEA',
                'PyCharm',
            ],
        },
        {
            category: 'DevOps',
            technologies: [
                'Docker',
                'Git',
                'GitHub Actions',
                'CI/CD',
                'Nginx',
                'Apache',
                'Kafka',
                'Nifi',
            ],
        },
        {
            category: 'Databases',
            technologies: [
                'PhpMyAdmin',
                'PgAdmin',
                'Datagrip',
                'MongoDB',
                'DataBricks',
            ],
        },
        {
            category: 'Tools',
            technologies: [
                'Postman',
                'Figma',
                'Docker Desktop',
                'Docs',
                'Sheets',
                'Slides',
                'Canva',
                'Trello',
                'Draw.io',
                'ClickUp',
            ],
        },
    ];

    return (
        <AccordionItem
            index={index}
            title={title}
            open={open}
            onChange={onChange}
            appear={appear}
        >
            {/* Content goes here */}
            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
                    'gap-6 sm:gap-12',

                    // Apparition styles
                    'scale-90 opacity-0 transition-all duration-1000',
                    open && 'scale-100 opacity-100 delay-125',
                )}
            >
                <ul
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        // Responsive styles
                        'gap-6 sm:gap-10',
                    )}
                >
                    {stack.map((s, idx) => (
                        <li
                            key={`tools-${idx}`}
                            className={cn(
                                // Default styles
                                'flex items-start justify-between',

                                // Responsive styles
                                'flex-col gap-4 sm:flex-row sm:gap-0',
                                'border-b border-border pb-4 sm:border-0 sm:pb-0',
                                idx === stack.length - 1 && 'border-0',
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
                                    {s.category}
                                </h4>
                            </div>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-wrap gap-2.5 sm:w-[65%]',
                                )}
                            >
                                {s.technologies.map((tech, techIdx) => (
                                    <span
                                        key={`tool-${techIdx}`}
                                        className={cn(
                                            // Default styles
                                            'border border-primary px-2.5 py-1 font-light',
                                        )}
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </AccordionItem>
    );
}
