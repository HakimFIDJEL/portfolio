import { useState, useEffect } from 'react';

const EVENT_NAME = 'cursor-preference-change';

export function useCursorPreference() {
    // 1. Initialisation à false par défaut (pour le SSR et premier rendu)
    const [isEnabled, setIsEnabled] = useState(false);

    useEffect(() => {
        // 2. Lecture du cookie uniquement côté client après le montage
        const getCookieValue = () => {
            const match = document.cookie.match(new RegExp('(^| )cursor-enabled=([^;]+)'));
            // Si le cookie existe, on prend sa valeur, sinon on reste à false
            return match ? match[2] === 'true' : false;
        };

        // On initialise la valeur réelle au montage
        setIsEnabled(getCookieValue());

        const handlePreferenceChange = () => {
            setIsEnabled(getCookieValue());
        };

        window.addEventListener(EVENT_NAME, handlePreferenceChange);
        return () => window.removeEventListener(EVENT_NAME, handlePreferenceChange);
    }, []);

    const toggleCursor = () => {
        const newState = !isEnabled;
        
        document.cookie = `cursor-enabled=${newState}; path=/; max-age=31536000`; 
        setIsEnabled(newState);

        window.dispatchEvent(new Event(EVENT_NAME));
    };

    return { isEnabled, toggleCursor };
}