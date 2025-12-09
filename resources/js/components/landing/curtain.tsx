// resources/js/components/landing/curtain.tsx

// Necessary imports
import { cn } from '@/lib/utils';
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
    if (!React.isValidElement(children)) {
        return children;
    }

    type ChildProps = {
        className?: string;
        style?: React.CSSProperties;
    };

    const child = children as React.ReactElement<ChildProps>;

    const animatedChild = React.cloneElement(child, {
        className: cn(
            child.props.className,
            'transition-all duration-500',
            'translate-y-[-50%]',
            !showCurtain && 'translate-y-0 duration-1000',
        ),
        style: {
            ...(child.props.style || {}),
            transitionDelay: `${delay}ms`,
        },
    });

    return (
        <div className={cn('relative w-max', className)}>
            {/* Contenu */}
            {animatedChild}

            {/* Rideau */}
            <div
                className={cn(
                    'absolute top-[-50%] right-0 bottom-0 left-0 transition-all',
                    background ? `bg-${background}` : 'bg-card',
                    !showCurtain && 'top-0 bottom-full duration-1500',
                )}
                style={{ transitionDelay: `${delay}ms` }}
            ></div>
        </div>
    );
}
