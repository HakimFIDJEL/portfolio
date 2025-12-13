// // resources/js/components/landing/curtain.tsx

// // Necessary imports
// import { cn } from '@/lib/utils';
// import React from 'react';

// interface CurtainProps {
//     showCurtain: boolean;
//     children: React.ReactNode;
//     className?: string;
//     background?: string;
//     delay?: number;
// }

// export default function Curtain({
//     showCurtain,
//     children,
//     className,
//     background,
//     delay = 0,
// }: CurtainProps) {

//     return (
//         <div className={cn('relative w-max', className)}>
//             {/* Contenu */}
//             <div
//                 className={cn(
//                     // Default styles
//                     'transition-all duration-500',
//                     'translate-y-[-50%]',
//                     !showCurtain && 'translate-y-0 duration-1000',
//                 )}
//                 style={{ transitionDelay: `${delay}ms` }}
//             >
//                 {children}
//             </div>

//             {/* Rideau */}
//             <div
//                 className={cn(
//                     'absolute top-[-50%] right-[-1px] bottom-0 left-[-1px] transition-all',
//                     background ? `bg-${background}` : 'bg-card',
//                     !showCurtain && 'top-0 bottom-full duration-1500',
//                 )}
//                 style={{ transitionDelay: `${delay}ms` }}
//             ></div>
//         </div>
//     );
// }

// resources/js/components/landing/curtain.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { cubicBezier, useInView } from 'framer-motion';
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
                    'relative transition-transform duration-1000',
                    isInView && show ? 'translate-y-0' : '-translate-y-1/2',
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
