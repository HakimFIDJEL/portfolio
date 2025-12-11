// resources/js/contexts/use-landing-context.tsx
import { createContext, useContext, useMemo } from 'react';
import { useLandingTransitions, LandingTransitionsHook } from '@/hooks/use-loading-transition';

// Définir le type pour les props du Context Provider
interface LandingTransitionsProviderProps {
    children: React.ReactNode;
    initialShowContent: boolean;
    setShowContentExternal: (v: boolean) => void;
    skipLoader: boolean;
}

// 1. Créer le Context (initialisé à undefined)
// Le type LandingTransitionsHook sera défini dans la prochaine étape
const LandingTransitionsContext = createContext<LandingTransitionsHook | undefined>(undefined);

// 2. Créer le Provider
export function LandingTransitionsProvider({
    children,
    initialShowContent,
    setShowContentExternal,
    skipLoader,
}: LandingTransitionsProviderProps) {
    
    // Utiliser le hook pour obtenir toutes les valeurs (états + handlers)
    const transitions = useLandingTransitions(
        initialShowContent,
        setShowContentExternal,
        skipLoader
    );

    // Mémoriser la valeur du contexte pour éviter les re-renders inutiles
    const contextValue = useMemo(() => transitions, [transitions]);

    return (
        <LandingTransitionsContext.Provider value={contextValue}>
            {children}
        </LandingTransitionsContext.Provider>
    );
}

// 3. Créer le hook personnalisé pour utiliser le contexte
export function useLandingContext() {
    const context = useContext(LandingTransitionsContext);
    if (context === undefined) {
        throw new Error('useLandingContext doit être utilisé au sein d\'un LandingTransitionsProvider');
    }
    return context;
}