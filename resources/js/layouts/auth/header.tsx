import AppearanceToggleDropdown from '@/components/appearance-dropdown';
import LanguageToggleDropdown from '@/components/language-dropdown';

export function AuthHeader() {
    return (
        <header className="absolute top-0 left-0 flex w-full items-center justify-end gap-2 p-4">
            <LanguageToggleDropdown />
            <AppearanceToggleDropdown />
        </header>
    );
}
