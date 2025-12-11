// resources/js/components/landing/scroll-top-button.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

// Components
import RoundedButton from '@/components/landing/rounded-button';
import Magnet from '@/components/ui/magnet';

// Icons
import { ArrowUp } from 'lucide-react';

interface ScrollTopButtonProps {
    appear: boolean;
}

export default function ScrollTopButton({ appear }: ScrollTopButtonProps) {
    const [isVisible, setIsVisible] = React.useState(false);

    const [scrollY, setScrollY] = React.useState(0);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);

            if (scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrollY]);

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
                <a href="#top" tabIndex={-1}>
                    <RoundedButton className='bg-background'>
                        <ArrowUp className="stroke-1" />
                    </RoundedButton>
                </a>
            </Magnet>
        </div>
    );
}
