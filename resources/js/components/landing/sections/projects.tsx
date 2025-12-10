// resources/js/components/landing/sections/projects.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Delimiter from '@/components/landing/delimiter';
import UnderlineLink from '@/components/landing/underline-link';

// Icons
import { ArrowDownRight } from 'lucide-react';

export default function Projects({ appear }: { appear: boolean }) {
    const projects = [
        {
            name: 'Vps Manager',
            href: '#',
        },
        {
            name: 'Vps Hosting & Deployment',
            href: '#',
        },
        {
            name: 'Portfolio',
            href: '#',
        },
        {
            name: 'jCoaching',
            href: '#',
        },
        {
            name: 'GC Trackr',
            href: '#',
        },
        {
            name: 'RSC Wasquehal',
            href: '#',
        },
    ];

    return (
        <section
            className={
                cn()
                // Default styles
            }
        >
            {/* Title */}
            <Delimiter>
                <h2
                    className={
                        cn()
                        // Default styles
                    }
                >
                    My Projects
                </h2>
            </Delimiter>

            <div
                className={
                    cn()
                    // Default styles
                }
            >
                {/* Subtitle */}
                <div
                    className={
                        cn()
                        // Default styles
                    }
                >
                    <p
                        className={
                            cn()
                            // Default styles
                        }
                    >
                        Take a loot at my projects. I've currently worked on{' '}
                        <strong className="font-semibold">
                            {projects.length}
                        </strong>{' '}
                        impactful ones.
                    </p>
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

                {/* Content */}
                <Delimiter
                    className={
                        cn()
                        // Default styles
                    }
                >
                    {projects.map((project, index) => (
                        <a
                            key={`projects-${index}`}
                            href={project.href}
                            tabIndex={appear ? 0 : -1}
                            className={
                                cn()
                                // Default styles
                            }
                        >
                            {project.name}
                        </a>
                    ))}
                </Delimiter>
            </div>
        </section>
    );
}
