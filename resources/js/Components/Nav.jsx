import { Link } from "@inertiajs/react";
import { useState } from "react";
import { LinkLoader } from "@/Components/minimalist/LinkLoader";

export default function Nav({ isOnHome, version }) {
    const [navOpen, setNavOpen] = useState(true);

    const [activeLink, setActiveLink] = useState(version);
    const [theme, setTheme] = useState("light");


    const toggleNav = () => setNavOpen(!navOpen);

    function handleLinkClick(event, link) {
        if (event.target.classList.contains("disabled")) {
            event.preventDefault();
            return;
        }

        setActiveLink(link);
    }

    return (
        <>
            <nav className={`${navOpen ? "open" : "closed"}`}>
                {isOnHome ? (
                    // <div className="link-group">
                    //     <a
                    //         href="javascript:void(0);"
                    //         className={`link disabled ${
                    //             activeLink === "graphic-design" ? "active" : ""
                    //         }`}
                    //         onClick={(e) =>
                    //             handleLinkClick(e, "graphic-design")
                    //         }
                    //         title="Coming soon"
                    //     >
                    //         Graphic Design
                    //     </a>
                    //     <a
                    //         href="javascript:void(0);"
                    //         className={`link ${
                    //             activeLink === "minimalist" ? "active" : ""
                    //         }`}
                    //         onClick={(e) => handleLinkClick(e, "minimalist")}
                    //     >
                    //         Minimalist
                    //     </a>
                    // </div>
                    <div className="nav-content">
                        <NavSelect selected={activeLink}>
                            <NavSelectItem
                                is_selected={activeLink === "graphic-design"}
                            >
                                Graphic Design
                            </NavSelectItem>
                            <NavSelectItem
                                is_selected={activeLink === "minimalist"}
                            >
                                Minimalist
                            </NavSelectItem>
                        </NavSelect>
                        <NavSeparator />
                        <NavSelect selected={theme}>
                            <NavSelectItem
                                is_selected={theme === "light"}
                            >
                                Light Mode
                            </NavSelectItem>
                            <NavSelectItem
                                is_selected={theme === "dark"}
                            >
                                Dark Mode
                            </NavSelectItem>
                        </NavSelect>
                    </div>
                ) : (
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
                        Go back
                    </LinkLoader>
                )}

                <NavCloseButton onClick={toggleNav} />
            </nav>
        </>
    );
}

export const NavSelect = ({ children, selected, ...props }) => {
    const [open, setOpen] = useState(false);

    return (
        <div className={`nav-select  ${open ? "active" : ""}`} {...props}>
            <div className='nav-select-container'>
                {children}
            </div>
            <NavSelectButton onClick={() => setOpen(!open)}>
                {selected}
            </NavSelectButton>
        </div>
    );
};

export const NavSelectButton = ({ children, ...props }) => {
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
};

export const NavSelectItem = ({ children, is_selected, ...props }) => {
    return (
        <button
            className={`nav-select-item ${is_selected ? "active" : ""}`}
            {...props}
        >
            {children}
        </button>
    );
};

export const NavSeparator = () => {
    return <div className="nav-separator" />;
};

export const NavCloseButton = ({ onClick }) => {
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
};
