// resources/js/components/landing/sections/contact.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import UnderlineLink from '@/components/landing/underline-link';
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUpRight } from 'lucide-react';

// Types
import { type Contact as ContactType } from '@/types';

// Translation & Icons
import { GetIcon } from '@/lib/render';
import { useTrans } from '@/lib/translation';

interface ContactProps {
    appear: boolean;
    contacts: ContactType[];
}

export default function Contact({ appear, contacts }: ContactProps) {
    const __ = useTrans();

    const sortedContacts = [...contacts].sort(
        (a, b) => a.sort_order - b.sort_order,
    );

    return (
        <section
            className={cn(
                // Default styles
                'flex scroll-mt-24 flex-col',
                'mt-0 sm:mt-36',
            )}
            id="contact"
        >
            {/* Borders */}
            <div className={cn('relative px-6')}>
                <div
                    className={cn(
                        'relative h-36 border-r border-l border-dashed sm:h-0',
                    )}
                ></div>
            </div>

            <div
                className={cn(
                    // Responsive styles
                    'px-6 sm:px-0',
                    'border-t border-b border-dashed sm:border-0',
                )}
            >
                {/* Title */}
                <Delimiter
                    dashedBorders={['all']}
                    plusCorners={['all']}
                    className={cn(
                        // Default styles
                        'flex justify-between',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-8 sm:py-6 md:py-8 lg:py-10',

                        'flex-col md:flex-row',
                        'items-start md:items-center',

                        'border-t-0 border-b-0 sm:border-t sm:border-b',

                        'gap-4 md:gap-0',
                    )}
                >
                    <FadeIn show={appear}>
                        <h2
                            className={cn(
                                'text-4xl font-medium transition-all sm:text-7xl',
                            )}
                        >
                            {__('landing.landing.contact.h2', 'Contact')}
                        </h2>
                    </FadeIn>

                    {/* Text */}
                    <div
                        className={cn(
                            'flex flex-col items-start gap-2 md:items-end',
                        )}
                    >
                        <FadeIn className="w-auto" show={appear} delay={250}>
                            <p>
                                {__(
                                    'landing.landing.contact.p_1',
                                    "Let's get in touch shall we ?",
                                )}
                            </p>
                        </FadeIn>
                        <FadeIn className="w-auto" show={appear} delay={250}>
                            <UnderlineLink
                                aria_label={__(
                                    'landing.seo.scroll_to_top',
                                    'Scroll to top of the page',
                                )}
                                showUnderline
                                href="#top"
                                className={cn(
                                    'group flex w-max items-center gap-2 font-normal md:translate-x-[8px]',
                                )}
                            >
                                {__(
                                    'landing.landing.contact.top',
                                    'Back to top',
                                )}
                                <ArrowUpRight
                                    size={32}
                                    className="stroke-1 transition-all group-hover:-rotate-45 group-focus-visible:-rotate-45"
                                />
                            </UnderlineLink>
                        </FadeIn>
                    </div>
                </Delimiter>
            </div>

            <div className="flex flex-col">
                {/* Subtitle */}
                <div
                    className={cn(
                        'flex-col items-start gap-6 px-6 sm:flex-row sm:items-center sm:gap-0 sm:px-8 md:px-10 lg:px-12.5',
                    )}
                >
                    <div
                        className={cn(
                            'flex min-h-32 w-full items-end justify-start border-r border-l border-dashed',
                            'px-4 py-4 sm:px-4 sm:py-4 md:px-6 md:py-6 lg:px-6 lg:py-6',
                        )}
                    >
                        <FadeIn className="w-auto" show={appear} delay={250}>
                            <p>
                                {__(
                                    'landing.landing.contact.p_2',
                                    "Reach out to talk projects, job offers, or even a good game. I'm quick to reply.",
                                )}
                            </p>
                        </FadeIn>
                    </div>
                </div>

                {/* Contact Directory */}
                <div
                    className={cn(
                        'border-t border-b border-dashed border-border',
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    )}
                >
                    <Delimiter
                        dashedBorders={['right', 'left']}
                        plusCorners={['all']}
                        className="w-full"
                    >
                        <div className="flex w-full min-w-0 flex-col gap-3 py-4 sm:gap-4 sm:py-6">
                            {sortedContacts.map((item, index) => (
                                <FadeIn
                                    key={item.id ?? index}
                                    show={appear}
                                    delay={index * 50}
                                    className="w-full"
                                >
                                    <Magnet
                                        magnetStrength={25}
                                        padding={0}
                                        wrapperClassName="w-full !block"
                                        innerClassName="w-full"
                                        style={{
                                            width: '100%',
                                            display: 'block',
                                        }}
                                    >
                                        <ContactRow item={item} />
                                    </Magnet>
                                </FadeIn>
                            ))}
                        </div>
                    </Delimiter>
                </div>

                {/* Borders */}
                <div className={cn('px-6 sm:px-8 md:px-10 lg:px-12.5')}>
                    <div
                        className={cn(
                            'h-32 w-full border-r border-l border-dashed',
                        )}
                    ></div>
                </div>
            </div>
        </section>
    );
}

