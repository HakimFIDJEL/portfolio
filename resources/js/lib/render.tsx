import React, { lazy, Suspense, useMemo } from 'react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';
import type { LucideProps } from 'lucide-react';

interface IconProps {
    icon: string;
    props?: LucideProps;
}

export function GetIcon({ icon, props }: IconProps) {
    const validIcon = icon as keyof typeof dynamicIconImports;

    const LucideIcon = useMemo(() => {
        const dynamicImport = dynamicIconImports[validIcon];
        return dynamicImport ? lazy(dynamicImport) : null;
    }, [validIcon]);

    if (!LucideIcon) return null;

    return (
        <Suspense fallback={null}>
            <LucideIcon {...props} />
        </Suspense>
    );
}