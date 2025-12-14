// resources/js/components/landing/carousel.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import * as React from 'react';

// UI Components
import { Card, CardContent } from '@/components/ui/card';
import {
    Carousel as UI_Carousel,
    CarouselContent as UI_CarouselContent,
    CarouselItem as UI_CarouselItem,
    CarouselNext as UI_CarouselNext,
    CarouselPrevious as UI_CarouselPrevious,
    useCarousel as useUI_Carousel,
} from '@/components/ui/carousel';

// Components
import RoundedButton from '@/components/landing/rounded-button';

// Types
import { Attachment } from '@/types';

// Icons
import { ArrowLeft, ArrowRight } from 'lucide-react';

// Translation
import { useTrans } from '@/lib/translation';

interface CarouselProps {
    attachments: Attachment[];
    show_navigation?: boolean;
    show_pagination?: boolean;
    className?: string;
}

export default function Carousel({
    attachments,
    show_navigation = true,
    show_pagination = true,
    className,
}: CarouselProps) {
    return (
        <UI_Carousel
            className={cn(
                // Default styles
                'relative mx-auto w-full',

                show_navigation && 'w-[calc(100%-6rem)]',
                show_pagination && 'pb-8',

                className,
            )}
        >
            <CarouselContent
                attachments={attachments}
                show_navigation={show_navigation}
                show_pagination={show_pagination}
            />
        </UI_Carousel>
    );
}

interface CarouselContentProps {
    attachments: Attachment[];
    show_navigation?: boolean;
    show_pagination?: boolean;
}

function CarouselContent({
    attachments,
    show_navigation = true,
    show_pagination = true,
}: CarouselContentProps) {
    const { scrollNext, scrollPrev } = useUI_Carousel();

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'ArrowLeft') {
                scrollPrev();
            } else if (event.key === 'ArrowRight') {
                scrollNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [scrollNext, scrollPrev]);

    return (
        <>
            <UI_CarouselContent>
                {attachments.map((item, index) => (
                    <UI_CarouselItem key={index}>
                        <div className="p-1">
                            <Card className='rounded-none shadow-none border'>
                                <CardContent className="flex aspect-[16/9] cursor-grab items-center justify-center p-6 rounded-none">
                                    {item.url ? (
                                        <img
                                            src={item.url}
                                            alt={item.file_name}
                                            className="max-h-full max-w-full object-contain"
                                        />
                                    ) : (
                                        <span className="text-xl">
                                            {item.file_name || 'No Preview'}
                                        </span>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </UI_CarouselItem>
                ))}
            </UI_CarouselContent>
            {show_navigation && <CarouselNavigation />}
            {show_pagination && <CarouselPagination />}
        </>
    );
}

function CarouselNavigation() {
    const { canScrollPrev, canScrollNext } = useUI_Carousel();
    const __ = useTrans();

    return (
        <>
            <UI_CarouselPrevious
                asChild
                variant={'ghost'}
                size={'icon-lg'}
                className={cn(!canScrollPrev && 'pointer-events-none')}
                tabIndex={canScrollPrev ? 0 : -1}
            >
                <RoundedButton disabled={!canScrollPrev} aria-label={__('landing.seo.carousel_previous', 'Go to previous slide')}>
                    <ArrowLeft />
                </RoundedButton>
            </UI_CarouselPrevious>
            <UI_CarouselNext
                asChild
                variant={'ghost'}
                size={'icon-lg'}
                className={cn(!canScrollNext && 'pointer-events-none')}
                tabIndex={canScrollNext ? 0 : -1}
            >
                <RoundedButton disabled={!canScrollNext} aria-label={__('landing.seo.carousel_next', 'Go to next slide')}>
                    <ArrowRight />
                </RoundedButton>
            </UI_CarouselNext>
        </>
    );
}

function CarouselPagination() {
    const { currentIndex, totalSlides, scrollTo } = useUI_Carousel();
    const __ = useTrans();

    return (
        <nav
            className={cn(
                // Default styles
                'absolute bottom-0 left-1/2 flex -translate-x-1/2 gap-2',
            )}
        >
            {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                        // Default styles
                        'h-4 cursor-pointer rounded-full border border-transparent transition-all',

                        // Hover & focus styles
                        'hover:border-primary',
                        'focus-visible:border-primary focus-visible:outline-none',

                        // Active & inactive styles
                        index === currentIndex
                            ? 'w-8 bg-primary duration-1000'
                            : 'w-4 bg-muted duration-1000 hover:bg-accent',
                    )}
                    aria-label={__(`landing.seo.carousel_pagination`, `Go to slide :slide_number`, { slide_number: index + 1 })}
                    aria-current={index === currentIndex ? 'true' : 'false'}
                ></button>
            ))}
        </nav>
    );
}
