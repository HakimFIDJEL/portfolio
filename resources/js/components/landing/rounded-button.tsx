// resources/js/components/landing/rounded-button.tsx
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

// Necessary imports
interface RoundedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function RoundedButton({
    children,
    onClick,
    className,
    disabled,
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
            onClick={disabled ? undefined : handleClick}
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

                // Disabled styles
                disabled &&
                    'pointer-events-none opacity-50 hover:!text-primary focus-visible:!text-primary',

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

            {!disabled && (
                <div
                    className={cn(
                        // Default styles
                        'absolute z-[-1]',
                        'rounded-full',
                        'bg-primary transition-all',
                        'inset-1/2 duration-1000',
                        'group-hover:!duration-500 group-focus-visible:!duration-500',

                        // Hover & Focus styles
                        'group-hover:inset-0',
                        'group-focus-visible:inset-0',
                    )}
                ></div>
            )}
        </button>
    );
}
