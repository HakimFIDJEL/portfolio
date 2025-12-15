// // resources/js/hooks/use-landing-transition.ts

// import { router } from '@inertiajs/react';
// import { useEffect, useRef, useState } from 'react';

// // Définir le type de retour pour le Context
// export type LandingTransitionsHook = ReturnType<typeof useLandingTransitions>;

// export function useLandingTransitions(
//     initialShowContent: boolean,
//     setShowContentExternal: (v: boolean) => void,
//     skipLoader: boolean,
//     showPanels: boolean,
//     fetchingData?: boolean,
// ) {
//     // Main states
//     const [loaderActive, setLoaderActive] = useState(skipLoader ? false : true);
//     const [navigationActive, setNavigationActive] = useState(false);
//     const [contentActive, setContentActive] = useState(initialShowContent);
//     const [transitionPanelsActive, setTransitionPanelsActive] = useState(() => {
//         return skipLoader ? showPanels : false;
//     });
//     const [coverScreenActive, setCoverScreenActive] = useState(showPanels);

//     // Sub states for animations
//     const [pageNavigationActive, setPageNavigationActive] = useState(false);
//     const [switchNavigationActive, setSwitchNavigationActive] = useState(false);
//     const [navigationContentActive, setNavigationContentActive] =
//         useState(false);
//     const [loaderContentActive, setLoaderContentActive] = useState(false);

//     // Navigation state
//     const [targetHref, setTargetHref] = useState<string | null>(null);
//     const [targetAnchor, setTargetAnchor] = useState<string>();

//     // timers ref for cleanup
//     const timers = useRef<number[]>([]);

//     const clearTimers = () => {
//         timers.current.forEach((id) => clearTimeout(id));
//         timers.current = [];
//     };

//     /**
//      * SEQUENCES
//      */

//     // Loader sequence
//     function startLoaderSequence() {
//         if (!loaderActive) return;
//         setLoaderContentActive(true);
//         window.scrollTo(0, 0);

//         timers.current.push(
//             window.setTimeout(() => {
//                 setLoaderContentActive(false);

//                 timers.current.push(
//                     window.setTimeout(() => {
//                         setLoaderActive(false);

//                         timers.current.push(
//                             window.setTimeout(() => {
//                                 setContentActive(true);
//                                 setShowContentExternal(true);
//                             }, 500),
//                         );
//                     }, 500),
//                 );
//             }, 1500),
//         );
//     }

//     function startLoaderExitSequence() {
//         if (!loaderActive) return;

//         setLoaderContentActive(false);

//         const DURATION_CONTENT_FADE = 500;
//         const DURATION_LOADER_FADE = 500;

//         timers.current.push(
//             window.setTimeout(() => {
//                 setLoaderActive(false);

//                 timers.current.push(
//                     window.setTimeout(() => {
//                         setContentActive(true);
//                         setShowContentExternal(true);
//                     }, DURATION_LOADER_FADE)
//                 );
//             }, DURATION_CONTENT_FADE)
//         );
//     }

//     function initLoaderDisplay() {
//         if (!loaderActive) return;
//         setLoaderContentActive(true);
//         window.scrollTo(0, 0);
//     }

//     // Navigation open/close sequences
//     function openNavigationSequence() {
//         setTransitionPanelsActive(true);
//         setContentActive(false);
//         setShowContentExternal(false);

//         timers.current.push(
//             window.setTimeout(() => {
//                 setNavigationActive(true);
//                 timers.current.push(
//                     window.setTimeout(
//                         () => setNavigationContentActive(true),
//                         0,
//                     ),
//                 );
//             }, 500),
//         );
//     }

//     // Close navigation sequence
//     function closeNavigationSequence() {
//         setNavigationContentActive(false);

//         timers.current.push(
//             window.setTimeout(() => {
//                 setNavigationActive(false);

//                 timers.current.push(
//                     window.setTimeout(() => {
//                         setTransitionPanelsActive(false);

//                         timers.current.push(
//                             window.setTimeout(() => {
//                                 setContentActive(true);
//                                 setShowContentExternal(true);
//                             }, 500),
//                         );
//                     }, 0),
//                 );
//             }, 750),
//         );
//     }

