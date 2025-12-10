// resources/js/layouts/landing/footer.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Hooks
import { useAppearance } from '@/hooks/use-appearance';

// Components
import Curtain from '@/components/landing/curtain';
import Delimiter from '@/components/landing/delimiter';
import RoundedButton from '@/components/landing/rounded-button';
import FadeIn from '@/components/landing/fade-in';

// UI Components
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowDown, ArrowUp, Monitor, Moon, Sun } from 'lucide-react';

interface FooterProps {
    appear: boolean;
}

export default function Footer({ appear }: FooterProps) {
    const { appearance, updateAppearance } = useAppearance();

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
        <footer
            className={cn(
                // Default styles
                'bg-card',

                'border-t border-b border-dashed',

                'flex items-stretch justify-between',
            )}
        >
            {/* Left Panel */}
            <Delimiter
                dashedBorders={['left', 'right']}
                plusCorners={['all']}
                className={cn()
                // Default styles
                }
            >
                <div
                    className={cn(
                        // Default styles
                        'grid grid-cols-4 gap-4',

                        // Responsive styles
                        'px-6 sm:px-8 md:px-10 lg:px-12.5',
                        'py-4 sm:py-6 md:py-8 lg:py-10',
                    )}
                >
                    <div className={cn(
                        // Default styles
                        'flex flex-col gap-4 col-span-1',
                    )}>
                        <FadeIn
                            show={appear}
                            delay={250}
                        >
                            <Magnet magnetStrength={3} padding={20}>
                                <RoundedButton>
                                    <a href="#top" tabIndex={-1}>
                                        <ArrowUp className="stroke-1" />
                                    </a>
                                </RoundedButton>
                            </Magnet>
                        </FadeIn>
                        <FadeIn
                            show={appear}
                            delay={500}
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
                        </FadeIn>
                        <FadeIn
                            show={appear}
                            delay={750}
                        >
                            <Magnet magnetStrength={3} padding={20}>
                                <RoundedButton>EN</RoundedButton>
                            </Magnet>
                        </FadeIn>
                    </div>
                </div>
            </Delimiter>

            {/* Right Panel */}
            <div
                className={cn(
                    // Default styles
                    'flex w-full flex-col items-start align-bottom justify-end gap-2',

                    // Responsive styles
                    'px-6 sm:px-8 md:px-10 lg:px-12.5',
                    'py-4 sm:py-6 md:py-8 lg:py-10',
                )}
            >
                <p
                    className={cn(
                        // Default styles
                        'font-medium',

                        // Repsonsive styles
                        'text-base',
                        'translate-x-[5px]',
                    )}
                >
                    Designed, Developped, Deployed and Hosted by
                </p>
                <p
                    className={cn(
                        // Default styles
                        'font-semibold',

                        // Responsive styles
                        'text-7xl',
                    )}
                >
                    Hakim Fidjel.
                </p>
                <p
                    className={cn(
                        // Default styles
                        'text-muted-foreground',

                        // Responsive styles
                        'text-xs',
                        'translate-x-[5px]',
                    )}
                >
                    © {new Date().getFullYear()} Hakim Fidjel. All rights
                    reserved.
                </p>
            </div>
        </footer>
    );
}
