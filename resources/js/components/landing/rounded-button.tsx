// resources/js/components/landing/rounded-button.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

// Shadcn UI components
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoundedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    aria_label?: string;
    showTooltip?: boolean;
}

export default function RoundedButton({
    children,
    onClick,
    className,
    disabled,
    tabIndex,
    aria_label,
    showTooltip = true,
}: RoundedButtonProps) {
    // const [isClicked, setIsClicked] = useState(false);

    // const handleClick = () => {
    //     setIsClicked(true); // Réduire à l'activation

    //     setTimeout(() => {
    //         setIsClicked(false); // Agrandir après un court délai
    //     }, 150); // Ajustez la durée de l'effet

    //     if (onClick) {
    //         onClick();
    //     }
    // };

    if(!showTooltip) {
        return renderButton(aria_label);
    }

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                {renderButton()}
            </TooltipTrigger>
            <TooltipContent>
                {aria_label}
            </TooltipContent>
        </Tooltip>
    );

    function renderButton(title?: string) {
        return (
            <button
                aria-label={aria_label}
                // onClick={disabled ? undefined : handleClick}
                tabIndex={tabIndex}
                title={title}
                className={cn(
                    // Default styles
                    'cursor-pointer',
                    'relative rounded-full p-3',
                    'border border-primary ',
                    'bg-transparent text-primary',

                    'group transition-all',

                    // Hover & Focus styles
                    'hover:text-primary-foreground',
                    'focus-visible:text-primary-foreground focus-visible:outline-none',

                    // Disabled styles
                    disabled &&
                        'pointer-events-none opacity-50 hover:text-primary focus-visible:text-primary',

                    className,
                )}
            >
                <div
                    className={cn(
                        // Default styles
                        'transition-all flex items-center justify-center duration-0',
                        'h-max',
                        'relative z-1',
                        'w-[24px]',
                        // isClicked && 'scale-75 opacity-75',
                    )}
                >
                    {children}
                </div>

                {!disabled && (
                    <div
                        title={title}
                        className={cn(
                            // Default styles
                            'absolute z-0',
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
        )
    }


}


