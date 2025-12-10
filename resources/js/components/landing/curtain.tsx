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
import React from 'react';
import { cubicBezier, motion, useInView } from "framer-motion"

interface CurtainProps {
  showCurtain: boolean
  children: React.ReactNode
  className?: string
  background?: string
  delay?: number
}

export default function Curtain({
  showCurtain,
  children,
  className,
  background,
  delay = 0,
}: CurtainProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { amount: 0.1, once: true })

  const easing = cubicBezier(0.25, 0.38, 0, 0.99);

  const show = !showCurtain;
//   const show = true;

  return (
    <div ref={ref} className={cn("relative w-max", className)}>
      {/* Contenu */}
      <motion.div
        initial={{ y: "-50%" }}
        animate={isInView && show ? { y: "0%" } : { y: "-50%" }}
        transition={{ duration:  1, ease: easing, delay: isInView ? (delay / 1000) : 0 }}
        className="relative"
      >
        {children}
      </motion.div>

      {/* Rideau */}
      <motion.div
        initial={{ top: "-55%", bottom: 0 }}
        animate={isInView && show ? { top: "0%", bottom: "100%" } : { top: "-55%", bottom: 0 }}
        transition={{ duration: 1,  ease: easing, delay: isInView ? delay / 1000 : 0 }}
        className={cn("absolute right-[-1px] left-[-1px] top-[-55%] bottom-0", background ? `bg-${background}` : "bg-card")}
      ></motion.div>
    </div>
  )
}
