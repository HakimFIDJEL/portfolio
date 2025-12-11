// resources/js/components/landing/cover-screen.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Curtain from '@/components/landing/curtain';

interface CoverScreenProps {
    active: boolean;
}

export default function CoverScreen({ active }: CoverScreenProps) {
    return (
        <div
            className={cn(
                'pointer-events-none fixed inset-0 z-1000 flex flex-col bg-transparent opacity-0 transition-all duration-1000',
                'p-12',

                'flex flex-col items-center justify-center gap-8',

                active && 'pointer-events-auto bg-card opacity-100',
            )}
        >
            <Curtain showCurtain={!active} delay={0}>
                <h1 className="text-4xl font-light sm:text-5xl">Loading...</h1>
            </Curtain>
            <Curtain showCurtain={!active} delay={125}>
                <h1 className="text-4xl font-normal sm:text-5xl">Loading...</h1>
            </Curtain>
            <Curtain showCurtain={!active} delay={250}>
                <h1 className="text-4xl font-medium sm:text-5xl">Loading...</h1>
            </Curtain>
        </div>
    );
}
