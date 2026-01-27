// resources/js/components/projects/sections/content.tsx

import { cn } from '@/lib/utils';

// Components
import Carousel from '@/components/landing/carousel';
import Delimiter from '@/components/landing/delimiter';
import FadeIn from '@/components/landing/fade-in';

// Types
import { Project } from '@/types';

// Translation
import { useTrans } from '@/lib/translation';

// Icons
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Context
import { useLandingContext } from '@/contexts/use-landing-context';

interface ContentProps {
    project: Project;
    appear: boolean;

    previous_project: Project | null;
    next_project: Project | null;
}

export default function Content({ project, appear, previous_project, next_project }: ContentProps) {

    const __ = useTrans();
    const { _navigateToPage } = useLandingContext();

    function handleBackClick(
        e: React.MouseEvent<HTMLAnchorElement>,
    ) {
        e.preventDefault();
        _navigateToPage(route('home'), 'projects');
    }

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        slug: string,
    ) {
        e.preventDefault();
        _navigateToPage(route('project', slug), 'top');
    }

    return (
        <section
            className={cn(
                // Default styles
                'flex flex-col',
            )}
            id='content'
        >
            {/* Tech Stack */}
            {project.stack_items && project.stack_items.length > 0 && (
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
                                'border-border pb-4 sm:border-0 sm:pb-0',
                                'pt-4 sm:pt-0',
                                (!project.attachments && (project.description || project.feedback || project.what_i_learned)) && 'border-b',
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
                                    {__('landing.projects.sections.tech_stack', 'Tech Stack')}
                                </h4>
                            </div>
                            <div
                                className={cn(
                                    // Default styles
                                    'flex flex-wrap gap-2.5 sm:w-[65%]',
                                )}
                            >
                                {project.stack_items
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
                        )}
                    >
                        <h4
                            className={cn(
                                // Default styles
                                'font-medium',
                                'text-lg',
                            )}
                        >
                            {__('landing.projects.sections.attachments', 'Attachments')}
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

                        !project.attachments && 'pt-0',
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
                                    'border-border pb-4 sm:border-0 sm:pb-0',
                                    project.attachments && 'pt-4 sm:pt-0',
                                    (project.feedback || project.what_i_learned) ? 'border-b' : 'pb-6',
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
                                            'text-xl',
                                        )}
                                    >
                                        {__('landing.projects.sections.description', 'Description')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',

                                        '[&_ul]:space-y-4',
                                        '[&_strong]:font-medium [&_strong]:text-foreground',
                                        'text-foreground/70',
                                    )}

                                    dangerouslySetInnerHTML={{ __html: project.description }}
                                >
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
                                    'border-border pb-4 sm:border-0 sm:pb-0',
                                    (project.what_i_learned) && 'border-b',
                                    !project.description && 'pt-4 sm:pt-0',
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
                                            'text-xl',
                                        )}
                                    >
                                        {__('landing.projects.sections.feedback', 'Feedback')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',

                                        '[&_ul]:space-y-4',
                                        '[&_strong]:font-medium [&_strong]:text-foreground',
                                        'text-foreground/70',
                                    )}

                                    dangerouslySetInnerHTML={{ __html: project.feedback }}
                                >
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
                                    'pb-4 sm:pb-0',
                                    !project.feedback && !project.description && 'pt-4 sm:pt-0',
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
                                            'text-xl',
                                        )}
                                    >
                                        {__('landing.projects.sections.what_i_learned', 'What I Learned')}
                                    </h4>
                                </div>
                                <p
                                    className={cn(
                                        // Default styles
                                        'font-light',
                                        'text-base',
                                        'shrink-0 sm:w-[65%]',

                                        'flex flex-col gap-2',

                                        '[&_ul]:space-y-4',
                                        '[&_strong]:font-medium [&_strong]:text-foreground',
                                        'text-foreground/70',
                                    )}
                                    dangerouslySetInnerHTML={{ __html: project.what_i_learned }}
                                >
                                </p>
                            </div>
                        </FadeIn>
                    )}
                </Delimiter>
            )}

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

            {/* Navigation - If there is no previous or next project, replace the text by 'go back to projects' */}
            <Delimiter
                plusCorners={['all']}
                dashedBorders={['top', 'left', 'right']}
            >
                <FadeIn show={appear} className="w-full">
                    <div
                        className={cn(
                            // Default styles
                            'w-full',
                            'flex items-center justify-between ',

                            // Responsive styles
                            'flex-col sm:flex-row',
                            'divide-x-0 divide-y divide-dashed divide-border sm:divide-x sm:divide-y-0',
                        )}
                    >
                        {/* Arrow Left - Previous project */}
                        <NavCard 
                            text={previous_project ? previous_project.title : 'Go back to projects'} 
                            href={previous_project ? route('project', { slug: previous_project.slug }) : route('home')} 
                            onClick={!previous_project ? (e: React.MouseEvent<HTMLAnchorElement>) => handleBackClick(e) : (e: React.MouseEvent<HTMLAnchorElement>) => handleProjectClick(e, previous_project.slug)}
                            arrow="left" 
                        />

                        {/* Arrow Right - Next project */}
                        <NavCard 
                            text={next_project ? next_project.title : 'Go back to projects'} 
                            href={next_project ? route('project', { slug: next_project.slug }) : route('home')} 
                            onClick={!next_project ? (e: React.MouseEvent<HTMLAnchorElement>) => handleBackClick(e) : (e: React.MouseEvent<HTMLAnchorElement>) => handleProjectClick(e, next_project.slug)}
                            arrow="right" 
                        />
                    </div>
                </FadeIn>
            </Delimiter>
        </section>
    );
}


interface NavCardProps {
    text: string;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    arrow: 'left' | 'right';
}

function NavCard({ text, href, onClick, arrow }: NavCardProps) {
    return (
        <a 
            href={href}
            onClick={onClick}
            className={cn(
                // Default styles
                'flex items-center justify-center gap-2 w-full self-stretch flex-wrap',
                'bg-card transition-all cursor-pointer',
                'font-thin group',

                // Hover styles
                'hover:bg-primary hover:text-primary-foreground',

                // Focus styles
                'focus-visible:bg-primary focus-visible:text-primary-foreground focus-visible:outline-none',

                // Responsive styles
                'py-6 sm:py-8 px-4 sm:px-6',
            )}
        >
            
            {arrow === 'left' ? 
            (
                <>
                    <ArrowLeft className='stroke-1 h-6 w-6'/> 
                    <span className='text-center group-hover:ml-2 transition-all border-b border-transparent group-hover:border-primary-foreground group-focus-visible:border-primary-foreground group-focus-visible:ml-2'>
                        {text}
                    </span>
                </>
            ) : (
                <>
                    <span className='text-center group-hover:mr-2 transition-all border-b border-transparent group-hover:border-primary-foreground group-focus-visible:border-primary-foreground group-focus-visible:mr-2'>
                        {text}
                    </span>
                    <ArrowRight className='stroke-1 h-6 w-6'/>
                </>
            )}
        </a>
    )
}