// layouts/landing/layout.tsx

// Necessary imports
import { type ReactNode } from 'react';

// Types

// Shadcn UI Components

// Custom components

interface AppLayoutProps {
    children: ReactNode;
}

export default function AppLanding({ children }: AppLayoutProps) {
    return (
        <body className='font-landing antialiased'>
            {children}
        </body>
    );
}
