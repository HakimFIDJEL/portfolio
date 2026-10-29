// resources/js/components/landing/sections/about.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'motion/react';
import React from 'react';

// Components
import Delimiter from '@/components/landing/delimiter';
import UnderlineLink from '@/components/landing/underline-link';

// UI Components
import FadeIn from '@/components/landing/fade-in';
import Magnet from '@/components/ui/magnet';
import { TextReveal } from '@/components/ui/text-reveal';

// Icons
import { ArrowDownRight, Download } from 'lucide-react';

// Types
import {
    Education as EducationType,
    Experience as ExperienceType,
    SharedData,
    Stack as StacksType,
    Tool as ToolsType,
} from '@/types';

// Translation
import { useTrans } from '@/lib/translation';
interface AboutProps {
    appear: boolean;
    stacks: StacksType[];
    tools: ToolsType[];
    educations: EducationType[];
    experiences: ExperienceType[];
}

export default function About({
    appear,
    stacks,
    tools,
    educations,
    experiences,
}: AboutProps) {
    return (
        <section
            className={cn(
                // Default styles
                'mt-48 flex scroll-mt-24 flex-col',

                // Responsive styles
                'gap-0 md:gap-12 lg:gap-36',
                'mt-36 lg:mt-48',
                'mb-36 lg:mb-48',
            )}
            id="about"
        >
            {/* Panels */}
            <Panels appear={appear} />

            {/* Accordion */}
            <Accordions
                appear={appear}
                stacks={stacks}
                tools={tools}
                educations={educations}
                experiences={experiences}
            />
        </section>
    );
}

// -------------------------
// Panels
// -------------------------

interface PanelsProps {
    appear: boolean;
}

function Panels({ appear }: PanelsProps) {
    const __ = useTrans();

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
                    'w-full lg:w-max lg:max-w-[40%]',

                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-8 sm:py-6 md:py-8 lg:py-10',

                    'before:h-36 lg:before:h-48',

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
                    <FadeIn show={appear} delay={0} className="w-full">
                        <h2
                            className={cn(
                                // Default styles
                                'font-medium transition-all',

                                'text-4xl sm:text-7xl',
                            )}
                        >
                            {__('landing.landing.about.h2', 'About me')}
                        </h2>
                    </FadeIn>

                    <FadeIn className="w-auto" show={appear} delay={250}>
                        <UnderlineLink
                            aria_label={__(
                                'landing.seo.scroll_to_section',
                                'Scroll to :section section',
                                { section: 'projects' },
                            )}
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
                            {__('landing.landing.about.skip', 'Skip')}
                            <ArrowDownRight
                                size={32}
                                className="stroke-1 transition-all group-hover:rotate-45 group-focus-visible:rotate-45"
                            />
                        </UnderlineLink>
                    </FadeIn>
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
                    'w-full lg:w-max lg:max-w-[50%]',
                )}
            >
                {/* Reveal */}
                <TextReveal
                    text_className="!text-lg sm:!text-xl lg:!text-2xl"
                    className="hidden h-[200vh] sm:h-[120vh] lg:block lg:h-[200vh]"
                >
                    <strong className="font-semibold">
                        {__('landing.landing.about.p_1', 'Hi, I’m Hakim.')}
                    </strong>
                    <br />
                    <p className="font-normal">
                        <strong className="font-semibold">
                            {__(
                                'landing.landing.about.p_2',
                                "I'm a french fullstack engineer",
                            )}
                        </strong>{' '}
                        {__(
                            'landing.landing.about.p_3',
                            'with a strong focus on development, infrastructure, and automation. I build and manage scalable projects, ensuring smooth deployments and efficient workflows.',
                        )}
                    </p>
                    <br />
                    <p className="font-normal">
                        {__(
                            'landing.landing.about.p_4',
                            'With a hands-on approach, I handle everything from backend logic to server administration, always paying attention to design and usability. I strive to create solutions that are both',
                        )}{' '}
                        <strong className="font-semibold">
                            {__(
                                'landing.landing.about.p_5',
                                'functional and visually refined.',
                            )}
                        </strong>
                    </p>
                </TextReveal>

                {/* Reveal */}
                <FadeIn className="w-full lg:hidden" delay={500} show={appear}>
                    <p>
                        <strong className="font-semibold">
                            {__('landing.landing.about.p_1', 'Hi, I’m Hakim.')}
                        </strong>
                    </p>
                    <br />
                    <p className="font-light">
                        <strong className="font-semibold">
                            {__(
                                'landing.landing.about.p_2',
                                "I'm a french fullstack engineer",
                            )}
                        </strong>{' '}
                        {__(
                            'landing.landing.about.p_3',
                            'with a strong focus on development, infrastructure, and automation. I build and manage scalable projects, ensuring smooth deployments and efficient workflows.',
                        )}
                    </p>
                    <br />
                    <p className="font-normal">
                        {__(
                            'landing.landing.about.p_4',
                            'With a hands-on approach, I handle everything from backend logic to server administration, always paying attention to design and usability. I strive to create solutions that are both',
                        )}{' '}
                        <strong className="font-semibold">
                            {__(
                                'landing.landing.about.p_5',
                                'functional and visually refined.',
                            )}
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

