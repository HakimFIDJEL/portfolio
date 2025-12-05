// resources/js/components/landing/curtain.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

interface CurtainProps {
    showCurtain: boolean;
    children: React.ReactNode;
    className?: string;
    background?: string;
}

export function Curtain({
    showCurtain,
    children,
    className,
    background,
}: CurtainProps) {
    return (
        <div className={cn('relative', className)}>
            {children}
            <div
                className={cn(
                    'absolute top-[-50%] right-0 bottom-0 left-0 transition-all',
                    background ? `bg-${background}` : 'bg-card',
                    !showCurtain && 'top-0 bottom-full duration-1000',
                )}
            ></div>
        </div>
    );
}
