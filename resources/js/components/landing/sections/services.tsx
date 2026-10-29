// resources/js/components/landing/sections/services.tsx

import { cn } from '@/lib/utils';

// Components
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import UnderlineLink from '@/components/landing/underline-link';
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';

// Translation
import { useTrans } from '@/lib/translation';

interface ServicesProps {
    appear: boolean;
}

export default function Services({ appear }: ServicesProps) {
    const __ = useTrans();

    const services = [
        {
            number: '01',
            title: __(
                'landing.landing.services.items.fullstack.title',
                'Applications & Plateformes Web',
            ),
            description: __(
                'landing.landing.services.items.fullstack.description',
                "Conception et développement d'applications web complètes, rapides et sur-mesure. Des interfaces utilisateur soignées et réactives, soutenues par une architecture technique robuste, sécurisée et évolutive.",
            ),
            actionsLabel: __(
                'landing.landing.services.items.fullstack.actions_label',
                'Réalisations & livrables',
            ),
            actions: [
                __(
                    'landing.landing.services.items.fullstack.action_1',
                    'Applications web métiers, portails clients et dashboards interactifs',
                ),
                __(
                    'landing.landing.services.items.fullstack.action_2',
                    "Conception d'architectures backend sécurisées et intégration d'APIs",
                ),
                __(
                    'landing.landing.services.items.fullstack.action_3',
                    'Expérience utilisateur fluide, responsive sans compromis et accessible',
                ),
            ],
        },
        {
            number: '02',
            title: __(
                'landing.landing.services.items.devops.title',
                'Automatisation, CI/CD & Déploiement',
            ),
            description: __(
                'landing.landing.services.items.devops.description',
                'Fiabilisation de vos cycles de livraison et industrialisation de vos flux techniques. Mise en place de pipelines modernes pour livrer fréquemment, tester systématiquement et éliminer les erreurs manuelles en production.',
            ),
            actionsLabel: __(
                'landing.landing.services.items.devops.actions_label',
                'Réalisations & livrables',
            ),
            actions: [
                __(
                    'landing.landing.services.items.devops.action_1',
                    'Déploiements continus fiabilisés et environnements prêts pour la production',
                ),
                __(
                    'landing.landing.services.items.devops.action_2',
                    'Automatisation des suites de tests et des contrôles de qualité logicielle',
                ),
                __(
                    'landing.landing.services.items.devops.action_3',
                    "Conception de scripts d'automatisation sur-mesure et optimisation des workflows",
                ),
            ],
        },
        {
            number: '03',
            title: __(
                'landing.landing.services.items.audit.title',
                'Audit, Résolution & Conseil Technique',
            ),
            description: __(
                'landing.landing.services.items.audit.description',
                "Diagnostic ciblé, remise à niveau et optimisation de projets existants. Intervention réactive sur des blocages critiques, refactorisation de code complexe et accompagnement pragmatique sur vos choix d'architecture.",
            ),
            actionsLabel: __(
                'landing.landing.services.items.audit.actions_label',
                'Réalisations & livrables',
            ),
            actions: [
                __(
                    'landing.landing.services.items.audit.action_1',
                    "Diagnostic rapide et correction d'anomalies critiques en production",
                ),
                __(
                    'landing.landing.services.items.audit.action_2',
                    'Réduction de dette technique, modernisation de code et refactoring',
                ),
                __(
                    'landing.landing.services.items.audit.action_3',
                    'Optimisation des temps de chargement, audits de conformité et cadrage technique',
                ),
            ],
        },
    ];

    return (
        <section
            className={cn('flex w-full min-w-0 scroll-mt-24 flex-col', 'mb-0')}
            id="services"
        >
            {/* Header: Title & Skip to Projects */}
            <div className="w-full border-t border-b border-dashed border-border px-6 sm:px-0">
                <Delimiter
                    plusCorners={['all']}
                    dashedBorders={['left', 'right']}
                    className="w-full"
                >
                    <div className="flex flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center sm:gap-0 sm:px-8 sm:py-6 md:px-10 md:py-8 lg:px-12.5 lg:py-10">
                        <FadeIn
                            show={appear}
                            className="w-full min-w-0 sm:w-auto"
                        >
                            <h2
                                className={cn(
                                    'font-medium tracking-tight transition-all',
                                    'text-4xl sm:text-7xl',
                                )}
                            >
                                {__('landing.landing.services.h2', 'Services')}
                            </h2>
                        </FadeIn>

                        <FadeIn className="w-auto" show={appear} delay={250}>
                            <UnderlineLink
                                aria_label={__(
                                    'landing.seo.scroll_to_section',
                                    'Aller à la section :section',
                                    { section: 'projects' },
                                )}
                                href="#projects"
                                showUnderline
                                className="group flex w-max items-center gap-2 font-normal sm:translate-x-[8px]"
                            >
                                {__('landing.landing.services.skip', 'Passer')}
                                <ArrowDownRight
                                    size={32}
                                    className="stroke-1 transition-all group-hover:rotate-45 group-focus-visible:rotate-45"
                                />
                            </UnderlineLink>
                        </FadeIn>
                    </div>
                </Delimiter>
            </div>

            {/* Spacer: Header to Cards (matching contact.tsx column) */}
            <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12.5">
                <div className="h-16 w-full border-r border-l border-dashed border-border sm:h-20 lg:h-24" />
            </div>

            {/* Services Grid (parented identically to contact items) */}
            <div className="w-full border-t border-b border-dashed border-border px-6 sm:px-8 md:px-10 lg:px-12.5">
                <Delimiter
                    dashedBorders={['left', 'right']}
                    plusCorners={['all']}
                    className="w-full"
                >
                    <div className="grid w-full min-w-0 grid-cols-1 items-stretch divide-y divide-border bg-card lg:grid-cols-3 lg:divide-x lg:divide-y-0">
                        {services.map((service, index) => (
                            <FadeIn
                                key={service.number}
                                show={appear}
                                delay={index * 100}
                                className="h-full w-full min-w-0"
                            >
                                <div className="group relative flex h-full min-w-0 flex-col justify-between gap-6 bg-card p-6 transition-colors duration-300 hover:bg-muted/30 sm:p-8 lg:p-10">
                                    <div className="flex flex-col">
                                        {/* Top bar: Number */}
                                        <div className="flex items-center border-b border-border/70 pb-5">
                                            <span className="text-2xl font-light text-muted-foreground/70 transition-colors duration-300 group-hover:text-foreground sm:text-3xl">
                                                {service.number}
                                            </span>
                                        </div>

                                        {/* Service Title */}
                                        <h3 className="mt-6 text-xl font-medium tracking-tight text-foreground transition-colors duration-300 sm:text-2xl">
                                            {service.title}
                                        </h3>

                                        {/* Service Description */}
                                        <p className="mt-3 text-sm leading-relaxed font-light text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85 sm:text-base">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Concrete Actions List */}
                                    <div className="mt-auto border-t border-border/70 pt-5">
                                        <span className="mb-3 block text-xs font-medium tracking-wider text-foreground uppercase">
                                            {service.actionsLabel}
                                        </span>
                                        <ul className="flex flex-col gap-2.5">
                                            {service.actions.map(
                                                (action, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-2.5 text-xs text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85 sm:text-sm"
                                                    >
                                                        <span className="shrink-0 font-medium text-primary">
                                                            —
                                                        </span>
                                                        <span className="leading-snug">
                                                            {action}
                                                        </span>
                                                    </li>
                                                ),
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </Delimiter>
            </div>

            {/* Spacer: Cards to CTA (matching contact.tsx column) */}
            <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12.5">
                <div className="h-16 w-full border-r border-l border-dashed border-border sm:h-20 lg:h-24" />
            </div>

            {/* CTA Banner (parented identically to contact items) */}
            <div className="w-full border-t border-b border-dashed border-border px-6 sm:px-8 md:px-10 lg:px-12.5">
                <Delimiter
                    dashedBorders={['left', 'right']}
                    plusCorners={['all']}
                    className="w-full"
                >
                    <FadeIn show={appear} delay={300} className="w-full">
                        <div className="flex w-full flex-col gap-6 bg-card p-6 sm:p-8 md:p-10 lg:flex-row lg:items-center lg:justify-between">
                            <div className="max-w-2xl space-y-2">
                                <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">
                                    {__(
                                        'landing.landing.services.cta.title',
                                        'Un projet à concrétiser ou un défi technique à relever ?',
                                    )}
                                </h3>
                                <p className="text-sm leading-relaxed font-light text-muted-foreground sm:text-base">
                                    {__(
                                        'landing.landing.services.cta.description',
                                        "Échangeons sur vos objectifs pour définir ensemble le périmètre d'intervention le plus adapté à vos besoins et à vos délais.",
                                    )}
                                </p>
                            </div>

                            <div className="w-full shrink-0 sm:w-auto">
                                <Magnet
                                    magnetStrength={5}
                                    padding={10}
                                    wrapperClassName="w-full sm:w-auto !block sm:!inline-block"
                                    innerClassName="w-full sm:w-auto"
                                >
                                    <a
                                        href="#contact"
                                        className={cn(
                                            'group flex w-full items-center justify-center gap-3 sm:inline-flex sm:w-auto',
                                            'bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground',
                                            'transition-colors duration-300 hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                                        )}
                                    >
                                        {__(
                                            'landing.landing.services.cta.button',
                                            'Démarrer un projet',
                                        )}
                                        <div className="relative size-5 shrink-0 overflow-hidden">
                                            <ArrowUpRight
                                                className={cn(
                                                    'size-5 shrink-0 stroke-[1.5] text-primary-foreground',
                                                    'transition-all duration-600 ease-out',
                                                    'group-hover:-translate-y-full group-hover:opacity-0',
                                                    'group-focus-visible:-translate-y-full group-focus-visible:opacity-0',
                                                )}
                                            />
                                            <ArrowUpRight
                                                aria-hidden="true"
                                                className={cn(
                                                    'absolute inset-0 size-5 shrink-0 stroke-[1.5] text-primary-foreground',
                                                    'translate-y-full opacity-0',
                                                    'transition-all duration-600 ease-out',
                                                    'group-hover:translate-y-0 group-hover:opacity-100',
                                                    'group-focus-visible:translate-y-0 group-focus-visible:opacity-100',
                                                )}
                                            />
                                        </div>
                                    </a>
                                </Magnet>
                            </div>
                        </div>
                    </FadeIn>
                </Delimiter>
            </div>

            {/* Spacer: CTA to Projects (connects directly into Projects section) */}
            <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12.5">
                <div className="h-20 w-full border-r border-l border-dashed border-border sm:h-28 lg:h-36" />
            </div>
        </section>
    );
}
