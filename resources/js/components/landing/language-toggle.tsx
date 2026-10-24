// resources/js/components/landing/language-toggle.tsx

// Necessary imports
import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

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
    const [currentLocale, setCurrentLocale] = useState(locale);
    const __ = useTrans();

    useEffect(() => {
        setCurrentLocale(locale);
    }, [locale]);

    const { _navigateToPage } = useLandingContext();

    const targetLocale = currentLocale.toUpperCase() === 'EN' ? 'fr' : 'en';

    return (
        <Magnet magnetStrength={3} padding={20}>
            <RoundedButton
                aria_label={__(
                    'landing.seo.switch_language',
                    'Switch language to :language',
                    {
                        language:
                            currentLocale.toUpperCase() === 'EN'
                                ? 'Français'
                                : 'English',
                    },
                )}
                onClick={() => {
                    setCurrentLocale(targetLocale);
                    _navigateToPage(route('toggle_language'), null);
                }}
            >
                {currentLocale.toUpperCase()}
            </RoundedButton>
        </Magnet>
    );
}
