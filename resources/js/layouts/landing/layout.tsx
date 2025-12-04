// layouts/landing/layout.tsx

// Necessary imports
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { type ReactNode } from 'react';

// Types

// Shadcn UI Components

// Custom components

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLanding({ children }: AppLayoutProps) {
    return (
        <>
            <div className='landing antialiased relative z-1 bg-background max-w-7xl w-[90%] mx-auto min-h-screen transition-default'>
                {children}
            </div>
            <PlaceholderPattern className="fixed w-[100vw] h-[100vh] inset-0 size-full z-0 stroke-neutral-900/20 dark:stroke-neutral-100/20"/>
        </>
    );
}
