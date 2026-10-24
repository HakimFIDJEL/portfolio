import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTrans } from '@/lib/translation';
import { SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Check, Languages } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function LanguageToggleDropdown({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { locale } = usePage<SharedData>().props;
    const __ = useTrans();

    const switchLanguage = (newLocale: string) => {
        if (newLocale !== locale) {
            router.get(
                route('toggle_language', { locale: newLocale }),
                {},
                { preserveScroll: true },
            );
        }
    };

    return (
        <div className={className} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="h-9 cursor-pointer gap-1.5 rounded-md px-2.5 text-xs font-semibold uppercase"
                        aria-label={__(
                            'landing.seo.switch_language',
                            'Changer de langue',
                        )}
                    >
                        <Languages className="h-4 w-4" />
                        <span>{locale}</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-36">
                    <DropdownMenuItem
                        onClick={() => switchLanguage('fr')}
                        disabled={locale === 'fr'}
                        className="flex cursor-pointer items-center justify-between"
                    >
                        <span>Français</span>
                        {locale === 'fr' && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => switchLanguage('en')}
                        disabled={locale === 'en'}
                        className="flex cursor-pointer items-center justify-between"
                    >
                        <span>English</span>
                        {locale === 'en' && <Check className="h-4 w-4" />}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
