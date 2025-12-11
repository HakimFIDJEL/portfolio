import {
    LandingTransitionsHook,
    useLandingTransitions,
} from '@/hooks/use-landing-transition';
import { createContext, useContext, useMemo } from 'react';

interface LandingTransitionsProviderProps {
    children: React.ReactNode;
    initialShowContent: boolean;
    setShowContentExternal: (v: boolean) => void;
    skipLoader: boolean;
    showPanels: boolean;
}

const LandingTransitionsContext = createContext<
    LandingTransitionsHook | undefined
>(undefined);

export function LandingTransitionsProvider({
    children,
    initialShowContent,
    setShowContentExternal,
    skipLoader,
    showPanels,
}: LandingTransitionsProviderProps) {
    const transitions = useLandingTransitions(
        initialShowContent,
        setShowContentExternal,
        skipLoader,
        showPanels,
    );

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
        throw new Error(
            "useLandingContext doit être utilisé au sein d'un LandingTransitionsProvider",
        );
    }
    return context;
}
