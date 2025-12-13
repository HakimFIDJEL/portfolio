// resources/js/components/landing/language-toggle.tsx

// Necessary imports
import { usePage } from '@inertiajs/react';

// Components
import Curtain from '@/components/landing/curtain';
import RoundedButton from '@/components/landing/rounded-button';
import Magnet from '@/components/ui/magnet';

// Contexts
import { useLandingContext } from '@/contexts/use-landing-context';

// Types
import { SharedData } from '@/types';

export default function LanguageToggle() {

    const locale = usePage<SharedData>().props.locale;  

    const { _navigateToPage } = useLandingContext();

    function handleProjectClick(
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string,
        anchor?: string | null,
    ) {
        e.preventDefault();
        _navigateToPage(href, anchor || null);
    }

    return (
        <Magnet magnetStrength={3} padding={20}>
            <a onClick={(e) => handleProjectClick(e, route('toggle_language'))} tabIndex={-1}>
                <RoundedButton>
                    {locale.toUpperCase()}
                </RoundedButton>
            </a>
        </Magnet>
    );
}
