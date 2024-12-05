import React, { useState, useRef, useEffect } from "react";

export const Timeline = ({ children, className }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollableRef = useRef(null);
    const [maxScroll, setMaxScroll] = useState(0);

    useEffect(() => {
        // Calculer la largeur totale et la largeur visible
        const updateMaxScroll = () => {
            const scrollable = scrollableRef.current;
            if (scrollable) {
                const visibleWidth = scrollable.offsetWidth;
                const totalWidth = scrollable.scrollWidth;
                setMaxScroll(totalWidth - visibleWidth);
            }
        };

        updateMaxScroll();
        window.addEventListener("resize", updateMaxScroll); // Recalcule sur redimensionnement
        return () => window.removeEventListener("resize", updateMaxScroll);
    }, []);

    const handleScroll = (direction) => {
        const newPosition = Math.max(
            0,
            Math.min(scrollPosition + direction, maxScroll)
        );
        setScrollPosition(newPosition);
    };

    return (
        <div className={`timeline ${className ? className : ""}`}>
            {/* Bouton gauche */}
            <button
                onClick={() => handleScroll(-200)}
                className={`timeline-button left ${
                    scrollPosition === 0 ? "disabled" : ""
                }`}
                disabled={scrollPosition === 0}
            >
                <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.0001 7H2.75009L8.00009 12.25L7.34009 13L0.840088 6.5L7.34009 0L8.00009 0.75L2.75009 6H15.0001V7Z"
                        fill="#C9D1D9"
                    />
                </svg>
            </button>

            {/* Conteneur scrollable */}
            <div
                className="timeline-scrollable"
                ref={scrollableRef}
                style={{
                    transform: `translateX(-${scrollPosition}px)`,
                    transition: "transform 0.3s ease",
                }}
            >
                {children}
            </div>

            {/* Bouton droit */}
            <button
                onClick={() => handleScroll(200)}
                className={`timeline-button right ${
                    scrollPosition === maxScroll ? "disabled" : ""
                }`}
                disabled={scrollPosition === maxScroll}
            >
                <svg
                    width="15"
                    height="13"
                    viewBox="0 0 15 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M15.0001 7H2.75009L8.00009 12.25L7.34009 13L0.840088 6.5L7.34009 0L8.00009 0.75L2.75009 6H15.0001V7Z"
                        fill="#C9D1D9"
                    />
                </svg>
            </button>
        </div>
    );
};

export const TimelineItem = ({ label, date, duration }) => {
    return (
        <>
            <div className="timeline-item d-flex flex-column gap-xxs">
                <div className="timeline-title">{label}</div>
                <div className="timeline-info">
                    {date} &bull; {duration}
                </div>
            </div>
        </>
    );
};
