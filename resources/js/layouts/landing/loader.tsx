// resources/js/layouts/landing/loader.tsx

// Necessary imports
import Curtain from '@/components/landing/curtain';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { cn } from '@/lib/utils';

interface LoaderProps {
    showLoader: boolean;
    showLoaderContent: boolean;
}

export default function Loader({ showLoader, showLoaderContent }: LoaderProps) {
    return (
        <aside
            className={cn(
                'fixed inset-0 z-9999 bg-background',
                'flex items-center justify-center',
                'opacity-100 transition-all duration-1000',
                !showLoader && 'pointer-events-none opacity-0 delay-500',
            )}
        >
            {/* Pattern */}
            <PlaceholderPattern
                className={cn(
                    'absolute inset-0 z-[-1] size-full h-[100vh] w-[100vw] stroke-neutral-900/20 dark:stroke-neutral-100/20',
                )}
            />

            {/* Loader content */}
            <div
                className={cn(
                    'bg-background p-12',
                    'absolute h-[100vh]',
                    'flex flex-col items-center justify-center gap-8',
                    'transition-all duration-1000',

                    'w-[100%] max-w-[100%]',
                    !showLoader && 'w-[90%] max-w-7xl',
                )}
            >
                <Curtain
                    showCurtain={!showLoaderContent}
                    delay={0}
                    background="background"
                >
                    <h1 className="text-5xl font-light">Hi, I'm Hakim</h1>
                </Curtain>
                <Curtain
                    showCurtain={!showLoaderContent}
                    delay={125}
                    background="background"
                >
                    <h1 className="text-5xl font-normal">Hi, I'm Hakim</h1>
                </Curtain>
                <Curtain
                    showCurtain={!showLoaderContent}
                    delay={250}
                    background="background"
                >
                    <h1 className="text-5xl font-medium">Hi, I'm Hakim</h1>
                </Curtain>
            </div>
        </aside>
    );
}
