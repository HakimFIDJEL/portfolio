import { useState, useEffect } from 'react';

// Nom unique pour l'événement
const EVENT_NAME = 'cursor-preference-change';

export function useCursorPreference() {
    // 1. Initialisation directe (Lazy) pour avoir la bonne valeur dès le premier rendu
    const [isEnabled, setIsEnabled] = useState(() => {
        if (typeof document === 'undefined') return true;
        const match = document.cookie.match(new RegExp('(^| )cursor-enabled=([^;]+)'));
        return match ? match[2] === 'true' : true;
    });

    useEffect(() => {
        // 2. Fonction qui relit le cookie quand l'événement est déclenché
        const handlePreferenceChange = () => {
            const match = document.cookie.match(new RegExp('(^| )cursor-enabled=([^;]+)'));
            if (match) {
                setIsEnabled(match[2] === 'true');
            }
        };

        // 3. On écoute l'événement global
        window.addEventListener(EVENT_NAME, handlePreferenceChange);
        return () => window.removeEventListener(EVENT_NAME, handlePreferenceChange);
    }, []);

    const toggleCursor = () => {
        const newState = !isEnabled;
        
        // Mise à jour du cookie
        document.cookie = `cursor-enabled=${newState}; path=/; max-age=31536000`; 
        
        // Mise à jour locale
        setIsEnabled(newState);

        // 4. IMPORTANT : On prévient les autres composants (comme Antigravity)
        window.dispatchEvent(new Event(EVENT_NAME));
    };

    return { isEnabled, toggleCursor };
}