function Accordions({
    appear,
    stacks,
    tools,
    educations,
    experiences,
}: AboutProps) {
    const [selectedTab, setSelectedTab] = React.useState<number>(1);
    const masterDetailRef = React.useRef<HTMLDivElement>(null);
    const __ = useTrans();

    const handleSelectTab = (id: number) => {
        if (id === selectedTab) return;
        setSelectedTab(id);
        masterDetailRef.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const tabs = [
        {
            id: 1,
            number: '01',
            title: __(
                'landing.landing.about.tabs.about.title',
                'À propos de moi',
            ),
        },
        {
            id: 2,
            number: '02',
            title: __(
                'landing.landing.about.tabs.experience.title',
                'Expérience professionnelle',
            ),
        },
        {
            id: 3,
            number: '03',
            title: __(
                'landing.landing.about.tabs.education.title',
                'Formation & Diplômes',
            ),
        },
        {
            id: 4,
            number: '04',
            title: __(
                'landing.landing.about.tabs.tech_stack.title',
                'Stack Technologique',
            ),
        },
        {
            id: 5,
            number: '05',
            title: __(
                'landing.landing.about.tabs.tools.title',
                'Outils & Logiciels',
            ),
        },
    ];

    const renderTabContent = (id: number) => {
        switch (id) {
            case 1:
                return <TabAboutContent />;
            case 2:
                return <TabWorkContent experiences={experiences} />;
            case 3:
                return <TabSchoolContent educations={educations} />;
            case 4:
                return <TabTechStackContent stacks={stacks} />;
            case 5:
                return <TabToolsContent tools={tools} />;
            default:
                return null;
        }
    };

    return (
        <FadeIn className="w-full" delay={150} show={appear ?? false}>
            <div
                className={cn(
                    // Default styles
                    'w-full border-t border-b border-dashed border-border',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                )}
            >
                <Delimiter
                    className="w-full"
                    dashedBorders={['right', 'left']}
                    plusCorners={['all']}
                >
                    {/* Desktop Master-Detail (md:flex) */}
                    <div
                        ref={masterDetailRef}
                        className="hidden w-full scroll-mt-24 items-start bg-background md:flex lg:scroll-mt-28"
                    >
                        {/* Left Column - Navigation List */}
                        <div className="w-full shrink-0 self-stretch border-r border-border bg-background md:w-[320px] lg:w-[360px] xl:w-[380px]">
                            <div className="sticky top-24 lg:top-28">
                                <div className="flex flex-col divide-y divide-border border-t border-b border-border bg-card">
                                    {tabs.map((tab) => {
                                        const isSelected =
                                            selectedTab === tab.id;
                                        return (
                                            <button
                                                key={tab.id}
                                                type="button"
                                                onClick={() =>
                                                    handleSelectTab(tab.id)
                                                }
                                                className={cn(
                                                    'group relative flex w-full cursor-pointer items-center gap-4 px-6 py-5.5 text-left transition-colors duration-200',
                                                    'outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none',
                                                    isSelected
                                                        ? 'bg-primary text-primary-foreground focus-visible:bg-primary'
                                                        : 'bg-card text-foreground hover:bg-muted/40 focus-visible:bg-muted/40',
                                                )}
                                            >
                                                <span
                                                    className={cn(
                                                        'text-xl font-semibold tracking-tight transition-colors lg:text-2xl',
                                                        isSelected
                                                            ? 'text-primary-foreground'
                                                            : 'text-muted-foreground group-hover:text-foreground',
                                                    )}
                                                >
                                                    {tab.number}
                                                </span>
                                                <span className="truncate text-base font-light tracking-tight lg:text-lg">
                                                    {tab.title}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Detail Wrapper */}
                        <div className="flex min-w-0 flex-1 flex-col bg-background p-6 sm:p-8 lg:p-10 xl:p-12">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={selectedTab}
                                    initial={{ opacity: 0, scale: 0.98, y: 8 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.98, y: -8 }}
                                    transition={{
                                        duration: 0.2,
                                        ease: [0.22, 1, 0.36, 1],
                                    }}
                                    className="w-full flex-1"
                                >
                                    {renderTabContent(selectedTab)}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Accordion (< md) */}
                    <div className="flex flex-col divide-y divide-border md:hidden">
                        {tabs.map((tab) => {
                            const isSelected = selectedTab === tab.id;
                            return (
                                <div key={tab.id} className="flex flex-col">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedTab(
                                                isSelected ? 0 : tab.id,
                                            )
                                        }
                                        className={cn(
                                            'relative flex w-full cursor-pointer items-center justify-between px-6 py-5 text-left transition-colors duration-200',
                                            'outline-none focus-visible:z-20 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background focus-visible:outline-none',
                                            isSelected
                                                ? 'bg-primary text-primary-foreground focus-visible:bg-primary'
                                                : 'bg-card text-foreground hover:bg-muted/40 focus-visible:bg-muted/40',
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <span
                                                className={cn(
                                                    'text-lg font-semibold',
                                                    isSelected
                                                        ? 'text-primary-foreground'
                                                        : 'text-muted-foreground',
                                                )}
                                            >
                                                {tab.number}
                                            </span>
                                            <span className="text-base font-light">
                                                {tab.title}
                                            </span>
                                        </div>
                                        <ArrowDownRight
                                            className={cn(
                                                'h-5 w-5 stroke-1 transition-transform duration-300',
                                                isSelected
                                                    ? 'rotate-90 text-primary-foreground'
                                                    : 'text-muted-foreground',
                                            )}
                                        />
                                    </button>
                                    {isSelected && (
                                        <div className="border-t border-border bg-background p-5 transition-all duration-300">
                                            {renderTabContent(tab.id)}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </Delimiter>
            </div>
        </FadeIn>
    );
}

// -------------------------
// Tab 1: About Content
// -------------------------

function TabAboutContent() {
    const __ = useTrans();
    const { avatar_url, resume_url } = usePage<SharedData>().props;

    const principles = [
        {
            num: __('landing.landing.about.tabs.about.principles.p1_num', '01'),
            title: __(
                'landing.landing.about.tabs.about.principles.p1_title',
                'Rigueur de conception',
            ),
            desc: __(
                'landing.landing.about.tabs.about.principles.p1_desc',
                'Typage strict de bout en bout, suites de tests automatisées et architecture modulaire.',
            ),
        },
        {
            num: __('landing.landing.about.tabs.about.principles.p2_num', '02'),
            title: __(
                'landing.landing.about.tabs.about.principles.p2_title',
                'Sobriété & Vitesse',
            ),
            desc: __(
                'landing.landing.about.tabs.about.principles.p2_desc',
                'Dépendances maîtrisées, bundles optimisés et conformité stricte aux standards web.',
            ),
        },
        {
            num: __('landing.landing.about.tabs.about.principles.p3_num', '03'),
            title: __(
                'landing.landing.about.tabs.about.principles.p3_title',
                'Transparence totale',
            ),
            desc: __(
                'landing.landing.about.tabs.about.principles.p3_desc',
                'Communication directe, cadrage réaliste des engagements et suivi continu sans promesses creuses.',
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-10 sm:gap-12">
            {/* Header / Intro block: Statement & Photo */}
            <div className="flex flex-col-reverse items-start justify-between gap-8 border-b border-border pb-8 sm:pb-10 lg:flex-row lg:gap-12">
                {/* Statement & Action */}
                <div className="flex flex-1 flex-col gap-6">
                    {/* Profile Tags */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <span className="inline-flex items-center border border-border bg-card px-3 py-1.5 text-xs font-normal text-foreground">
                            {__(
                                'landing.landing.about.tabs.about.specs.location_val',
                                'Lille',
                            )}
                        </span>

                        <span className="inline-flex items-center border border-border bg-card px-3 py-1.5 text-xs font-normal text-foreground">
                            {__(
                                'landing.landing.about.tabs.about.specs.status_val',
                                'Ingénieur Logiciel & Indépendant',
                            )}
                        </span>
                    </div>

                    <h3 className="text-2xl leading-[1.25] font-light tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                        {__(
                            'landing.landing.about.tabs.about.statement',
                            'Bâtir des architectures logicielles pérennes, où la clarté et la rigueur priment sur la complexité inutile.',
                        )}
                    </h3>

                    {resume_url && (
                        <div className="pt-2">
                            <Magnet
                                magnetStrength={3}
                                padding={20}
                                wrapperClassName="inline-block"
                            >
                                <a
                                    href={resume_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={__(
                                        'landing.seo.download_resume',
                                        'Télécharger mon CV',
                                    )}
                                    className="group relative inline-flex items-center gap-3 overflow-hidden border border-border bg-card px-5 py-3 text-xs font-medium tracking-wide text-foreground transition-all duration-300 hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:text-sm"
                                >
                                    <span className="relative z-10">
                                        {__(
                                            'landing.landing.about.tabs.about.button',
                                            'Consulter mon CV complet',
                                        )}
                                    </span>
                                    <div className="relative z-10 size-4 shrink-0 overflow-hidden">
                                        <Download
                                            className={cn(
                                                'size-4 shrink-0 stroke-[1.5]',
                                                'transition-all duration-600 ease-out',
                                                'group-hover:-translate-y-full group-hover:opacity-0',
                                                'group-focus-visible:-translate-y-full group-focus-visible:opacity-0',
                                            )}
                                        />
                                        <Download
                                            aria-hidden="true"
                                            className={cn(
                                                'absolute inset-0 size-4 shrink-0 stroke-[1.5] text-primary-foreground',
                                                'translate-y-full opacity-0',
                                                'transition-all duration-600 ease-out',
                                                'group-hover:translate-y-0 group-hover:opacity-100',
                                                'group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
                                            )}
                                        />
                                    </div>
                                    <div className="absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-700 group-focus-visible:w-[120%]" />
                                </a>
                            </Magnet>
                        </div>
                    )}
                </div>

                {/* Photo Portrait */}
                {avatar_url && (
                    <div className="aspect-4/5 w-36 shrink-0 overflow-hidden border border-border bg-card sm:w-44 lg:w-48">
                        <img
                            src={avatar_url}
                            alt={__(
                                'landing.landing.about.tabs.about.photo_alt',
                                'Photo de Hakim Fidjel',
                            )}
                            className="h-full w-full object-cover contrast-105 grayscale transition-all duration-700 hover:grayscale-0"
                        />
                    </div>
                )}
            </div>

            {/* Narrative Story (2 wide columns in full breathing room) */}
            <div className="grid grid-cols-1 gap-8 border-b border-border pb-8 sm:pb-10 md:grid-cols-2 lg:gap-12">
                <div className="flex flex-col gap-3">
                    <h4 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                        Approche de bout en bout
                    </h4>
                    <p className="text-sm leading-relaxed font-light text-foreground/80 sm:text-base">
                        {__(
                            'landing.landing.about.tabs.about.bio_1',
                            "Ingénieur logiciel en poste et développeur indépendant, je conçois des systèmes web complets avec une vision de bout en bout. De la modélisation des données et la conteneurisation jusqu'au raffinement ergonomique de l'interface, chaque décision technique répond à un impératif de fiabilité et d'efficacité mesurable.",
                        )}
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <h4 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                        Artisanat & pragmatisme
                    </h4>
                    <p className="text-sm leading-relaxed font-light text-foreground/80 sm:text-base">
                        {__(
                            'landing.landing.about.tabs.about.bio_2',
                            "Mon travail s'articule autour du pragmatisme : rejeter la sur-ingénierie, privilégier un code typé, testé et documenté, et livrer des applications immédiatement maintenables par n'importe quelle équipe technique sans accumuler de dette invisible.",
                        )}
                    </p>
                </div>
            </div>

            {/* Engineering Principles (Clean typographic 3-column layout) */}
            <div className="flex flex-col gap-6 pt-2">
                <h4 className="text-base font-medium tracking-tight text-foreground sm:text-lg">
                    {__(
                        'landing.landing.about.tabs.about.principles.label',
                        "Principes d'ingénierie",
                    )}
                </h4>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-10">
                    {principles.map((principle, i) => (
                        <div key={i} className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-semibold tracking-wider text-muted-foreground">
                                    {principle.num}
                                </span>
                                <span className="h-px flex-1 bg-border/60" />
                            </div>
                            <h5 className="text-base font-medium tracking-tight text-foreground">
                                {principle.title}
                            </h5>
                            <p className="text-sm leading-relaxed font-light text-muted-foreground">
                                {principle.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// -------------------------
// Tab 2: Work Content
// -------------------------

function TabWorkContent({ experiences }: { experiences: ExperienceType[] }) {
    const __ = useTrans();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-border pb-8">
                <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {__(
                        'landing.landing.about.tabs.experience.title',
                        'Expérience professionnelle',
                    )}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
                    {__(
                        'landing.landing.about.tabs.experience.description',
                        "Des environnements variés allant de l'ingénierie logicielle avancée aux projets web sur mesure, forgeant rigueur opérationnelle et sens du produit.",
                    )}
                </p>
            </div>
            <ul className="flex flex-col gap-10 pt-2 sm:gap-12">
                {experiences.map((exp, idx) => (
                    <li
                        key={`experience-${idx}`}
                        className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"
                    >
                        <div className="flex shrink-0 flex-col gap-1 sm:w-[30%]">
                            <h4 className="text-lg font-medium text-foreground">
                                {exp.company}
                            </h4>
                            <p className="text-sm font-normal text-foreground/90">
                                {exp.job}
                            </p>
                            <div className="mt-2 flex flex-col gap-0.5 text-xs font-light text-muted-foreground">
                                <span>{exp.status}</span>
                                <span>{exp.duration}</span>
                            </div>
                        </div>
                        <p className="text-sm leading-relaxed font-light text-foreground/80 sm:w-[65%] sm:text-base">
                            {exp.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// -------------------------
// Tab 3: School Content
// -------------------------

function TabSchoolContent({ educations }: { educations: EducationType[] }) {
    const __ = useTrans();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-border pb-8">
                <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {__(
                        'landing.landing.about.tabs.education.title',
                        'Formation & Diplômes',
                    )}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
                    {__(
                        'landing.landing.about.tabs.education.description',
                        "Un cursus d'ingénieur rigoureux complété par des certifications internationales, forgeant une approche analytique et pragmatique de la résolution de problèmes.",
                    )}
                </p>
            </div>
            <ul className="flex flex-col gap-10 pt-2 sm:gap-12">
                {educations.map((edu, idx) => (
                    <li
                        key={`school-${idx}`}
                        className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"
                    >
                        <div className="flex shrink-0 flex-col gap-1 sm:w-[30%]">
                            <h4 className="text-lg font-medium text-foreground">
                                {edu.institution}
                            </h4>
                            <p className="text-sm font-normal text-foreground/90">
                                {edu.type}
                            </p>
                            <span className="mt-2 text-xs font-light text-muted-foreground">
                                {edu.duration}
                            </span>
                        </div>
                        <p className="text-sm leading-relaxed font-light text-foreground/80 sm:w-[65%] sm:text-base">
                            {edu.description}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// -------------------------
// Tab 4: Tech Stack Content
// -------------------------

function TabTechStackContent({ stacks }: { stacks: StacksType[] }) {
    const __ = useTrans();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-border pb-8">
                <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {__(
                        'landing.landing.about.tabs.tech_stack.title',
                        'Stack Technologique',
                    )}
                </h3>
            </div>
            <ul className="flex flex-col gap-8 pt-2 sm:gap-9">
                {stacks
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((s, idx) => (
                        <li
                            key={`stack-${idx}`}
                            className="flex flex-col items-start justify-between gap-6 sm:flex-row"
                        >
                            <div className="shrink-0 pt-1 sm:w-[28%]">
                                <h4 className="text-base font-medium text-foreground sm:text-lg">
                                    {s.name}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2.5 sm:w-[68%]">
                                {s.items
                                    .sort((a, b) => a.sort_order - b.sort_order)
                                    .map((item, itemIdx) => (
                                        <span
                                            key={`item-${itemIdx}`}
                                            className="border border-border bg-card/60 px-3.5 py-1.5 text-xs font-light text-foreground sm:text-sm"
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}

// -------------------------
// Tab 5: Tools Content
// -------------------------

function TabToolsContent({ tools }: { tools: ToolsType[] }) {
    const __ = useTrans();

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3 border-b border-border pb-8">
                <h3 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                    {__(
                        'landing.landing.about.tabs.tools.title',
                        'Outils & Logiciels',
                    )}
                </h3>
            </div>
            <ul className="flex flex-col gap-8 pt-2 sm:gap-9">
                {tools
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map((t, idx) => (
                        <li
                            key={`tool-${idx}`}
                            className="flex flex-col items-start justify-between gap-6 sm:flex-row"
                        >
                            <div className="shrink-0 pt-1 sm:w-[28%]">
                                <h4 className="text-base font-medium text-foreground sm:text-lg">
                                    {t.name}
                                </h4>
                            </div>
                            <div className="flex flex-wrap gap-2.5 sm:w-[68%]">
                                {t.items
                                    .sort((a, b) => a.sort_order - b.sort_order)
                                    .map((item, itemIdx) => (
                                        <span
                                            key={`tool-item-${itemIdx}`}
                                            className="border border-border bg-card/60 px-3.5 py-1.5 text-xs font-light text-foreground sm:text-sm"
                                        >
                                            {item.name}
                                        </span>
                                    ))}
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
}
