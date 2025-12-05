// resources/js/components/landing/rounded-button.tsx

import { cn } from '@/lib/utils';

// Necessary imports
interface RoundedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

export default function RoundedButton({
    children,
    onClick,
    className,
}: RoundedButtonProps) {
    return (
        <button
            onClick={onClick}
            className={cn(
                // Default styles
                'cursor-pointer',
                'relative rounded-full p-3',
                'border border-primary',
                'bg-transparent !text-primary',

                'group transition-all',

                // Hover & Focus styles
                'hover:!text-foreground',
                'focus-visible:!text-foreground focus-visible:outline-none',

                className,
            )}
        >
            {children}

            <div
                className={cn(
                    // Default styles
                    'absolute z-[-1]',
                    'rounded-full',
                    'bg-primary transition-all',
                    'inset-1/2',

                    // Hover & Focus styles
                    'group-hover:inset-0',
                    'group-focus-visible:inset-0',
                )}
            ></div>
        </button>
    );
}
