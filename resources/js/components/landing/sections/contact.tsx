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
import * as LucideIcon from 'lucide-react';
import type { LucideIcon as LucideIconType } from 'lucide-react';
import { ArrowUpRight } from 'lucide-react';

interface ContactItemData {
    icon: string;
    label: string;
    name: string;
    link: string;
}

const contactItems: ContactItemData[] = [
    {
        icon: 'mail',
        label: 'Email',
        name: 'hakimfidjel.pro@gmail.com',
        link: 'mailto:hakimfidjel.pro@gmail.com',
    },
    {
        icon: 'linkedin',
        label: 'LinkedIn',
        name: 'Hakim Fidjel',
        link: 'https://www.linkedin.com/in/hakim-fidjel/',
    },
    {
        icon: 'github',
        label: 'GitHub',
        name: 'HakimFIDJEL',
        link: 'https://github.com/HakimFIDJEL',
    },
    {
        icon: 'gitlab',
        label: 'GitLab',
        name: 'HakimFIDJEL',
        link: 'https://gitlab.com/HakimFIDJEL',
    },
];

interface ContactProps {
    appear: boolean;
}
export default function Contact({ appear }: ContactProps) {
    return (
        <section
            className={cn(
                // Default styles
                'flex flex-col',

                'mt-0 sm:mt-12 md:mt-24'
            )}
            id="contact"
        >
            {/* Title */}
            <Delimiter
                dashedBorders={['all']}
                plusCorners={['all']}
                className={cn(
                    // Default styles
                    'flex  justify-between',

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
                        Contact
                    </h2>
                </FadeIn>

                {/* Text */}
                <div
                    className={cn(
                        // Default styles
                        'flex flex-col',

                        'gap-2',

                        'items-start md:items-end'
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <p>Let's get in touch shall we ?</p>
                    </Curtain>
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <UnderlineLink
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
                            Back to top
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
                            className={
                                cn()

                                // Responsive styles
                            }
                        >
                            <p>
                                Reach out to talk projects, job offers, or even
                                a good game. I'm quick to reply.
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
                            'gap-4 sm:gap-4 md:gap-5 lg:gap-6',
                        )}
                    >
                        {contactItems.map((item, index) => (
                            <ContactItem key={index} item={item} />
                        ))}
                    </Delimiter>
                </div>
            </div>
        </section>
    );
}

interface ContactItemProps {
    item: ContactItemData;
}

function ContactItem({ item }: ContactItemProps) {
    // Fonction utilitaire pour convertir 'mail' en 'Mail'
    const toPascalCase = (str: string) =>
        str.charAt(0).toUpperCase() + str.slice(1);

    // Récupération de l'icône en utilisant le nom en PascalCase
    const iconName = toPascalCase(item.icon);
    
    // const IconComponent = (LucideIcon as any)[iconName];
    const IconComponent = LucideIcon[iconName as keyof typeof LucideIcon] as LucideIconType;

    // Vérification de sécurité au cas où l'icône n'existe pas
    if (!IconComponent) {
        console.error(`Icône Lucide introuvable pour: ${item.icon}`);
        return null;
    }

    return (
        <Magnet magnetStrength={25} padding={10}>
            <a
                className={cn(
                    // Default styles
                    'flex flex-col items-center justify-between',

                    'group border transition-all duration-500',

                    // Hover & Focus styles
                    'hover:border-primary hover:bg-primary hover:duration-1000',
                    'focus-visible:border-primary focus-visible:bg-primary focus-visible:duration-1000 focus-visible:outline-none',
                )}
                href={item.link}
                target="_blank"
            >
                {/* Header */}
                <div
                    className={cn(
                        // Default styles
                        'flex items-center justify-center gap-2 border-b bg-card',
                        'w-full p-4 transition-all duration-500',

                        // Hover & Focus styles
                        'group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:duration-1000',
                        'group-focus-visible:border-primary group-focus-visible:bg-primary group-focus-visible:text-primary-foreground group-focus-visible:duration-1000',
                    )}
                >
                    <IconComponent
                        className={cn(
                            // Default styles
                            'h-6 w-6 stroke-1 text-primary transition-all duration-500',

                            // Hover & Focus styles
                            'group-hover:text-primary-foreground group-hover:duration-1000',
                            'group-focus-visible:text-primary-foreground group-focus-visible:duration-1000',
                        )}
                    />
                    <span>{item.label}</span>
                </div>

                {/* Content */}
                <div
                    className={cn(
                        // Default styles
                        'flex items-center justify-center gap-2 bg-background',
                        'w-full p-4 underline transition-all duration-500',

                        // Hover & Focus styles
                        'group-hover:border-primary group-hover:bg-card group-hover:text-primary-foreground group-hover:duration-1000',
                        'group-focus-visible:border-primary group-focus-visible:bg-card group-focus-visible:text-primary-foreground group-focus-visible:duration-1000',
                    )}
                >
                    {item.name}
                </div>
            </a>
        </Magnet>
    );
}
