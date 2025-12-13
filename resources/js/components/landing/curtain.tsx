// Necessary imports
import { cn } from '@/lib/utils';
import { useInView } from 'framer-motion';
import React from 'react';

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

    const show = !showCurtain;

    return (
        <div
            ref={ref}
            className={cn('relative', className)}
        >
            <div
                className={cn(
                    'relative transition-all duration-1500',
                    isInView && show ? 'translate-y-0 opacity-100' : '-translate-y-1/2 opacity-0',
                )}
                style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
            >
                {children}
            </div>

            <div
                className={cn(
                    'absolute inset-x-[-1px] transition-all duration-1500',
                    isInView && show
                        ? 'top-0 bottom-full'
                        : 'top-[-55%] bottom-0',
                    background ? `bg-${background}` : 'bg-card',
                )}
                style={{ transitionDelay: isInView ? `${delay}ms` : '0ms' }}
            />
        </div>
    );
}
