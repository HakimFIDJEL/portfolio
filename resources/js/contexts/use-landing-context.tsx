import {
    LandingTransitionsHook,
    useLandingTransitions,
} from '@/hooks/use-landing-transition';
import { createContext, useContext, useMemo, useState } from 'react';

interface LandingTransitionsProviderProps {
    children: React.ReactNode;
}

const LandingTransitionsContext = createContext<
    LandingTransitionsHook | undefined
>(undefined);

export function LandingTransitionsProvider({
    children,
}: LandingTransitionsProviderProps) {


    const transitions = useLandingTransitions();

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
