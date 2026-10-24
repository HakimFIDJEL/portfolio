// resources/js/components/landing/language-toggle.tsx

// Necessary imports
import { usePage } from '@inertiajs/react';

// Components
import RoundedButton from '@/components/landing/rounded-button';
import Magnet from '@/components/ui/magnet';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Types
import { SharedData } from '@/types';

// Translation
import { useTrans } from '@/lib/translation';

export default function LanguageToggle() {
    const locale = usePage<SharedData>().props.locale;
    const __ = useTrans();

    const { _navigateToPage } = useLandingContext();

    return (
        <Magnet magnetStrength={3} padding={20}>
            <RoundedButton
                aria_label={__(
                    'landing.seo.switch_language',
                    'Switch language to :language',
                    {
                        language:
                            locale.toUpperCase() === 'EN'
                                ? 'Français'
                                : 'English',
                    },
                )}
                onClick={() => {
                    _navigateToPage(route('toggle_language'), null);
                }}
            >
                {locale.toUpperCase()}
            </RoundedButton>
        </Magnet>
    );
}
