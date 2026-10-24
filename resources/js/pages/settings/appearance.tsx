// pages/settings/appearance.tsx

// Necessary imports
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { Head, router, usePage } from '@inertiajs/react';

// Layout
import AppLayout from '@/layouts/app/layout';
import SettingsLayout from '@/layouts/settings/layout';

// Translation Hook
import { useTrans } from '@/lib/translation';

// Shadcn UI Components
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Custom components
import HeadingSmall from '@/components/heading-small';
import { Icon } from '@/components/icon';

// Types
import type { BreadcrumbItem, SharedData, Theme } from '@/types';

// Icons
import { Languages, Monitor, Moon, Sun } from 'lucide-react';

export default function Appearance({ themes }: { themes: Theme[] }) {
    const __ = useTrans();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: __('settings.pages.breadcrumbs.settings'),
            href: route('settings.profile.edit'),
        },
        {
            title: __('settings.pages.breadcrumbs.appearance'),
            href: route('settings.appearance.edit'),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={__('settings.pages.appearance.head_title')} />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title={__('settings.pages.appearance.theme_form.title')}
                        description={__(
                            'settings.pages.appearance.theme_form.description',
                        )}
                    />
                    <AppearanceToggle themes={themes} />
                </div>

                <div className="space-y-6">
                    <HeadingSmall
                        title={__(
                            'settings.pages.appearance.language_form.title',
                        )}
                        description={__(
                            'settings.pages.appearance.language_form.description',
                        )}
                    />
                    <LanguageToggle />
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

function AppearanceToggle({ themes }: { themes: Theme[] }) {
    const { appearance, updateAppearance } = useAppearance();
    const __ = useTrans();

    const tabs = themes.map((theme) => ({
        value: theme.value as Appearance,
        icon:
            theme.value === 'light'
                ? Sun
                : theme.value === 'dark'
                  ? Moon
                  : Monitor,
        label: __(`common.themes.${theme.value}`),
    }));

    const handleChange = (value: string) => {
        updateAppearance(value as Appearance);
    };

    return (
        <Tabs value={appearance} onValueChange={handleChange}>
            <TabsList className="gap-2">
                {tabs.map(({ value, icon, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className="flex gap-2 px-4 py-3"
                    >
                        <Icon iconNode={icon} />
                        <span className="hidden sm:inline">{label}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}

function LanguageToggle() {
    const { locale } = usePage<SharedData>().props;
    const __ = useTrans();

    const languages = [
        {
            value: 'fr',
            label: __(
                'settings.pages.appearance.language_form.options.fr',
                'Français',
            ),
        },
        {
            value: 'en',
            label: __(
                'settings.pages.appearance.language_form.options.en',
                'English',
            ),
        },
    ];

    const handleChange = (newLocale: string) => {
        if (newLocale !== locale) {
            router.get(
                route('toggle_language', { locale: newLocale }),
                {},
                { preserveScroll: true },
            );
        }
    };

    return (
        <Tabs value={locale} onValueChange={handleChange}>
            <TabsList className="gap-2">
                {languages.map(({ value, label }) => (
                    <TabsTrigger
                        key={value}
                        value={value}
                        className="flex cursor-pointer gap-2 px-4 py-3"
                    >
                        <Languages className="h-4 w-4" />
                        <span>{label}</span>
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
}
