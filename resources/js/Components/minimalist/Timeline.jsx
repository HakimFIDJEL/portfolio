import React, { useState, useRef, useEffect, useLayoutEffect } from "react";

import { Tooltip } from "@/Components/minimalist/Tooltip";

export const Timeline = ({ children, className }) => {
    const [scrollPosition, setScrollPosition] = useState(0);
    const scrollableRef = useRef(null);
    const containerRef = useRef(null);
    const [maxScroll, setMaxScroll] = useState(0);
    const [distanceToScroll, setDistanceToScroll] = useState(250);

    useEffect(() => {
        const scrollableWidth = scrollableRef.current.scrollWidth;
        const containerWidth = containerRef.current.offsetWidth;

        setMaxScroll(scrollableWidth - containerWidth);
    }, [scrollableRef, containerRef]);

    const handleScroll = (direction) => {
        const newPosition = scrollPosition + direction;

        if (newPosition < 0) {
            setScrollPosition(0);
            return;
        }

        if (newPosition > maxScroll) {
            setScrollPosition(maxScroll);
            return;
        }

        setScrollPosition(newPosition);
    };

    return (
        <div
            className={`timeline ${className ? className : ""}`}
            ref={containerRef}
        >
            <TimelineButton
                onClick={() => handleScroll(-distanceToScroll)}
                direction="left"
                disabled={scrollPosition === 0}
            />

            {/* Conteneur scrollable */}
            <div
                className="timeline-scrollable"
                ref={scrollableRef}
                style={{
                    transform: `translateX(-${scrollPosition}px)`,
                }}
            >
                {children}
            </div>

            <TimelineButton
                onClick={() => handleScroll(distanceToScroll)}
                direction="right"
                disabled={scrollPosition >= maxScroll}
            />
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
            <div className="timeline-separator" />
        </>
    );
};

export const TimelineButton = ({ onClick, direction, disabled }) => {
    return (
        <div
            className={`
                timeline-button-container 
                ${direction} 
                ${disabled ? "disabled" : ""}
            `}
        >
            <Tooltip
                label={direction === "left" ? "Scroll left" : "Scroll right"}
            >
                <button
                    onClick={onClick}
                    className="timeline-button hover__effect"
                    disabled={disabled}
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
            </Tooltip>
        </div>
    );
};
