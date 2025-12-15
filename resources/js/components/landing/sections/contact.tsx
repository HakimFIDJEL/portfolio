// resources/js/components/landing/sections/contact.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';
import UnderlineLink from '@/components/landing/underline-link';
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUpRight } from 'lucide-react';

// Types
import { type Contact as ContactType } from '@/types';

// Translation
import { useTrans } from '@/lib/translation';
import { getIcon } from '@/lib/render';

interface ContactProps {
    appear: boolean;
    contacts: ContactType[];
}
export default function Contact({ appear, contacts }: ContactProps) {

    const __ = useTrans();

    return (
        <section
            className={cn(
                // Default styles
                'flex flex-col',

                'mt-24',
            )}
            id="contact"
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

                    'gap-4 md:gap-0',
                )}
            >
                <FadeIn show={appear}>
                    <h2
                        className={cn(
                            // Default styles
                            'font-medium transition-all',
                            'text-4xl sm:text-7xl',
                        )}
                    >
                        {__('landing.landing.contact.h2', 'Contact')}
                    </h2>
                </FadeIn>

                {/* Text */}
                <div
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        'gap-2',

                        'items-start md:items-end',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <p>
                            {__('landing.landing.contact.p_1', "Let's get in touch shall we ?")}
                        </p>
                    </Curtain>
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <UnderlineLink
                            aria_label={__('landing.seo.scroll_to_top', 'Scroll to top of the page')}
                            showUnderline
                            href="#top"
                            className={cn(
                                // Default styles
                                'group flex w-max items-center gap-2',

                                // Responsive styles
                                'font-normal',
                                'md:translate-x-[8px]',
                            )}
                        >
                            {__('landing.landing.contact.top', 'Back to top')}
                            <ArrowUpRight
                                size={32}
                                className="stroke-1 transition-all group-hover:-rotate-45 group-focus-visible:-rotate-45"
                            />
                        </UnderlineLink>
                    </Curtain>
                </div>
            </Delimiter>

            <div className="flex flex-col">
                {/* Subtitle */}
                <div
                    className={cn(
                        // Default styles

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',

                        'flex-col sm:flex-row',
                        'items-start sm:items-center',
                        'gap-6 sm:gap-0',
                    )}
                >
                    <div
                        className={cn(
                            // Default styles
                            'h-32 w-full border-r border-l border-dashed',
                            'flex items-end justify-start',

                            // Responsive styles
                            'py-4 sm:py-4 md:py-6 lg:py-6',
                            'px-4 sm:px-4 md:px-6 lg:px-6',
                        )}
                    >
                        <Curtain
                            showCurtain={!appear}
                            background="background"
                            delay={250}
                        >
                            <p>
                                {__('landing.landing.contact.p_2', "Reach out to talk projects, job offers, or even a good game. I'm quick to reply.")}
                            </p>
                        </Curtain>
                    </div>
                </div>

                {/* Contact items */}
                <div
                    className={cn(
                        'border-t border-b border-dashed',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    )}
                >
                    <Delimiter
                        dashedBorders={['right', 'left']}
                        plusCorners={['all']}
                        className={cn(
                            // Default styles
                            'grid grid-cols-1 md:grid-cols-2',

                            // Responsive styles
                            'gap-4 md:gap-8',
                        )}
                    >
                        {contacts
                            .sort((a, b) => a.sort_order - b.sort_order)
                            .map((item, index) => (
                                <FadeIn
                                    key={index}
                                    show={appear}
                                    delay={index * 100}
                                    className="w-full"
                                >
                                    <ContactItem item={item} />
                                </FadeIn>
                            ))}
                    </Delimiter>
                </div>

                {/* Borders */}
                <div
                    className={cn(
                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    )}
                >
                    <div
                        className={cn(
                            // Default styles
                            'h-32 w-full border-r border-l border-dashed',
                        )}
                    ></div>
                </div>
            </div>
        </section>
    );
}

interface ContactItemProps {
    item: ContactType;
}

function ContactItem({ item }: ContactItemProps) {
    const IconComponent = getIcon({ icon: item.icon, props: { className: 'h-6 w-6 stroke-2 text-primary transition-all duration-500 group-hover:text-primary-foreground group-focus-visible:text-primary-foreground' } });

    return (
        <Magnet magnetStrength={25} padding={10} wrapperClassName="w-full">
            <a
                className={cn(
                    'flex flex-col items-center justify-between',
                    'group border transition-all duration-500',
                    'hover:border-primary hover:bg-primary hover:duration-1000',
                    'focus-visible:border-primary focus-visible:bg-primary focus-visible:duration-1000 focus-visible:outline-none'
                )}
                href={item.link}
                target="_blank"
            >
                <div className={cn('flex items-center justify-center gap-2 border-b bg-card', 'w-full p-4 transition-all duration-500', 'group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:duration-1000', 'group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-primary-foreground group-focus-visible:duration-1000')}>
                    {IconComponent}
                    <span className="font-semibold">{item.label}</span>
                </div>

                <div className={cn('flex items-center justify-center gap-2 bg-background', 'w-full p-4 underline transition-all duration-500', 'group-hover:border-primary group-hover:bg-card group-hover:duration-1000', 'group-focus-visible:border-primary group-focus-visible:bg-card group-focus-visible:duration-1000')}>
                    {item.name}
                </div>
            </a>
        </Magnet>
    );
}