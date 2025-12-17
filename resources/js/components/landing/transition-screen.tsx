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

export default function TransitionScreen({ active, mode = 'staggered' }: TransitionScreenProps) {
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
                'h-[25vh] w-full bg-card transition-all',
                mode === 'instant' ? 'duration-0' : 'duration-1000',
                !active && 'w-0',
            )}
        ></div>
    );
}