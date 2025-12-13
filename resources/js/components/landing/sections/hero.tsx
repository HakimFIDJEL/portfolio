// resources/js/components/landing/sections/Hero.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Hooks
import { useAppearance } from '@/hooks/use-appearance';
import { useTrans } from '@/lib/translation';

// Components
import CircularText from '@/components/landing/circular-text';
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';
import LanguageToggle from '@/components/landing/language-toggle';

// UI Components
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowDown, Monitor, Moon, Sun } from 'lucide-react';

interface HeroProps {
    appear?: boolean;
}

export default function Hero({ appear }: HeroProps) {
    const { appearance, updateAppearance } = useAppearance();
    const __ = useTrans();

    function handleSwitchAppearance() {
        const newAppearance =
            appearance === 'light'
                ? 'dark'
                : appearance === 'dark'
                  ? 'system'
                  : 'light';

        updateAppearance(newAppearance);
    }

    return (
        <section className="flex h-[calc(100vh-73px)] flex-col justify-between lg:h-[calc(100vh-105px)]" id='hero'>
            <Delimiter
                dashedBorders={['top', 'bottom']}
                plusCorners={['top-left', 'top-right']}
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
                        'px-4 sm:px-8 md:px-10 lg:px-12.5 overflow-hidden',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={250}
                    >
                        <CircularText
                            text={__('landing.landing.hero.circularText', "Welcome to my portfolio ~ ")}
                            onHover={'slowDown'}
                            spinDuration={20}
                            className={cn(
                                // Default styles
                                'font-medium !text-primary',
                            )}
                            fontSize="text-xl"
                        />
                    </Curtain>
                </div>

                {/* Title */}
                <div
                    className={cn(
                        // Default styles
                        'flex w-full justify-between',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',
                        'flex-col md:flex-row',
                        'items-start md:items-end',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={0}
                    >
                        <h1
                            className={cn(
                                // Default styles
                                '!leading-none font-medium',
                                'text-[2.65rem] sm:text-7xl md:text-[clamp(2rem,10vw,8.5rem)]',
                                'whitespace-nowrap',
                            )}
                        >
                            Hakim Fidjel
                        </h1>
                    </Curtain>

                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={0}
                    >
                        <h2
                            className={cn(
                                // Default styles
                                '!leading-none font-light',

                                // Responsive styles
                                'text-2xl sm:text-3xl md:text-[clamp(2rem,4vw,3.5rem)]',
                                'text-left md:text-right',
                                'ml-0 md:ml-2',
                                'p-0 sm:pb-1 md:pb-2 lg:pb-2.5 xl:pb-3',
                            )}
                        >
                            {__('landing.landing.hero.h2', 'Fullstack Engineer')}
                            
                        </h2>
                    </Curtain>
                </div>

                <Delimiter
                    dashedBorders={['top', 'bottom']}
                    plusCorners={['bottom-left', 'bottom-right']}
                    className={cn(
                        // Default styles
                        'flex items-center gap-5',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-5 md:py-6 lg:py-8',
                    )}
                >
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={500}
                    >
                        <Magnet magnetStrength={3} padding={20}>
                            <RoundedButton>
                                <a href="#about" tabIndex={-1}>
                                    <ArrowDown className="stroke-1" />
                                </a>
                            </RoundedButton>
                        </Magnet>
                    </Curtain>
                    <Curtain
                        showCurtain={!appear}
                        background="background"
                        delay={750}
                    >
                        <Magnet magnetStrength={3} padding={20}>
                            <RoundedButton onClick={handleSwitchAppearance}>
                                {appearance === 'dark' && (
                                    <Moon className="stroke-1" />
                                )}
                                {appearance === 'light' && (
                                    <Sun className="stroke-1" />
                                )}
                                {appearance === 'system' && (
                                    <Monitor className="stroke-1" />
                                )}
                            </RoundedButton>
                        </Magnet>
                    </Curtain>
                    <LanguageToggle appear={appear} delay={1000} />
                </Delimiter>
            </div>
        </section>
    );
}
