// Necessary imports
import { cn } from '@/lib/utils';
import { useInView } from 'motion/react';
import React, { useEffect, useState } from 'react';

interface CurtainProps {
    showCurtain: boolean;
    children: React.ReactNode;
    className?: string;
    background?: string;
    delay?: number;
}

export default function Curtain({
    showCurtain,
    children,
    className,
    background,
    delay = 0,
}: CurtainProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.1, once: true });
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);

    const show = !showCurtain;
    const isRevealing = isInView && show;

    useEffect(() => {
        if (isRevealing) {
            const timer = setTimeout(() => {
                setIsAnimationComplete(true);
            }, delay + 1500);

            return () => clearTimeout(timer);
        } else {
            setIsAnimationComplete(false);
        }
    }, [isRevealing, delay]);

    const bgClass =
        background === 'background'
            ? 'bg-background'
            : background === 'card'
              ? 'bg-card'
              : background === 'secondary'
                ? 'bg-secondary'
                : background
                  ? `bg-${background}`
                  : 'bg-card';

    return (
        <div
            ref={ref}
            className={cn(
                'relative',
                !isAnimationComplete
                    ? 'pointer-events-none overflow-hidden'
                    : 'pointer-events-auto overflow-visible',
                className,
            )}
        >
            <div
                className={cn(
                    'relative',
                    !isAnimationComplete && 'transition-all duration-1500',
                    isRevealing
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1/2 opacity-0',
                )}
                style={{ transitionDelay: isRevealing ? `${delay}ms` : '0ms' }}
            >
                {children}
            </div>

            <div
                className={cn(
                    'absolute inset-x-[-1px] transition-all duration-1500',
                    isRevealing ? 'top-0 bottom-full' : 'top-[-55%] bottom-0',
                    bgClass,
                    isAnimationComplete && 'hidden',
                )}
                style={{ transitionDelay: isRevealing ? `${delay}ms` : '0ms' }}
            />
        </div>
    );
}
