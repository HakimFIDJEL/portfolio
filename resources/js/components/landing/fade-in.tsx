// resources/js/components/landing/fadeIn.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import React from 'react';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    show: boolean;
}

export default function FadeIn({
    children,
    className,
    delay = 0,
    show,
}: FadeInProps) {
    const ref = React.useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { amount: 0.1, once: true });

    return (
        <div ref={ref} className={cn('relative w-max', className)}>
            <motion.div
                initial={{ opacity: 0, translateY: 20 }}
                animate={
                    isInView && show
                        ? { opacity: 1, translateY: 0 }
                        : { opacity: 0, translateY: 20 }
                }
                transition={{
                    duration: 0.8,
                    delay: isInView && show ? delay / 1000 : 0,
                }}
                className="relative"
            >
                {children}
            </motion.div>
        </div>
    );
}
