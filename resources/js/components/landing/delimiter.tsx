// resources/js/components/landing/delimiter.tsx

// Necessary imports
import { cn } from '@/lib/utils';

interface DelimiterProps {
    children?: React.ReactNode;
    className?: string;

    plusCorners?: Array<
        'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'all'
    >;
    dashedBorders?: Array<'top' | 'right' | 'bottom' | 'left' | 'all'>;
}

export default function Delimiter({
    children,
    className,
    plusCorners,
    dashedBorders,
}: DelimiterProps) {
    return (
        <div
            className={cn(
                // Default styles
                'relative w-full',

                // Dashed borders
                dashedBorders?.includes('all')
                    ? 'border-1 border-dashed border-border'
                    : '',
                dashedBorders?.includes('top')
                    ? 'border-t-1 border-dashed border-border'
                    : '',
                dashedBorders?.includes('right')
                    ? 'border-r-1 border-dashed border-border'
                    : '',
                dashedBorders?.includes('bottom')
                    ? 'border-b-1 border-dashed border-border'
                    : '',
                dashedBorders?.includes('left')
                    ? 'border-l-1 border-dashed border-border'
                    : '',
                className,
            )}
        >
            {children}

            {plusCorners?.includes('all') && (
                <>
                    <PlusShape position="top-left" />
                    <PlusShape position="top-right" />
                    <PlusShape position="bottom-left" />
                    <PlusShape position="bottom-right" />
                </>
            )}

            {plusCorners?.includes('top-left') && (
                <PlusShape position="top-left" />
            )}
            {plusCorners?.includes('top-right') && (
                <PlusShape position="top-right" />
            )}
            {plusCorners?.includes('bottom-left') && (
                <PlusShape position="bottom-left" />
            )}
            {plusCorners?.includes('bottom-right') && (
                <PlusShape position="bottom-right" />
            )}
        </div>
    );
}

interface PlusShapeProps {
    className?: string;
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

function PlusShape({ className, position }: PlusShapeProps) {
    return (
        <div
            className={cn(
                // Default styles
                'absolute flex h-[20px] w-[20px]',

                // Positioning
                position === 'top-right' &&
                    'top-0 right-0 translate-x-1/2 -translate-y-1/2 pt-[9px] pr-[30px]',
                position === 'top-left' &&
                    'top-0 left-0 -translate-x-1/2 -translate-y-1/2 pt-[9px] pr-[30px]',

                position === 'bottom-right' &&
                    'right-0 bottom-0 translate-x-1/2 translate-y-1/2 pt-[10px] pr-[30px]',
                position === 'bottom-left' &&
                    'bottom-0 left-0 -translate-x-1/2 translate-y-1/2 pt-[10px] pr-[30px]',

                // Additional classes
                className,
            )}
        >
            <div className="rotate-45 flex-col items-center justify-center">
                <span className="block h-[1px] w-[20px] -translate-y-[2px] rotate-45 bg-foreground" />
                <span className="block h-[1px] w-[20px] -translate-y-[3px] -rotate-45 bg-foreground" />
            </div>
        </div>
    );
}
