// resources/js/components/landing/undeline-link.tsx

import { cn } from '@/lib/utils';

interface UnderlineLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function UnderlineLink({
    href,
    children,
    className,
}: UnderlineLinkProps) {
    return (
        <a
            className={cn(
                // Underline styles
                'after:absolute after:-bottom-1 after:left-0 after:h-[1px] after:w-full after:bg-foreground',
                'after:origin-right after:scale-x-0 after:transition-transform',
                'hover:after:origin-left hover:after:scale-x-100',

                // Focus styles
                'focus:after:origin-left focus:after:scale-x-100',
                'focus:outline-primary focus:outline-2 focus:outline-offset-8 transition-all',

                // Default styles
                'relative text-base font-medium text-foreground',
                className,
            )}
            href={href}
        >
            {children}
        </a>
    );
}
