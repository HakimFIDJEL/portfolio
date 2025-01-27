import { Link } from "@inertiajs/react";
import { useState, useCallback, useMemo, useEffect } from "react";
import { LinkLoader } from "@/Components/minimalist/LinkLoader";
import React from "react";
import { set } from "date-fns";

import {
    Sun,
    Moon,
} from "lucide-react"

// Mapping des liens
const linkMap = {
    'minimalist': { title: 'Minimalist', disabled: false, href: "" },
    'graphic-design': { title: 'Graphic Design', disabled: true, href: null },
};



export default function Nav({ isOnHome, version }) {
    const [navOpen, setNavOpen] = useState(true);
    const [activeLink, setActiveLink] = useState(version);
    const [theme, setTheme] = useState("dark");
    const [selectOpen, setSelectOpen] = useState(false);

    // Toggle du nav
    const toggleNav = useCallback(() => setNavOpen(prev => !prev), []);

    function toggleTheme() {
        if(theme == "light") {
            setTheme("dark");
            document.body.classList.add("dark");
        } else {
            setTheme("light");
            document.body.classList.remove("dark");
        }
    }

    // Fonction pour obtenir le nom actif
    const getActiveLink = useCallback((link) => {
        return linkMap[link].title || "Error";
    }, []);

    // Gestion du clic sur un lien
    const handleLinkClick = useCallback((e, link) => {
        e.preventDefault();
        setActiveLink(link);
        setSelectOpen(false); // Ferme le sélecteur après la sélection
        window.location.href = linkMap[link].href;
    }, []);

    // Mémoriser les éléments de NavSelectItem pour éviter de les recréer à chaque rendu
    const navSelectItems = useMemo(() => (
        Object.keys(linkMap).map((link) => (
            <NavSelectItem
                key={link}
                is_selected={activeLink === link}
                onClick={(e) => handleLinkClick(e, link)}
                disabled={linkMap[link].disabled}
                title={linkMap[link].disabled ? 'Coming soon' : ''}
            >
                {getActiveLink(link)}
            </NavSelectItem>
        ))
    ), [linkMap, activeLink, handleLinkClick, getActiveLink]);

    return (
        <>
            <nav className={`${navOpen ? "open" : "closed"}`}>
                {isOnHome ? (
                    <div className="nav-content">
                        <NavSelect 
                            selected={getActiveLink(activeLink)}
                            open={selectOpen}
                            setOpen={setSelectOpen}
                        >
                            {navSelectItems}
                        </NavSelect>
                        <NavSeparator />
                        <NavToggle
                            selected={theme}
                            onClick={toggleTheme}
                        >
                            <NavToggleItem
                                is_selected={theme === "light"}
                            >
                                <span>
                                    Light
                                </span>
                                <Sun size={16} />
                            </NavToggleItem>

                            <NavToggleItem
                                is_selected={theme === "dark"}
                            >
                                <span>
                                    Dark
                                </span>
                                <Moon size={16} />
                            </NavToggleItem>

                        </NavToggle>
                    </div>
                ) : (
                    <div className="nav-content">
                        <LinkLoader
                            href="/"
                            preserveScroll
                            className="back-button hover__effect"
                        >
                            <svg
                                width="15"
                                height="13"
                                viewBox="0 0 15 13"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M15 7H2.75003L8.00003 12.25L7.34003 13L0.840027 6.5L7.34003 0L8.00003 0.75L2.75003 6H15V7Z"
                                    fill="#C9D1D9"
                                />
                            </svg>
                            <span>
                                Go back
                            </span>
                        </LinkLoader>
                        <NavSeparator />
                        <NavToggle
                            selected={theme}
                            onClick={toggleTheme}
                        >
                            <NavToggleItem
                                is_selected={theme === "light"}
                            >
                                <span>
                                    Light
                                </span>
                                <Sun size={16} />
                            </NavToggleItem>

                            <NavToggleItem
                                is_selected={theme === "dark"}
                            >
                                <span>
                                    Dark
                                </span>
                                <Moon size={16} />
                            </NavToggleItem>
                        </NavToggle>
                    </div>
                    
                )}

                <NavCloseButton onClick={toggleNav} />
            </nav>
        </>
    );
}

const NavToggle = React.memo(({ children, selected, onClick, ...props }) => {
    return (
        <button className="nav-toggle" onClick={onClick} {...props}>
            {children}
        </button>
    );
});

const NavToggleItem = React.memo(({ is_selected, children }) => {

    return (
        <div className={`nav-toggle-item ${is_selected ? "active" : ""}`}>
            {children}
        </div>
    );

});

const NavSelect = React.memo(({ children, selected, open, setOpen, ...props }) => {
    const toggleOpen = () => setOpen(prev => !prev);

    const handleClickOutside = useCallback((e) => {
        if (!e.target.closest('.nav-select')) {
            setOpen(false);
        }
    }, [setOpen]);

    useEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open, handleClickOutside]);

    return (
        <div className={`nav-select ${open ? "active" : ""}`} {...props}>
            <NavSelectButton onClick={toggleOpen}>
                {selected}
            </NavSelectButton>
            <div className={`nav-select-container ${open ? "active" : ""}`}>
                {children}
            </div>
        </div>
    );
});

const NavSelectButton = React.memo(({ children, ...props }) => {
    return (
        <button className='nav-select-button' {...props}>
            {children}
            <svg
                width="3"
                height="6"
                viewBox="0 0 3 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0.32025 5.80038L2.86725 3.25338C2.88471 3.23597 2.89857 3.21528 2.90802 3.1925C2.91747 3.16972 2.92234 3.1453 2.92234 3.12063C2.92234 3.09597 2.91747 3.07155 2.90802 3.04877C2.89857 3.02599 2.88471 3.0053 2.86725 2.98788L0.32025 0.440883C0.294027 0.414593 0.260587 0.396681 0.224172 0.389419C0.187756 0.382156 0.150004 0.38587 0.115701 0.400089C0.081399 0.414308 0.0520909 0.438392 0.0314927 0.469288C0.0108944 0.500184 -6.61367e-05 0.5365 3.00246e-07 0.573633L3.00246e-07 5.66763C-6.61367e-05 5.70477 0.0108944 5.74108 0.0314927 5.77198C0.0520909 5.80287 0.081399 5.82696 0.115701 5.84118C0.150004 5.8554 0.187756 5.85911 0.224172 5.85185C0.260587 5.84458 0.294027 5.82667 0.32025 5.80038Z"
                    fill="#8B949E"
                />
            </svg>
        </button>
    );
});

const NavSelectItem = React.memo(({ children, is_selected, ...props }) => {
    return (
        <button
            className={`nav-select-item ${is_selected ? "active" : ""}`}
            {...props}
        >
            {children}
        </button>
    );
});

const NavCloseButton = React.memo(({ onClick }) => {
    return (
        <button onClick={onClick} className="close-button hover__effect">
            <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1.15182 11.0469L0.585419 10.4805L5.06542 6.0005L0.585419 1.5205L1.15182 0.954102L5.63182 5.4341L10.1118 0.954102L10.6782 1.5205L6.19822 6.0005L10.6782 10.4805L10.1118 11.0469L5.63182 6.5669L1.15182 11.0469Z"
                    fill="white"
                />
            </svg>
        </button>
    );
});

export const NavSeparator = React.memo(() => {
    return <div className="nav-separator" />;
});
