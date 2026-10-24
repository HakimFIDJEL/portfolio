import type { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import { lazy, Suspense, useMemo } from 'react';

interface IconProps {
    icon: string;
    props?: LucideProps;
}

export function GetIcon({ icon, props }: IconProps) {
    const validIcon = icon as keyof typeof dynamicIconImports;

    const LucideIcon = useMemo(() => {
        if (typeof window === 'undefined') {
            return null;
        }

        const dynamicImport = dynamicIconImports[validIcon];
        return dynamicImport ? lazy(dynamicImport) : null;
    }, [validIcon]);

    if (typeof window === 'undefined' || !LucideIcon) {
        return null;
    }

    return (
        <Suspense fallback={null}>
            <LucideIcon {...props} />
        </Suspense>
    );
}