//     // Page navigation sequences
//     function openPageSequence() {
//         setTransitionPanelsActive(true);
//         setContentActive(false);
//         setShowContentExternal(false);

//         timers.current.push(
//             window.setTimeout(() => {
//                 if (targetHref) {
//                     setCoverScreenActive(true);
//                     router.visit(targetHref, {
//                         preserveState: true,
//                         preserveScroll: false,

//                         onFinish: () => {
//                             setTimeout(() => {

//                                 if(targetAnchor === '' || !targetAnchor) {
//                                     window.scrollTo({
//                                         top: 0,
//                                         left: 0,
//                                         behavior: 'instant',
//                                     });
//                                 } else {
//                                     if(targetAnchor === 'top') {
//                                         window.scrollTo({
//                                             top: 0,
//                                             left: 0,
//                                             behavior: 'instant',
//                                         });
//                                     } else {
//                                         const element = document.getElementById(targetAnchor);
//                                         if (element) {
//                                             element.scrollIntoView({ behavior: 'instant' });
//                                         }
//                                     }
//                                 }

//                                 // setCoverScreenActive(false);

//                                 setTimeout(() => {
//                                     setPageNavigationActive(false);
//                                 }, 500);
//                             }, 100);
//                         },
//                     });
//                 } else {
//                     setPageNavigationActive(false);
//                 }
//             }, 1000),
//         );
//     }
//     // Close page sequence
//     function closePageSequence() {
//         setTargetHref(null);

//         setTimeout(() => {
//             setCoverScreenActive(false);
//             setTimeout(() => {
//                 setTransitionPanelsActive(false);
//                 setTimeout(() => {
//                     setContentActive(true);
//                     setShowContentExternal(true);
//                 }, 500);
//             }, 250);
//         }, 1000);
//     }

//     /**
//      * EFFECTS
//      */

//     // Initial load effect
//     useEffect(() => {
//         if (skipLoader) {
//             if (!transitionPanelsActive) {
//                 setLoaderActive(false);
//                 setContentActive(true);
//                 setShowContentExternal(true);
//             }
//             return;
//         }

//         // clearTimers();

//         if (fetchingData === undefined) {
//             initLoaderDisplay();
//         }

//         if (fetchingData === false) {
//             const MIN_LOAD_TIME = 500;

//             timers.current.push(
//                 window.setTimeout(() => {
//                     startLoaderExitSequence();
//                 }, MIN_LOAD_TIME)
//             );
//         }

//         // if (loaderActive) {
//         //     startLoaderSequence();
//         // }

//         return () => clearTimers();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [fetchingData, skipLoader]);

//     // Navigation open/close effect
//     useEffect(() => {
//         if (loaderActive) return;

//         clearTimers();
//         if (!pageNavigationActive) {
//             if (switchNavigationActive) openNavigationSequence();
//             else closeNavigationSequence();
//         }

//         return () => clearTimers();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [switchNavigationActive]);

//     // Page navigation effect
//     useEffect(() => {
//         if (loaderActive) return;

//         clearTimers();
//         if (pageNavigationActive) {
//             if (targetHref) {
//                 openPageSequence();
//             } else {
//                 setPageNavigationActive(false);
//             }
//         } else {
//             closePageSequence();
//         }
//         return () => clearTimers();
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, [pageNavigationActive]);

//     // Cleanup on unmount
//     useEffect(() => {
//         return () => clearTimers();
//     }, []);

//     // PUBLIC API: functions to expose
//     function _toggleNavigation(show: boolean) {
//         setSwitchNavigationActive(show);
//     }

//     function _navigateToPage(href: string, anchor: string | null) {
//         setTargetHref(href);
//         setTargetAnchor(anchor ?? '');
//         setPageNavigationActive(true);

//     }

//     // export states + handlers
//     return {
//         // states
//         loaderActive,
//         loaderContentActive,
//         navigationActive,
//         navigationContentActive,
//         contentActive,
//         transitionPanelsActive,
//         coverScreenActive,

//         // handlers
//         _toggleNavigation,
//         _navigateToPage,
//         // low-level setters if needed
//         setNavigationActive,
//         setTransitionPanelsActive,
//         setContentActive,
//     };
// }

// resources/js/hooks/use-landing-transition.ts

