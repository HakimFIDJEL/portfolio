import { usePage } from '@inertiajs/react';
import { useCallback, useMemo } from 'react';

export interface TranslationValue {
    [key: string]: string | TranslationValue;
}

export type Translations = Record<string, TranslationValue>;

function resolveKey(
    source: TranslationValue,
    parts: string[],
): string | undefined {
    let value: TranslationValue | undefined = source;
    for (const part of parts) {
        if (typeof value === 'object' && value !== null && part in value) {
            value = (value as Record<string, TranslationValue>)[part];
        } else {
            return undefined;
        }
    }
    return typeof value === 'string' ? value : undefined;
}

export function useTrans() {
    const { props } = usePage<{
        translations: Translations;
        translations_fallback: Translations;
        locale: string;
        fallback_locale: string;
    }>();

    const translations = useMemo(
        () => props.translations ?? {},
        [props.translations],
    );

    const translationsFallback = useMemo(
        () =>
            props.translations_fallback &&
            Object.keys(props.translations_fallback).length > 0
                ? props.translations_fallback
                : translations,
        [props.translations_fallback, translations],
    );

    // Cache memoire local des cles resolues pour eviter les traversees d'arbre repetees
    const keyCache = useMemo(() => {
        void translations;
        void translationsFallback;
        return new Map<string, string | undefined>();
    }, [translations, translationsFallback]);

    const __ = useCallback(
        (
            key: string,
            fallback?: string,
            replacements?: Record<string, string | number>,
        ): string => {
            let rawText = keyCache.get(key);

            if (rawText === undefined && !keyCache.has(key)) {
                const parts = key.split('.');
                rawText = resolveKey(translations, parts);
                if (
                    rawText === undefined &&
                    translationsFallback !== translations
                ) {
                    rawText = resolveKey(translationsFallback, parts);
                }
                keyCache.set(key, rawText);
            }

            let text = rawText ?? fallback ?? key;

            if (replacements) {
                for (const [k, v] of Object.entries(replacements)) {
                    text = text.replaceAll(`:${k}`, String(v));
                }
            }

            return text;
        },
        [translations, translationsFallback, keyCache],
    );

    return __;
}
