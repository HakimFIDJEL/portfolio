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
    // Contrôle d'affichage progressif du contenu (rideaux, fade-in)
    const isHome =
        typeof window !== 'undefined'
            ? window.location.pathname === '/' ||
              window.location.pathname === ''
            : true;

    const [contentActive, setContentActive] = useState(!isHome);
    const [loaderState, setLoaderState] = useState<
        'intro' | 'transition' | 'none'
    >(isHome ? 'intro' : 'none');

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

    // Écran de chargement d'intro ("Salut, c'est Hakim")
    const [introLoaderWrapperActive, setIntroLoaderWrapperActive] =
        useState(isHome);
    const [introLoaderContentActive, setIntroLoaderContentActive] =
        useState(false);

    // Écran de transition de chargement (CoverScreen)
    const [transitionLoaderWrapperActive] = useState(false);
    const [transitionLoaderContentActive] = useState(false);

    // Visibilité du header (défilement)
    const [isHeaderVisible, setIsHeaderVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Quand le haut de la fenêtre est dans la liste des projets,
            // le header ne peut plus apparaître et disparaît automatiquement
            const projectsList = document.getElementById('projects-list');
            if (projectsList) {
                const rect = projectsList.getBoundingClientRect();
                if (rect.top <= 0 && rect.bottom >= 0) {
                    setIsHeaderVisible(false);
                    lastScrollY = currentScrollY;
                    return;
                }
            }

            if (currentScrollY <= 10) {
                setIsHeaderVisible(true);
            } else if (currentScrollY > lastScrollY + 20) {
                // Défilement vers le bas
                setIsHeaderVisible(false);
            } else if (currentScrollY < lastScrollY - 10) {
                // Défilement vers le haut
                setIsHeaderVisible(true);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Gestionnaire de minuteries sécurisé
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);
    const isFirstMount = useRef(true);
    const isTransitioningRef = useRef(false);

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
        const performScroll = () => {
            const element = document.getElementById(cleanAnchor);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                return true;
            }
            return false;
        };

        if (!performScroll()) {
            const timeout1 = setTimeout(performScroll, 100);
            const timeout2 = setTimeout(performScroll, 300);
            const timeout3 = setTimeout(performScroll, 600);
            return () => {
                clearTimeout(timeout1);
                clearTimeout(timeout2);
                clearTimeout(timeout3);
            };
        }
    }, []);

    // -----------------------------------
    // Séquence d'intro ("Salut, c'est Hakim")
    // -----------------------------------
    useEffect(() => {
        if (loaderState === 'intro') {
            window.scrollTo(0, 0);

            // Ouvrir les rideaux du texte d'intro
            const openId = safeTimeout(() => {
                setIntroLoaderContentActive(true);
            }, 100);

            // Laisser l'intro visible puis refermer le texte
            const closeId = safeTimeout(() => {
                setIntroLoaderContentActive(false);

                // Disparition progressive de l'arrière-plan du loader
                safeTimeout(() => {
                    setIntroLoaderWrapperActive(false);

                    // Déclencher l'apparition progressive du contenu de la page
                    safeTimeout(() => {
                        setContentActive(true);
                        setLoaderState('none');
                    }, 500);
                }, 500);
            }, 1400);

            return () => {
                clearTimeout(openId);
                clearTimeout(closeId);
            };
        }
    }, [loaderState, safeTimeout]);

    // -----------------------------------
    // Séquences d'ouverture et fermeture du menu
    // -----------------------------------
    const _openNavigationSequence = useCallback(() => {
        // Déployer les volets de transition pour servir de background
        setTransitionPanelsActive({ active: true, mode: 'staggered' });
        setContentActive(false);

        safeTimeout(() => {
            setNavigationWrapperActive(true);
            safeTimeout(() => {
                setNavigationContentActive(true);
            }, 50);
        }, 500);
    }, [safeTimeout]);

    const _closeNavigationSequence = useCallback(() => {
        setNavigationContentActive(false);
    }, []);

    const completeNavigationClose = useCallback(() => {
        setNavigationWrapperActive(false);
        setTransitionPanelsActive({ active: false, mode: 'staggered' });
        safeTimeout(() => {
            setContentActive(true);
        }, 500);
    }, [safeTimeout]);

    useEffect(() => {
        if (isFirstMount.current) {
            isFirstMount.current = false;
            return;
        }

        if (navigationActive) {
            _openNavigationSequence();
        } else {
            _closeNavigationSequence();
        }
    }, [navigationActive, _openNavigationSequence, _closeNavigationSequence]);

    // -----------------------------------
    // Navigation inter-pages et changement de langue
    // -----------------------------------
    const _navigateToPage = useCallback(
        (href: string, anchor: string | null = null) => {
            if (isTransitioningRef.current) {
                return;
            }
            isTransitioningRef.current = true;

            // Refermer le contenu du menu si ouvert
            if (navigationActive) {
                setNavigationContentActive(false);
            }

            setTargetAnchor(anchor);

            // Déployer les volets de transition
            setTransitionPanelsActive({ active: true, mode: 'staggered' });
            setContentActive(false);

            // Normaliser l'URL en chemin relatif (pathname + search + hash) si elle cible le même site
            // afin d'empêcher Inertia de déclencher un rechargement dur du navigateur en cas de divergence d'hôte (ex: localhost vs 127.0.0.1)
            let targetUrl = href;
            try {
                const parsed = new URL(href, window.location.origin);
                const isSameHost = parsed.origin === window.location.origin;
                const isLocalMismatch =
                    ['localhost', '127.0.0.1'].includes(parsed.hostname) &&
                    ['localhost', '127.0.0.1'].includes(
                        window.location.hostname,
                    ) &&
                    (parsed.port === window.location.port ||
                        (!parsed.port && !window.location.port));

                if (isSameHost || isLocalMismatch) {
                    targetUrl = parsed.pathname + parsed.search + parsed.hash;
                }
            } catch {
                // Déjà un chemin relatif
            }

            // Attendre la fin complète de l'apparition des volets (1000ms) avant de lancer le rechargement
            safeTimeout(() => {
                if (navigationActive) {
                    setNavigationWrapperActive(false);
                    setNavigationActive(false);
                }

                router.visit(targetUrl, {
                    preserveScroll: false,
                    preserveState: false,
                    onFinish: () => {
                        // Si aucune ancre spécifique n'est ciblée, repositionner au sommet
                        if (!anchor || anchor === 'top') {
                            window.scrollTo(0, 0);
                        }

                        // Rétracter les volets une fois le nouveau contenu monté
                        safeTimeout(() => {
                            setTransitionPanelsActive({
                                active: false,
                                mode: 'staggered',
                            });

                            // Faire réapparaître le nouveau contenu progressivement
                            safeTimeout(() => {
                                setContentActive(true);
                                isTransitioningRef.current = false;
                            }, 500);
                        }, 100);
                    },
                    onError: () => {
                        setTransitionPanelsActive({
                            active: false,
                            mode: 'staggered',
                        });
                        setContentActive(true);
                        setTargetAnchor(null);
                        isTransitioningRef.current = false;
                    },
                });
            }, 1000);
        },
        [navigationActive, safeTimeout],
    );

    // Défilement différé vers l'ancre lorsque le contenu de la nouvelle page est actif
    useEffect(() => {
        if (contentActive && targetAnchor) {
            const cleanup = scrollToAnchor(targetAnchor);
            setTargetAnchor(null);
            return typeof cleanup === 'function' ? cleanup : undefined;
        }
    }, [contentActive, targetAnchor, scrollToAnchor]);

    return {
        // Paramètres de contenu
        contentActive,
        setContentActive,
        fetchingData: false,
        setFetchingData: () => {},

        // Loader intro & transition
        loaderState,
        setLoaderState,
        introLoaderWrapperActive,
        introLoaderContentActive,
        transitionLoaderWrapperActive,
        transitionLoaderContentActive,

        // Navigation plein écran
        navigationActive,
        navigationWrapperActive,
        navigationContentActive,
        setNavigationActive,
        setNavigationContentActive,
        completeNavigationClose,

        // Panneaux et volets
        transitionPanelsActive,

        // Header
        isHeaderVisible,
        setIsHeaderVisible,

        // Actions
        _navigateToPage,
    };
}
