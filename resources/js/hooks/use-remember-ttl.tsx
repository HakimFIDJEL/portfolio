// hooks/useRememberTTL.ts
import { useEffect, useState } from 'react'

interface StoredValue<T> {
    value: T
    expiresAt: number
}

export function useRememberTTL<T>(
    defaultValue: T,
    key: string,
    ttlMs: number
): [T, (v: T) => void] {
    const readValue = (): T => {
        const raw = localStorage.getItem(key)
        if (!raw) return defaultValue

        try {
            const parsed: StoredValue<T> = JSON.parse(raw)
            if (Date.now() > parsed.expiresAt) {
                localStorage.removeItem(key)
                return defaultValue
            }
            return parsed.value
        } catch {
            return defaultValue
        }
    }

    const [value, setValue] = useState<T>(readValue)

    const update = (v: T) => {
        setValue(v)
        const payload: StoredValue<T> = {
            value: v,
            expiresAt: Date.now() + ttlMs,
        }
        localStorage.setItem(key, JSON.stringify(payload))
    }

    useEffect(() => {
        // sync si d’autres tabs modifient la clé
        const handler = () => setValue(readValue())
        window.addEventListener('storage', handler)
        return () => window.removeEventListener('storage', handler)
    }, [])

    return [value, update]
}
