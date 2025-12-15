// resources/js/components/landing/cover-screen.tsx

// Necessary imports
import { cn } from '@/lib/utils';

// Components
import Curtain from '@/components/landing/curtain';

// Translation
import { useTrans } from '@/lib/translation';

interface CoverScreenProps {
    showWrapper: boolean;
    showContent: boolean;
}

export default function CoverScreen({ showWrapper, showContent }: CoverScreenProps) {

    const __ = useTrans();

    return (
        <div
            className={cn(
                'pointer-events-none fixed inset-0 z-1000 flex flex-col bg-transparent opacity-0',
                'p-12',

                'flex flex-col items-center justify-center gap-8',

                showWrapper && 'pointer-events-auto bg-card opacity-100',
            )}
        >
            <Curtain showCurtain={!showContent} delay={0}>
                <h1 className="text-4xl font-light sm:text-5xl">{__('landing.layout.loader.loading', 'Loading...')}</h1>
            </Curtain>
            <Curtain showCurtain={!showContent} delay={125}>
                <h1 className="text-4xl font-normal sm:text-5xl">{__('landing.layout.loader.loading', 'Loading...')}</h1>
            </Curtain>
            <Curtain showCurtain={!showContent} delay={250}>
                <h1 className="text-4xl font-medium sm:text-5xl">{__('landing.layout.loader.loading', 'Loading...')}</h1>
            </Curtain>
        </div>
    );
}
