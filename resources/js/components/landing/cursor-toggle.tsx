// resources/js/components/landing/cursor-toggle.tsx

// Necessary imports

// Shadcn UI Components
import Magnet from '@/components/ui/magnet';

// Components
import RoundedButton from '@/components/landing/rounded-button';

// Hooks
import { useCursorPreference } from '@/hooks/use-cursor-preference';
import { useTrans } from '@/lib/translation';


// Icons
import { MousePointer2, MousePointer2Off } from 'lucide-react';

export default function CursorToggle() {

    const { isEnabled, toggleCursor } = useCursorPreference();
    const __ = useTrans();

    return (
        <Magnet magnetStrength={3} padding={20}>
            <RoundedButton onClick={toggleCursor} aria_label={__('landing.seo.toggle_mouse_pointer', 'Toggle mouse pointer')}>
                {isEnabled ? (
                    <MousePointer2Off className="stroke-1" />
                ) : (
                    <MousePointer2 className="stroke-1" />
                )}
            </RoundedButton>
        </Magnet>
    )
}