// resources/js/components/landing/transition-screen.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

const DELAY_INCREMENT = 75;
const PANEL_INDICES = [0, 1, 2, 3];

interface TransitionScreenProps {
    active: boolean;
    mode: 'instant' | 'staggered';
}

export default function TransitionScreen({
    active,
    mode = 'staggered',
}: TransitionScreenProps) {
    const panelIndices = useMemo(() => PANEL_INDICES, []);
    const [visiblePanels, setVisiblePanels] = useState<number[]>([]);

    useEffect(() => {
        if (mode === 'instant') {
            setVisiblePanels(active ? panelIndices : []);
            return;
        }

        if (active) {
            setVisiblePanels([]);
            panelIndices.forEach((index) => {
                setTimeout(() => {
                    setVisiblePanels((prev) => [...prev, index]);
                }, index * DELAY_INCREMENT);
            });
        } else {
            panelIndices.forEach((index) => {
                setTimeout(() => {
                    setVisiblePanels((prev) => prev.filter((i) => i !== index));
                }, index * DELAY_INCREMENT);
            });
        }
    }, [active, panelIndices, mode]);

    return (
        <div
            className={cn(
                'pointer-events-none fixed inset-0 z-1000 flex flex-col items-end bg-transparent',
                active && 'items-start',
            )}
        >
            {/* Overlay backdrop sous les volets */}
            <div
                className={cn(
                    'pointer-events-none fixed inset-0 z-0',
                    'bg-primary/8 backdrop-blur-[2px] dark:bg-black/50',
                    active
                        ? mode === 'instant'
                            ? 'opacity-100 transition-none'
                            : 'opacity-100 transition-opacity delay-0 duration-300'
                        : mode === 'instant'
                          ? 'opacity-0 transition-none'
                          : 'opacity-0 transition-opacity delay-500 duration-500',
                )}
            />

            {panelIndices.map((index) => (
                <TransitionPanel
                    key={index}
                    active={visiblePanels.includes(index)}
                    mode={mode}
                />
            ))}
        </div>
    );
}

interface TransitionPanelProps {
    active: boolean;
    mode: 'instant' | 'staggered';
}

function TransitionPanel({ active, mode }: TransitionPanelProps) {
    return (
        <div
            className={cn(
                'relative z-10 h-[25vh] w-full bg-card transition-all',
                'border-b border-border/30 last:border-b-0',
                'shadow-sm dark:shadow-[0_4px_24px_rgba(0,0,0,0.35)]',
                mode === 'instant' ? 'duration-0' : 'duration-1000',
                !active && 'w-0',
            )}
        ></div>
    );
}
