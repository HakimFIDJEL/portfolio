// Necessary imports
import { cn } from '@/lib/utils';
import { useInView } from 'motion/react';
import React from 'react';

interface CurtainProps {
    showCurtain: boolean;
    children: React.ReactNode;
    className?: string;
    background?: string;
    delay?: number;
    duration?: number;
    closeDuration?: number;
}

export default function Curtain({
    showCurtain,
    children,
    className,
    background,
    delay = 0,
    duration = 1500,
    closeDuration,
}: CurtainProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.1, once: true });

    const show = !showCurtain;
    const currentDuration =
        !show && closeDuration !== undefined ? closeDuration : duration;

    return (
        <div
            ref={ref}
            className={cn('relative', className)}
            style={{ clipPath: 'inset(0 -100vmax -100vmax -100vmax)' }}
        >
            <div
                className={cn(
                    'relative transition-all',
                    isInView && show
                        ? 'translate-y-0 opacity-100'
                        : '-translate-y-1/2 opacity-0',
                )}
                style={{
                    transitionDuration: `${currentDuration}ms`,
                    transitionDelay: isInView ? `${delay}ms` : '0ms',
                }}
            >
                {children}
            </div>

            <div
                className={cn(
                    'absolute inset-x-[-1px] transition-all',
                    isInView && show
                        ? 'top-0 bottom-full'
                        : 'top-[-55%] bottom-0',
                    background ? `bg-${background}` : 'bg-card',
                )}
                style={{
                    transitionDuration: `${currentDuration}ms`,
                    transitionDelay: isInView ? `${delay}ms` : '0ms',
                }}
            />
        </div>
    );
}
