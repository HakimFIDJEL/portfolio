// resources/js/components/projects/sections/content.tsx

import { cn } from '@/lib/utils';

// Components
import Carousel from '@/components/landing/carousel';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';

// Types
import { Project } from '@/types';

interface ContentProps {
    project: Project;
    appear: boolean;
}

export default function Content({ project, appear }: ContentProps) {
    return (
        <section
            className={cn(
                // Default styles
                'flex flex-col',
            )}
        >
            {/* Tech Stack */}
            {project.stacks && project.stacks.length > 0 && (
                <Delimiter
                    dashedBorders={
                        project.attachments && project.attachments.length > 0 
                        ? ['all'] 
                        : ['top', 'left', 'right']
                    }
                    
                    plusCorners={project.attachments && project.attachments.length > 0 ? ['all'] : ['top-left', 'top-right']}

                    className={cn(
                        // Default styles
                        'w-full bg-card',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',
                    )}
                >
                    <FadeIn show={appear} className="w-full" delay={250}>
                        <div
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
                                    Tech Stack
                                </h4>
                            </div>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-wrap gap-2.5 sm:w-[65%]',
                                )}
                            >
                                {project.stacks
                                    .sort((a, b) => a.sort_order - b.sort_order)
                                    .map((tech, techIdx) => (
                                        <span
                                            key={`stack-${techIdx}`}
                                            className={cn(
                                                // Default styles
                                                'border border-primary px-2.5 py-1 font-light',
                                            )}
                                        >
                                            {tech.name}
                                        </span>
                                    ))}
                            </div>
                        </div>
                    </FadeIn>
                </Delimiter>
            )}

            {/* Attachments */}
            {project.attachments && project.attachments.length > 0 && (
                <FadeIn
                    show={appear}
                    delay={250}
                    className={cn(
                        // Default styles
                        'w-full',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',
                        'my-8',
                    )}
                >
                    <div
                        className={cn(
                            // Default styles
                            'flex flex-col items-start',

                            // Responsive styles
                            'gap-4',
                            'border-b border-border pb-4 sm:border-0 sm:pb-0',
                        )}
                    >
                        <h4
                            className={cn(
                                // Default styles
                                'font-medium',
                                'text-lg',
                            )}
                        >
                            Attachments
                        </h4>

                        <Carousel
                            attachments={project.attachments}
                            show_navigation={false}
                            show_pagination={true}
                        />
                    </div>
                </FadeIn>
            )}

            {(project.description || project.feedback || project.what_i_learned) && (
                <Delimiter
                    dashedBorders={
                        project.attachments && project.attachments.length > 0 
                        ? ['all'] 
                        : ['bottom', 'left', 'right']
                    }
                    
                    plusCorners={project.attachments && project.attachments.length > 0 ? ['all'] : ['bottom-left', 'bottom-right']}
                    className={cn(
                        // Default styles
                        'w-full bg-card',
                        'flex flex-col',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',

                        'gap-6 sm:gap-20',
                    )}
                >
                    {/* Description */}
                    {project.description && (
                        <FadeIn show={appear} className="w-full" delay={250}>
                            <div
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
                                        Description
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {project.description}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* Feedback */}
                    {project.feedback && (
                        <FadeIn show={appear} className="w-full" delay={250}>
                            <div
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
                                        Feedback
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {project.feedback}
                                </p>
                            </div>
                        </FadeIn>
                    )}

                    {/* What I Learned */}
                    {project.what_i_learned && (
                        <FadeIn show={appear} className="w-full" delay={250}>
                            <div
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
                                        What I Learned
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',
                                    )}
                                >
                                    {project.what_i_learned}
                                </p>
                            </div>
                        </FadeIn>
                    )}
                </Delimiter>
            )}
        </section>
    );
}
