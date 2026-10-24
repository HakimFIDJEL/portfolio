// resources/js/components/landing/rounded-button.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React from 'react';

// Shadcn UI components
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoundedButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    href?: string;
    target?: string;
    className?: string;
    disabled?: boolean;
    tabIndex?: number;
    aria_label?: string;
    showTooltip?: boolean;
}

export default function RoundedButton({
    children,
    className,
    onClick,
    href,
    target,
    disabled,
    tabIndex,
    aria_label,
    showTooltip = true,
}: RoundedButtonProps) {
    if (!showTooltip) {
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
        const commonClassName = cn(
            // Default styles
            'cursor-pointer',
            'relative rounded-full p-3 inline-flex items-center justify-center',
            'border border-primary',
            'bg-transparent text-primary',

            'group transition-all',

            // Hover & Focus styles
            'hover:text-primary-foreground',
            'focus-visible:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',

            // Disabled styles
            disabled &&
                'pointer-events-none opacity-50 hover:text-primary focus-visible:text-primary',

            className,
        );

        const content = (
            <>
                <div
                    className={cn(
                        // Default styles
                        'transition-all flex items-center justify-center duration-0',
                        'h-max',
                        'relative z-1',
                        'w-[24px]',
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
                    />
                )}
            </>
        );

        if (href) {
            return (
                <a
                    href={disabled ? undefined : href}
                    target={target}
                    {...(target === '_blank' && { rel: 'noopener noreferrer' })}
                    aria-label={aria_label}
                    onClick={disabled ? (e) => e.preventDefault() : onClick}
                    tabIndex={tabIndex}
                    title={title}
                    className={commonClassName}
                >
                    {content}
                </a>
            );
        }

        return (
            <button
                type="button"
                aria-label={aria_label}
                onClick={disabled ? undefined : onClick}
                tabIndex={tabIndex}
                title={title}
                className={commonClassName}
            >
                {content}
            </button>
        );
    }
}


