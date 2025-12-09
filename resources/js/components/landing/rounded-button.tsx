// resources/js/components/landing/rounded-button.tsx
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

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
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true); // Réduire à l'activation

        setTimeout(() => {
            setIsClicked(false); // Agrandir après un court délai
        }, 150); // Ajustez la durée de l'effet

        if (onClick) {
            onClick();
        }
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                // Default styles
                'cursor-pointer',
                'relative rounded-full p-3',
                'border border-primary',
                'bg-transparent !text-primary',

                'group transition-all',

                // Hover & Focus styles
                'hover:!text-primary-foreground',
                'focus-visible:!text-primary-foreground focus-visible:outline-none',

                className,
            )}
        >
            <div
                className={cn(
                    // Default styles
                    'transition-all',
                    isClicked && 'scale-75 opacity-75',
                )}
            >
                {children}
            </div>

            <div
                className={cn(
                    // Default styles
                    'absolute z-[-1]',
                    'rounded-full',
                    'bg-primary transition-all',
                    'inset-1/2 duration-500',
                    'group-hover:!duration-1000 group-focus-visible:!duration-1000',

                    // Hover & Focus styles
                    'group-hover:inset-0',
                    'group-focus-visible:inset-0',
                )}
            ></div>
        </button>
    );
}