import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Définir le type de retour pour le Context
export type LandingTransitionsHook = ReturnType<typeof useLandingTransitions>;

export function useLandingTransitions(
    fetchingData: boolean,
    contentActive: boolean,
    setContentActive: (v: boolean) => void,

    initialLoaderState: 'intro' | 'transition' | 'none' = 'transition',
) {
    // -----------------------------------
    // States
    // -----------------------------------
    // Main states
    const [navigationActive, setNavigationActive] = useState(false);
    const [navigationWrapperActive, setNavigationWrapperActive] =
        useState(false);
    const [navigationContentActive, setNavigationContentActive] =
        useState(false);

    // Transition panels state
    interface TransitionPanelsProps {
        active: boolean;
        mode: 'instant' | 'staggered';
    }
    const [transitionPanelsActive, setTransitionPanelsActive] =
        useState<TransitionPanelsProps>({
            active: initialLoaderState === 'transition' ? true : false,
            mode: initialLoaderState === 'transition' ? 'instant' : 'staggered',
        });

    // Loader states
    const [introLoaderWrapperActive, setIntroLoaderWrapperActive] = useState(
        initialLoaderState === 'intro' ? true : false,
    );
    const [introLoaderContentActive, setIntroLoaderContentActive] =
        useState(false);

    const [transitionLoaderWrapperActive, setTransitionLoaderWrapperActive] =
        useState(initialLoaderState === 'transition' ? true : false);
    const [transitionLoaderContentActive, setTransitionLoaderContentActive] =
        useState(false);

    // -----------------------------------
    // Functions
    // -----------------------------------

    // Navigation open sequence - DONE
    function _openNavigationSequence() {
        setTransitionPanelsActive({ active: true, mode: 'staggered' });
        setContentActive(false);

        setTimeout(() => {
            setNavigationWrapperActive(true);
            setTimeout(() => {
                setNavigationContentActive(true);
            }, 0);
        }, 500);
    }

    // Navigation close sequence - DONE
    function _closeNavigationSequence() {
        setNavigationContentActive(false);

        setTimeout(() => {
            setNavigationWrapperActive(false);

            setTimeout(() => {
                setTransitionPanelsActive({ active: false, mode: 'staggered' });

                setTimeout(() => {
                    setContentActive(true);
                }, 500);
            }, 0);
        }, 750);
    }

    // Loader show sequence - DONE
    function _showIntroLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (initialLoaderState !== 'intro') {
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
        if (initialLoaderState !== 'intro') {
            setIntroLoaderWrapperActive(false);
            setIntroLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setIntroLoaderContentActive(false);

        setTimeout(() => {
            setIntroLoaderWrapperActive(false);

            setTimeout(() => {
                setContentActive(true);
            }, 500);
        }, 500);
    }

    // Transition loader show sequence - DONE
    function _showTransitionLoaderSequence() {
        // Kill switch to avoid displaying the intro loader
        if (initialLoaderState !== 'transition') {
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
        if (initialLoaderState !== 'transition') {
            setTransitionLoaderWrapperActive(false);
            setTransitionLoaderContentActive(false);
            setContentActive(true);
            return;
        }

        setTransitionLoaderContentActive(false);

        setTimeout(() => {
            setTransitionLoaderWrapperActive(false);
            setTransitionPanelsActive({ active: false, mode: 'staggered' });

            setTimeout(() => {
                setContentActive(true);
            }, 500);
        }, 500);
    }

    // Navigation to page sequence - DONE
    function _navigateToPage(href: string, anchor: string | null) {
        setTransitionPanelsActive({ active: true, mode: 'staggered' });
        setContentActive(false);
        setTimeout(() => {
            router.visit(href, {
                preserveScroll: true,
                preserveState: true,

                onFinish: () => {
                    setTimeout(() => {
                        _navigateToAnchor(anchor ?? '');
                        _closeTransitionLoaderSequence();
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

    // Control data fetching effect, show content when fetching is over - DONE
    useEffect(() => {
        if (fetchingData) {
            switch (initialLoaderState) {
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

        switch (initialLoaderState) {
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
    }, [fetchingData]);

    // -----------------------------------
    // Return states and handlers
    // -----------------------------------
    return {
        // Params
        contentActive,
        initialLoaderState,

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
        _navigateToPage,
    };
}
