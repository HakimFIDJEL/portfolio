// resources/js/hooks/useLandingTransitions.ts

import { useEffect, useState } from 'react';

export function useLandingTransitions(
    showContent: boolean,
    setShowContent: (v: boolean) => void,
    skipLoader: boolean,
) {
    // Menu & navigation
    const [showMenu, setShowMenu] = useState(false);
    const [showNavigation, setShowNavigation] = useState(false);
    const [showNavigationContent, setShowNavigationContent] = useState(false);
    const [switchNavigation, setSwitchNavigation] = useState(false);

    // Loader
    const [showLoader, setShowLoader] = useState(skipLoader ? false : true);
    const [showLoaderContent, setShowLoaderContent] = useState(false);

    // Transition screen
    const [transitionScreenActive, setTransitionScreenActive] = useState(false);

    // Navigation transitions
    useEffect(() => {
        if (showLoader) return;

        if (switchNavigation) {
            setTransitionScreenActive(true);
            setShowMenu(false);
            setShowContent(false);

            const timeout = setTimeout(() => {
                setShowNavigation(true);

                setTimeout(() => {
                    setShowNavigationContent(true);
                }, 0);
            }, 500);

            return () => clearTimeout(timeout);
        } else {
            setShowNavigationContent(false);

            const timeout = setTimeout(() => {
                setShowNavigation(false);

                setTimeout(() => {
                    setTransitionScreenActive(false);

                    setTimeout(() => {
                        setShowMenu(true);
                        setShowContent(true);
                    }, 500);
                }, 0);
            }, 750);

            return () => clearTimeout(timeout);
        }
    }, [switchNavigation, showLoader, setShowContent]);

    // Loader sequence
    useEffect(() => {
        if (skipLoader) {
            setShowLoader(false);
            setShowContent(true);
            setShowMenu(true);
            return;
        }

        setShowLoaderContent(true);
        window.scrollTo(0, 0);

        const timeout = setTimeout(() => {
            setShowLoaderContent(false);

            setTimeout(() => {
                setShowLoader(false);

                setTimeout(() => {
                    setShowContent(true);
                    setShowMenu(true);
                }, 500);
            }, 500);
        }, 1500);

        return () => clearTimeout(timeout);
    }, [setShowContent, skipLoader]);

    return {
        // Loader
        showLoader,
        showLoaderContent,

        // Navigation
        showNavigation,
        showNavigationContent,
        switchNavigation,
        setSwitchNavigation,

        // Menu
        showMenu,
        setShowMenu,

        // Transition screen
        transitionScreenActive,
    };
}