interface ContactRowProps {
    item: ContactType;
}

function ContactRow({ item }: ContactRowProps) {
    const __ = useTrans();

    const isMail = item.link.startsWith('mailto:');
    const mailSubject = encodeURIComponent(
        __(
            'landing.landing.contact.mail_subject',
            'Prise de contact — Projet / Mission',
        ),
    );

    const href =
        isMail && !item.link.includes('?')
            ? `${item.link}?subject=${mailSubject}`
            : item.link;

    return (
        <a
            href={href}
            target={isMail ? undefined : '_blank'}
            rel={isMail ? undefined : 'noopener noreferrer'}
            className={cn(
                // Default styles
                'group relative flex w-full items-center justify-between gap-4 overflow-hidden border border-border bg-card px-5 py-4.5 sm:px-8 sm:py-5.5',
                'transition-all duration-500',

                // Focus & hover styles
                'hover:border-primary hover:!text-primary-foreground',
                'focus-visible:border-primary focus-visible:!text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary',
            )}
        >
            {/* Background animation like menu items */}
            <div
                className={cn(
                    'absolute inset-0 z-0 h-full w-0 bg-primary transition-all duration-500 [clip-path:polygon(0_0,100%_0,90%_100%,0_100%)] group-hover:w-[120%] group-hover:duration-1000 group-focus-visible:w-[120%] group-focus-visible:duration-1000',
                )}
            />

            {/* Left: Platform Icon & Label */}
            <div className="relative z-10 flex min-w-0 items-center gap-4 sm:gap-5">
                <GetIcon
                    icon={item.icon}
                    props={{
                        className:
                            'size-5 shrink-0 stroke-[1.5] text-muted-foreground transition-all duration-1000 group-hover:text-primary-foreground group-focus-visible:text-primary-foreground',
                    }}
                />
                <div className="flex min-w-0 flex-col sm:flex-row sm:items-baseline sm:gap-3">
                    <span className="truncate text-base font-medium tracking-tight text-foreground transition-all duration-1000 group-hover:text-primary-foreground group-focus-visible:text-primary-foreground sm:text-lg">
                        {item.label}
                    </span>
                    <span className="truncate text-xs font-normal text-muted-foreground transition-all duration-1000 group-hover:text-primary-foreground/80 group-focus-visible:text-primary-foreground/80 sm:hidden">
                        {item.name}
                    </span>
                </div>
            </div>

            {/* Right: Direct Handle/Target & Action Arrow */}
            <div className="relative z-10 flex shrink-0 items-center gap-3 sm:gap-6">
                <span className="hidden truncate text-sm font-normal text-muted-foreground transition-all duration-1000 group-hover:text-primary-foreground/90 group-focus-visible:text-primary-foreground/90 sm:inline md:text-base">
                    {item.name}
                </span>
                <div className="relative size-5 shrink-0 overflow-hidden">
                    {/* Primary arrow: exits upwards */}
                    <ArrowUpRight
                        className={cn(
                            'size-5 shrink-0 stroke-[1.5] text-muted-foreground',
                            'transition-all duration-600 ease-out',
                            'group-hover:-translate-y-full group-hover:opacity-0',
                            'group-focus-visible:-translate-y-full group-focus-visible:opacity-0',
                        )}
                    />
                    {/* Secondary arrow: enters from underneath to rest position */}
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
            </div>
        </a>
    );
}
