// resources/js/components/landing/scroll-top-button.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Components
import RoundedButton from '@/components/landing/rounded-button';
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUp } from 'lucide-react';

// Translation
import { useTrans } from '@/lib/translation';

interface ScrollTopButtonProps {
    appear: boolean;
}

export default function ScrollTopButton({ appear }: ScrollTopButtonProps) {
    const [isVisible, setIsVisible] = useState(false);
    const { url } = usePage();
    const __ = useTrans();

    useEffect(() => {
        const checkVisibility = () => {
            if (typeof window !== 'undefined') {
                setIsVisible(window.scrollY > 300);
            }
        };

        checkVisibility();

        window.addEventListener('scroll', checkVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', checkVisibility);
        };
    }, [url]);

    return (
        <div
            className={cn(
                // Default styles
                'pointer-events-none fixed bottom-8 z-10 mx-auto flex w-[90%] max-w-7xl justify-end',
            )}
        >
            <Magnet
                magnetStrength={3}
                padding={20}
                wrapperClassName={cn(
                    // Default styles
                    'pointer-events-none',
                    'translate-y-[50%] opacity-0 transition-all duration-500',
                    'rounded-full',

                    // Appearance
                    appear &&
                        isVisible &&
                        'pointer-events-auto translate-y-0 opacity-100 duration-1000',

                    // Responsive styles
                    'translate-x-[-25%] sm:translate-x-[50%] xl:translate-x-[125%] 2xl:translate-x-[200%]',
                )}
            >
                <RoundedButton
                    className="bg-background"
                    tabIndex={isVisible && appear ? 0 : -1}
                    aria_label={__(
                        'landing.seo.scroll_to_top',
                        'Scroll to top',
                    )}
                    onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                >
                    <ArrowUp className="stroke-1" />
                </RoundedButton>
            </Magnet>
        </div>
    );
}
