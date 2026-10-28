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
    onClosed?: () => void;
}

export default function Curtain({
    showCurtain,
    children,
    className,
    background,
    delay = 0,
    duration = 1500,
    closeDuration,
    onClosed,
}: CurtainProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.1, once: true });

    const contentRef = React.useRef<HTMLDivElement>(null);
    const curtainRef = React.useRef<HTMLDivElement>(null);
    const show = !showCurtain;
    const wasShown = React.useRef(show);

    React.useEffect(() => {
        const isClosing = wasShown.current && !show;
        wasShown.current = show;
        if (!isClosing || !onClosed || !isInView) return;

        let frameId: number;
        const checkCovered = () => {
            const content = contentRef.current?.getBoundingClientRect();
            const curtain = curtainRef.current?.getBoundingClientRect();
            if (content && curtain && curtain.bottom >= content.bottom) {
                onClosed();
                return;
            }
            frameId = requestAnimationFrame(checkCovered);
        };
        frameId = requestAnimationFrame(checkCovered);
        return () => cancelAnimationFrame(frameId);
    }, [show, onClosed, isInView]);
    const currentDuration =
        !show && closeDuration !== undefined ? closeDuration : duration;

    return (
        <div
            ref={ref}
            className={cn(
                'relative overflow-hidden transition-[clip-path]',
                className,
            )}
            style={{
                clipPath:
                    isInView && show ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                transitionDuration: `${currentDuration}ms`,
                transitionDelay: isInView ? `${delay}ms` : '0ms',
            }}
        >
            <div
                ref={contentRef}
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
                ref={curtainRef}
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
