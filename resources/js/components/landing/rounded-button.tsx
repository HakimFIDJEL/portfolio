// resources/js/components/landing/rounded-button.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import React, { useEffect, useRef, useState } from 'react';

// Shadcn UI components
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface RoundedButtonProps {
    children: React.ReactNode;
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
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
    const [displayedChildren, setDisplayedChildren] = useState(children);
    const [isShrunk, setIsShrunk] = useState(false);
    const latestChildrenRef = useRef(children);
    latestChildrenRef.current = children;
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (!isShrunk) {
            setDisplayedChildren(children);
        }
    }, [children, isShrunk]);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>,
    ) => {
        if (disabled) {
            e.preventDefault();
            return;
        }

        setIsShrunk(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setDisplayedChildren(latestChildrenRef.current);
            setIsShrunk(false);
        }, 100);

        onClick?.(e);
    };

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
                        'flex items-center justify-center',
                        'h-max',
                        'relative z-1',
                        'w-[24px]',
                    )}
                >
                    <div
                        className={cn(
                            'flex items-center justify-center origin-center transition-all duration-100 transform',
                            isShrunk
                                ? 'scale-75 opacity-0 ease-in'
                                : 'scale-100 opacity-100 ease-out',
                        )}
                    >
                        {displayedChildren}
                    </div>
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
                    onClick={handleClick}
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
                onClick={handleClick}
                tabIndex={tabIndex}
                title={title}
                className={commonClassName}
            >
                {content}
            </button>
        );
    }
}


