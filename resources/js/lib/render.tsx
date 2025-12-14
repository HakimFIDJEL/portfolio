import type { LucideIcon } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

export function getIcon(
    icon: string,
    props?: Record<string, unknown>,
): React.JSX.Element | null {
    const normalized = icon
        .split('-')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');

    const icons = LucideIcons as unknown as Record<string, LucideIcon>;

    const Icon = icons[normalized];

    if (!Icon) return null;

    return <Icon {...props} />;
}
