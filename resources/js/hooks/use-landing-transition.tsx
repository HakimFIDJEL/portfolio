// resources/js/hooks/use-landing-transition.ts

import { router } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

// Définir le type de retour pour le Context
export type LandingTransitionsHook = ReturnType<typeof useLandingTransitions>;

export function useLandingTransitions(
    initialShowContent: boolean,
    setShowContentExternal: (v: boolean) => void,
    skipLoader: boolean,
    showPanels: boolean,
) {
    // Main states
    const [loaderActive, setLoaderActive] = useState(skipLoader ? false : true);
    const [navigationActive, setNavigationActive] = useState(false);
    const [contentActive, setContentActive] = useState(initialShowContent);
    const [transitionPanelsActive, setTransitionPanelsActive] = useState(() => {
        return skipLoader ? showPanels : false;
    });
    const [coverScreenActive, setCoverScreenActive] = useState(showPanels);

    // Sub states for animations
    const [pageNavigationActive, setPageNavigationActive] = useState(false);
    const [switchNavigationActive, setSwitchNavigationActive] = useState(false);
    const [navigationContentActive, setNavigationContentActive] =
        useState(false);
    const [loaderContentActive, setLoaderContentActive] = useState(false);

    // Navigation state
    const [targetHref, setTargetHref] = useState<string | null>(null);
    const [targetAnchor, setTargetAnchor] = useState<string>('top');

    // timers ref for cleanup
    const timers = useRef<number[]>([]);

    const clearTimers = () => {
        timers.current.forEach((id) => clearTimeout(id));
        timers.current = [];
    };

    /**
     * SEQUENCES
     */

    // Loader sequence
    function startLoaderSequence() {
        if (!loaderActive) return;
        setLoaderContentActive(true);
        window.scrollTo(0, 0);

        timers.current.push(
            window.setTimeout(() => {
                setLoaderContentActive(false);

                timers.current.push(
                    window.setTimeout(() => {
                        setLoaderActive(false);

                        timers.current.push(
                            window.setTimeout(() => {
                                setContentActive(true);
                                setShowContentExternal(true);
                            }, 500),
                        );
                    }, 500),
                );
            }, 1500),
        );
    }

    // Navigation open/close sequences
    function openNavigationSequence() {
        setTransitionPanelsActive(true);
        setContentActive(false);
        setShowContentExternal(false);

        timers.current.push(
            window.setTimeout(() => {
                setNavigationActive(true);
                timers.current.push(
                    window.setTimeout(
                        () => setNavigationContentActive(true),
                        0,
                    ),
                );
            }, 500),
        );
    }

    // Close navigation sequence
    function closeNavigationSequence() {
        setNavigationContentActive(false);

        timers.current.push(
            window.setTimeout(() => {
                setNavigationActive(false);

                timers.current.push(
                    window.setTimeout(() => {
                        setTransitionPanelsActive(false);

                        timers.current.push(
                            window.setTimeout(() => {
                                setContentActive(true);
                                setShowContentExternal(true);
                            }, 500),
                        );
                    }, 0),
                );
            }, 750),
        );
    }

    // Page navigation sequences
    function openPageSequence() {
        setTransitionPanelsActive(true);
        setContentActive(false);
        setShowContentExternal(false);

        timers.current.push(
            window.setTimeout(() => {
                if (targetHref) {
                    router.visit(targetHref, {
                        preserveState: true,
                        preserveScroll: false,

                        onFinish: () => {
                            setTimeout(() => {
                                if(targetAnchor === 'top') {
                                    window.scrollTo({
                                        top: 0,
                                        left: 0,
                                        behavior: 'instant',
                                    });
                                } else {
                                    const element = document.getElementById(targetAnchor);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'instant' });
                                    }
                                }
                                setCoverScreenActive(false);

                                setTimeout(() => {
                                    setPageNavigationActive(false);
                                }, 500);
                            }, 100);
                        },
                    });
                } else {
                    setPageNavigationActive(false);
                }
            }, 1000),
        );
    }
    // Close page sequence
    function closePageSequence() {
        setTargetHref(null);

        setTimeout(() => {
            setCoverScreenActive(false);
            setTransitionPanelsActive(false);
            setTimeout(() => {
                setContentActive(true);
                setShowContentExternal(true);
            }, 500);
        }, 1000);
    }

    /**
     * EFFECTS
     */

    // Initial load effect
    useEffect(() => {
        if (skipLoader) {
            if (!transitionPanelsActive) {
                setLoaderActive(false);
                setContentActive(true);
                setShowContentExternal(true);
            }
            return;
        }

        if (loaderActive) {
            startLoaderSequence();
        }

        return () => clearTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Navigation open/close effect
    useEffect(() => {
        if (loaderActive) return;

        clearTimers();
        if (!pageNavigationActive) {
            if (switchNavigationActive) openNavigationSequence();
            else closeNavigationSequence();
        }

        return () => clearTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [switchNavigationActive]);

    // Page navigation effect
    useEffect(() => {
        if (loaderActive) return;

        clearTimers();
        if (pageNavigationActive) {
            if (targetHref) {
                openPageSequence();
            } else {
                setPageNavigationActive(false);
            }
        } else {
            closePageSequence();
        }
        return () => clearTimers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNavigationActive]);

    // Cleanup on unmount
    useEffect(() => {
        return () => clearTimers();
    }, []);

    // PUBLIC API: functions to expose
    function _toggleNavigation(show: boolean) {
        setSwitchNavigationActive(show);
    }

    function _navigateToPage(href: string, anchor: string = 'top') {
        setTargetHref(href);
        setTargetAnchor(anchor);
        setPageNavigationActive(true);
        
    }

    // export states + handlers
    return {
        // states
        loaderActive,
        loaderContentActive,
        navigationActive,
        navigationContentActive,
        contentActive,
        transitionPanelsActive,
        coverScreenActive,

        // handlers
        _toggleNavigation,
        _navigateToPage,
        // low-level setters if needed
        setNavigationActive,
        setTransitionPanelsActive,
        setContentActive,
    };
}
