// resources/js/components/landing/undeline-link.tsx

import { cn } from '@/lib/utils';

interface UnderlineLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
    showUnderline?: boolean;
}

export default function UnderlineLink({
    href,
    children,
    className,
    showUnderline
}: UnderlineLinkProps) {
    return (
        <a
            className={cn(
                // Underline styles
                'after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-foreground',
                'after:origin-right after:scale-x-0 after:transition-transform',
                'hover:after:origin-left hover:after:scale-x-100',

                // Focus styles
                'focus-visible:after:origin-left focus-visible:after:scale-x-100',
                'transition-all focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary',

                // Default styles
                'relative text-base font-medium text-foreground',

                // Conditional underline
                showUnderline && 'after:scale-x-100',
                className,
            )}
            href={href}
        >
            {children}
        </a>
    );
}
