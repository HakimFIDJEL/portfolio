// resources/js/components/landing/transition-screen.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

const DELAY_INCREMENT = 75;

interface TransitionScreenProps {
    active: boolean;
    mode: 'instant' | 'staggered';
}

export default function TransitionScreen({ active, mode = 'staggered' }: TransitionScreenProps) {
    const panelIndices = useMemo(() => [0, 1, 2, 3], []);
    const [visiblePanels, setVisiblePanels] = useState<number[]>([]);

    console.log('TransitionScreen active:', active);

    useEffect(() => {
        if (active) {
            setVisiblePanels([]);
            panelIndices.forEach((index) => {
                setTimeout(() => {
                    setVisiblePanels((prev) => [...prev, index]);
                }, mode === 'instant' ? 0 : index * DELAY_INCREMENT);
            });
        } else {
            panelIndices.forEach((index) => {
                setTimeout(() => {
                    setVisiblePanels((prev) => prev.filter((i) => i !== index));
                }, mode === 'instant' ? 0 : index * DELAY_INCREMENT);
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
                // Default styles
                'h-[25vh] w-full bg-card transition-all',

                mode === 'instant' ? 'duration-0' : 'duration-1000',

                // Active styles
                !active && 'w-0',
            )}
        ></div>
    );
}
