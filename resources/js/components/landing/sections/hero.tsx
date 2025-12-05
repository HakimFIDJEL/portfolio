// resources/js/components/landing/sections/Hero.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import CircularText from '@/components/landing/circular-text';
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';

// Icons
import { ArrowDown, Sun } from 'lucide-react';

export default function Hero() {
    return (
        <section className="flex h-[calc(100vh-73px)] flex-col justify-between lg:h-[calc(100vh-105px)]">
            <Delimiter
                dashedBorders={['top', 'bottom']}
                plusCorners={['bottom-left', 'bottom-right']}
                className="h-12"
            />

            <div
                className={cn(
                    // Default styles
                    'flex flex-col',

                    // Responsive styles
                    'items-start md:items-end',
                )}
            >
                <div
                    className={cn(
                        // Responsive styles
                        'px-8 lg:px-12.5',
                    )}
                >
                    <CircularText
                        text="Welcome to my portfolio ~ "
                        onHover={'slowDown'}
                        spinDuration={20}
                        className={cn(
                            // Default styles
                            'font-medium !text-primary',
                        )}
                        fontSize="text-xl"
                    />
                </div>

                {/* Title */}
                <div
                    className={cn(
                        // Default styles
                        'flex w-full justify-between gap-2',

                        // Responsive styles
                        'py-6 lg:py-8',
                        'px-8 lg:px-12.5',
                        'flex-col md:flex-row',
                        'items-start md:items-end',
                    )}
                >
                    <h1
                        className={cn(
                            // Default styles
                            '!leading-none font-medium',
                            'text-4xl sm:text-7xl md:text-[10vw]',
                            'whitespace-nowrap',
                        )}
                    >
                        Hakim Fidjel
                    </h1>
                    <h2
                        className={cn(
                            // Default styles
                            '!leading-none font-light',

                            // Responsive styles
                            'text-2xl sm:text-3xl md:text-[3vw]',
                            'text-left md:text-right',
                            'p-0 md:pb-3',
                        )}
                    >
                        Fullstack Engineer
                    </h2>
                </div>

                <Delimiter
                    dashedBorders={['top', 'bottom']}
                    plusCorners={['bottom-left', 'bottom-right']}
                    className={cn(
                        // Default styles
                        'flex items-center gap-5',

                        // Responsive styles
                        'px-8 lg:px-12.5',
                        'py-6',
                    )}
                >
                    <RoundedButton>
                        <ArrowDown className="stroke-1" />
                    </RoundedButton>
                    <RoundedButton>
                        <Sun className="stroke-1" />
                    </RoundedButton>
                    <RoundedButton>EN</RoundedButton>
                </Delimiter>
            </div>
        </section>
    );
}
