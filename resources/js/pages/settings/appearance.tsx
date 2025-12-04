// pages/settings/appearance.tsx

// Necessary imports
import { type Appearance, useAppearance } from '@/hooks/use-appearance';
import { Head } from '@inertiajs/react';

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
import type { BreadcrumbItem, Theme } from '@/types';

// Icons
import { Monitor, Moon, Sun } from 'lucide-react';

export default function Appearance({
    themes,
}: {
    themes: Theme[];
}) {
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
                <div className="mb-0 space-y-6">
                    <HeadingSmall
                        title={__('settings.pages.appearance.theme_form.title')}
                        description={__(
                            'settings.pages.appearance.theme_form.description',
                        )}
                    />
                    <AppearanceToggle themes={themes} />
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
