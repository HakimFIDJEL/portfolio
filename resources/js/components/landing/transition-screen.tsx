// resources/js/components/landing/transition-screen.tsx

// Necessary imports
import { cn } from '@/lib/utils';
import { useEffect, useMemo, useState } from 'react';

const DELAY_INCREMENT = 75;

interface TransitionScreenProps {
    active: boolean;
}

export default function TransitionScreen({ active }: TransitionScreenProps) {
    const panelIndices = useMemo(() => [0, 1, 2, 3], []);
    const [visiblePanels, setVisiblePanels] = useState<number[]>([]);

    useEffect(() => {

        console.log('TransitionScreen active:', active);

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
    }, [active, panelIndices]);

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
                />
            ))}
        </div>
    );
}

interface TransitionPanelProps {
    active: boolean;
}

function TransitionPanel({ active }: TransitionPanelProps) {
    return (
        <div
            className={cn(
                // Default styles
                'h-[25vh] w-0 bg-card transition-all duration-1000',

                // Active styles
                active && 'w-full',
            )}
        ></div>
    );
}
