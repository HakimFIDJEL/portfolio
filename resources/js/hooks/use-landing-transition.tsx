import { router } from '@inertiajs/react';
import { useCallback, useEffect, useRef, useState } from 'react';

export interface TransitionPanelsState {
    active: boolean;
    mode: 'instant' | 'staggered';
}

export type LandingTransitionsHook = ReturnType<typeof useLandingTransitions>;

export function useLandingTransitions() {
    // -----------------------------------
    // States
    // -----------------------------------
    // Affichage immédiat du contenu sans fake loading
    const [contentActive, setContentActive] = useState(true);

    // Navigation plein écran
    const [navigationActive, setNavigationActive] = useState(false);
    const [navigationWrapperActive, setNavigationWrapperActive] =
        useState(false);
    const [navigationContentActive, setNavigationContentActive] =
        useState(false);

    // Ancre cible post-navigation
    const [targetAnchor, setTargetAnchor] = useState<string | null>(null);

    // Panneaux de volets de transition
    const [transitionPanelsActive, setTransitionPanelsActive] =
        useState<TransitionPanelsState>({
            active: false,
            mode: 'staggered',
        });

    // Écrans de chargement (désactivés au SSR direct)
    const [introLoaderWrapperActive] = useState(false);
    const [introLoaderContentActive] = useState(false);
    const [transitionLoaderWrapperActive, setTransitionLoaderWrapperActive] =
        useState(false);
    const [transitionLoaderContentActive, setTransitionLoaderContentActive] =
        useState(false);

    // Gestionnaire de minuteries sécurisé
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

    const safeTimeout = useCallback((callback: () => void, delay: number) => {
        const id = setTimeout(callback, delay);
        timeouts.current.push(id);
        return id;
    }, []);

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    // -----------------------------------
    // Défilement vers ancre
    // -----------------------------------
    const scrollToAnchor = useCallback((anchor: string | null) => {
        if (!anchor || anchor === 'top') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
            return;
        }

        const cleanAnchor = anchor.replace('#', '');
        const element = document.getElementById(cleanAnchor);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    // -----------------------------------
    // Navigation déclarative via Inertia
    // -----------------------------------
    const _navigateToPage = useCallback(
        (href: string, anchor: string | null = null) => {
            // Fermer le menu de navigation si ouvert
            if (navigationActive) {
                setNavigationContentActive(false);
                safeTimeout(() => {
                    setNavigationWrapperActive(false);
                    setNavigationActive(false);
                }, 300);
            }

            setTargetAnchor(anchor);
            setTransitionPanelsActive({ active: true, mode: 'staggered' });

            // Laisser le volet couvrir l'écran avant la visite Inertia
            safeTimeout(() => {
                setTransitionLoaderWrapperActive(true);
                setTransitionLoaderContentActive(true);

                router.visit(href, {
                    preserveScroll: false,
                    preserveState: false,
                    onFinish: () => {
                        setTransitionLoaderContentActive(false);
                        safeTimeout(() => {
                            setTransitionLoaderWrapperActive(false);
                            setTransitionPanelsActive({
                                active: false,
                                mode: 'staggered',
                            });
                            setContentActive(true);
                            if (anchor) {
                                scrollToAnchor(anchor);
                                setTargetAnchor(null);
                            }
                        }, 250);
                    },
                });
            }, 350);
        },
        [navigationActive, safeTimeout, scrollToAnchor],
    );

    // -----------------------------------
    // Synchronisation du menu de navigation
    // -----------------------------------
    useEffect(() => {
        if (navigationActive) {
            setNavigationWrapperActive(true);
            const id = safeTimeout(() => {
                setNavigationContentActive(true);
            }, 50);
            return () => clearTimeout(id);
        } else {
            setNavigationContentActive(false);
            const id = safeTimeout(() => {
                setNavigationWrapperActive(false);
            }, 300);
            return () => clearTimeout(id);
        }
    }, [navigationActive, safeTimeout]);

    // -----------------------------------
    // Écouteurs déclaratifs d'événements Inertia
    // -----------------------------------
    useEffect(() => {
        const removeStart = router.on('start', () => {
            setTransitionPanelsActive((prev) =>
                prev.active ? prev : { active: true, mode: 'staggered' },
            );
        });

        const removeFinish = router.on('finish', () => {
            setTransitionPanelsActive({ active: false, mode: 'staggered' });
            setContentActive(true);
            if (targetAnchor) {
                scrollToAnchor(targetAnchor);
                setTargetAnchor(null);
            }
        });

        return () => {
            removeStart();
            removeFinish();
        };
    }, [targetAnchor, scrollToAnchor]);

    return {
        // Paramètres de contenu
        contentActive,
        setContentActive,
        fetchingData: false,
        setFetchingData: () => {},

        // Navigation
        navigationActive,
        navigationWrapperActive,
        navigationContentActive,
        setNavigationActive,
        setNavigationContentActive,

        // Panneaux et volets
        transitionPanelsActive,
        introLoaderWrapperActive,
        introLoaderContentActive,
        transitionLoaderWrapperActive,
        transitionLoaderContentActive,

        // Actions
        _navigateToPage,
    };
}
