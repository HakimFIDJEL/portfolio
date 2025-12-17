import { usePage } from '@inertiajs/react'
import { useCallback, useMemo } from 'react'

export interface TranslationValue {
  [key: string]: string | TranslationValue
}

export type Translations = Record<string, TranslationValue>

export function useTrans() {
  const { props } = usePage<{
    translations: Translations
    translations_fallback: Translations
    locale: string
    fallback_locale: string
  }>()

  const translations = useMemo(
    () => props.translations ?? {},
    [props.translations],
  )

  const translationsFallback = useMemo(
    () => props.translations_fallback ?? {},
    [props.translations_fallback],
  )

  const findKey = useCallback(
    (source: TranslationValue, parts: string[]): string | undefined => {
      let value: TranslationValue | undefined = source
      for (const part of parts) {
        if (typeof value === 'object' && value !== null && part in value)
          value = (value as Record<string, TranslationValue>)[part]
        else
          return undefined
      }
      return typeof value === 'string' ? value : undefined
    },
    [],
  )

  const __ = useCallback(
    (key: string, fallback?: string, replacements?: Record<string, string | number>) => {
      const parts = key.split('.')

      let value = findKey(translations, parts)
      if (value === undefined)
        value = findKey(translationsFallback, parts)

      let text = value ?? fallback ?? key

      if (replacements) {
        for (const [k, v] of Object.entries(replacements)) {
          text = text.replace(`:${k}`, String(v))
        }
      }

      return text
    },
    [translations, translationsFallback, findKey],
  )

  return __
}
