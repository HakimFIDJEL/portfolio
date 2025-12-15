import { router } from '@inertiajs/react';
import { useEffect, useState, useRef } from 'react';

// Définir le type de retour pour le Context
export type LandingTransitionsHook = ReturnType<typeof useLandingTransitions>;

export function useLandingTransitions() {
    // -----------------------------------
    // States
    // -----------------------------------
    // Loader initial state
    const [contentActive, setContentActive] = useState(false);
    const [fetchingData, setFetchingData] = useState(true);
    const [loaderState, setLoaderState] = useState<
        'intro' | 'transition' | 'none'
    >('intro');
    
    // Main states
    const [navigationActive, setNavigationActive] = useState(false);
    const [navigationWrapperActive, setNavigationWrapperActive] =
        useState(false);
    const [navigationContentActive, setNavigationContentActive] =
        useState(false);
    const [targetAnchor, setTargetAnchor] = useState<string | null>(null);

    // Transition panels state
    interface TransitionPanelsProps {
        active: boolean;
        mode: 'instant' | 'staggered';
    }
    const [transitionPanelsActive, setTransitionPanelsActive] =
        useState<TransitionPanelsProps>({
            active: loaderState === 'transition' ? true : false,
            mode: loaderState === 'transition' ? 'instant' : 'staggered',
        });

    // Loader states
    const [introLoaderWrapperActive, setIntroLoaderWrapperActive] = useState(
        loaderState === 'intro' ? true : false,
    );
    const [introLoaderContentActive, setIntroLoaderContentActive] =
        useState(false);

    const [transitionLoaderWrapperActive, setTransitionLoaderWrapperActive] =
        useState(loaderState === 'transition' ? true : false);
    const [transitionLoaderContentActive, setTransitionLoaderContentActive] =
        useState(false);

    // -----------------------------------
    // Timeout Manager
    // -----------------------------------
    const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

    const safeTimeout = (callback: () => void, delay: number) => {
        const id = setTimeout(callback, delay);
        timeouts.current.push(id);
        return id;
    };

    useEffect(() => {
        return () => {
            timeouts.current.forEach(clearTimeout);
        };
    }, []);

    // -----------------------------------
    // Functions
    // -----------------------------------

    // Navigation open sequence - DONE
    function _openNavigationSequence() {
        setTransitionPanelsActive({ active: true, mode: 'staggered' });
        setContentActive(false);

        safeTimeout(() => {
            setNavigationWrapperActive(true);
            safeTimeout(() => {
                setNavigationContentActive(true);
            }, 0);
        }, 500);
    }

    // Navigation close sequence - DONE
    function _closeNavigationSequence() {
        setNavigationContentActive(false);

        safeTimeout(() => {
            setNavigationWrapperActive(false);

            safeTimeout(() => {
                setTransitionPanelsActive({ active: false, mode: 'staggered' });

                safeTimeout(() => {
                    setContentActive(true);
                }, 500);
            }, 0);
        }, 750);
    }

    // Loader show sequence - DONE
    function _showIntroLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (loaderState !== 'intro') {
            setIntroLoaderWrapperActive(false);
            setIntroLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setIntroLoaderWrapperActive(true);
        setIntroLoaderContentActive(true);
        window.scrollTo(0, 0);
    }

    // Loader close sequence - DONE
    function _closeIntroLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (loaderState !== 'intro') {
            setIntroLoaderWrapperActive(false);
            setIntroLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setIntroLoaderContentActive(false);

        safeTimeout(() => {
            setIntroLoaderWrapperActive(false);

            safeTimeout(() => {
                setContentActive(true);
            }, 500);
        }, 500);
    }

    // Transition loader show sequence - DONE
    function _showTransitionLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (loaderState !== 'transition') {
            setTransitionLoaderWrapperActive(false);
            setTransitionLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setTransitionPanelsActive({ active: true, mode: 'instant' });
        setTransitionLoaderWrapperActive(true);
        setTransitionLoaderContentActive(true);
        window.scrollTo(0, 0);
    }

    // Transition loader close sequence - DONE
    function _closeTransitionLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (loaderState !== 'transition') {
            setTransitionLoaderWrapperActive(false);
            setTransitionLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setTransitionLoaderContentActive(false);

        safeTimeout(() => {
            setTransitionLoaderWrapperActive(false);
            setTransitionPanelsActive({ active: false, mode: 'staggered' });

            safeTimeout(() => {
                setContentActive(true);
            }, 500);
        }, 750);
    }

    // Navigation to page sequence - DONE
    function _navigateToPage(href: string, anchor: string | null) {
        setTransitionPanelsActive({ active: true, mode: 'staggered' });
        setContentActive(false);

        if(navigationActive) {
            setNavigationContentActive(false);
        }

        setTargetAnchor(anchor);
        
        safeTimeout(() => {
            if(navigationActive) {
                setNavigationWrapperActive(false);
            }
            setLoaderState('transition');
            setFetchingData(true);
            router.visit(href, {
                preserveScroll: true,
                preserveState: true,
                
                onFinish: () => {
                    safeTimeout(() => {
                        setNavigationActive(false);
                    }, 0);
                },
            });
        }, 1000);
    }

    // Navigate to anchor helper - DONE
    function _navigateToAnchor(anchor: string) {
        if (anchor === '' || !anchor) {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth',
            });
        } else {
            if (anchor === 'top') {
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                const element = document.getElementById(anchor);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    }

    // -----------------------------------
    // Use Effects
    // -----------------------------------

    // Control navigation open/close effect - DONE
    useEffect(() => {
        if (fetchingData) return;

        if (navigationActive) {
            _openNavigationSequence();
        } else {
            _closeNavigationSequence();
        }
    }, [navigationActive]);

    // Control anchor navigation effect - DONE
    useEffect(() => {
        if (contentActive && targetAnchor) {
            _navigateToAnchor(targetAnchor);
            setTargetAnchor(null);
        }
    }, [contentActive, targetAnchor]);

    // Control data fetching effect, show content when fetching is over - DONE
    useEffect(() => {
        if (fetchingData) {
            switch (loaderState) {
                case 'intro':
                    _showIntroLoaderSequence();
                    break;
                case 'transition':
                    _showTransitionLoaderSequence();
                    break;
                default:
                    setContentActive(false);
                    break;
            }
            return;
        }

        switch (loaderState) {
            case 'intro':
                _closeIntroLoaderSequence();
                break;
            case 'transition':
                _closeTransitionLoaderSequence();
                break;
            default:
                setContentActive(true);
                break;
        }
    }, [fetchingData, loaderState]);

    // -----------------------------------
    // Return states and handlers
    // -----------------------------------
    return {
        // Params
        contentActive,
        fetchingData,
        setContentActive,
        setFetchingData,

        // Loader params
        loaderState,
        setLoaderState,

        // states
        navigationActive,
        navigationWrapperActive,
        navigationContentActive,
        transitionPanelsActive,

        // Loader states
        introLoaderWrapperActive,
        introLoaderContentActive,

        transitionLoaderWrapperActive,
        transitionLoaderContentActive,

        // handlers
        setNavigationActive,
        setNavigationContentActive,
        _navigateToPage,
    };
}