import React, { useState, useRef, useEffect } from "react";

import { Tooltip } from "@/Components/minimalist/Tooltip";

export const Carrousel = ({ children, navigation, pagination, disabled }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const carrouselRef = useRef(null);

    useEffect(() => {
        const handleKey = (event) => {
            console.log(event.key, disabled, currentSlide, children.length - 1);
            if (event.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
            if (event.key === "ArrowLeft" && !disabled && currentSlide > 0) {
                goToSlide(currentSlide - 1);
            }

            if (
                event.key === "ArrowRight" &&
                !disabled &&
                currentSlide < children.length - 1
            ) {
                goToSlide(currentSlide + 1);
            }
        };

        document.addEventListener("keydown", handleKey);

        return () => {
            document.removeEventListener("keydown", handleKey);
        };
    }, [currentSlide, disabled, children.length, isOpen]);

    function goToSlide(index) {
        if (index < 0 || index >= children.length) return;
        setCurrentSlide(index);
        carrouselRef.current.style.transform = `translateX(-${index * 100}%)`;
    }

    return (
        <>
            <div className="carrousel-container">
                <div className="carrousel-body">
                    {/* Flèche gauche */}
                    {navigation && (
                        <CarrouselArrow
                            direction="left"
                            onClick={() => goToSlide(currentSlide - 1)}
                            disabled={(currentSlide === 0) | disabled}
                        />
                    )}

                    <Tooltip label={children[currentSlide].props.alt}>
                        <div className="carrousel-wrapper">
                            <div className="carrousel" ref={carrouselRef}>
                                {children.map((child, index) => (
                                    <CarrouselItem
                                        key={index}
                                        active={currentSlide === index}
                                        onClick={() => setIsOpen(true)}
                                    >
                                        {child}
                                    </CarrouselItem>
                                ))}
                            </div>
                        </div>
                    </Tooltip>

                    {/* Flèche droite */}
                    {navigation && (
                        <CarrouselArrow
                            direction="right"
                            onClick={() => goToSlide(currentSlide + 1)}
                            disabled={
                                (currentSlide === children.length - 1) |
                                disabled
                            }
                        />
                    )}
                </div>

                {/* Footer avec pagination et navigation */}
                {(navigation || pagination) && (
                    <div className="carrousel-footer">
                        {navigation && (
                            <div className="row carrousel-arrows justify-content-between gap-xs">
                                <CarrouselArrow
                                    direction="left"
                                    onClick={() => goToSlide(currentSlide - 1)}
                                    disabled={currentSlide === 0}
                                />
                                <CarrouselArrow
                                    direction="right"
                                    onClick={() => goToSlide(currentSlide + 1)}
                                    disabled={
                                        currentSlide === children.length - 1
                                    }
                                />
                            </div>
                        )}
                        {pagination && (
                            <CarrouselButtons
                                items={children}
                                currentSlide={currentSlide}
                                onClick={(index) => goToSlide(index)}
                                disabled={disabled}
                            />
                        )}
                    </div>
                )}
            </div>

            <div className={`carrousel-dialog ${isOpen ? "open" : ""}`}>
                <div
                    className="carrousel-dialog-overlay"
                    onClick={() => setIsOpen(false)}
                />
                {children.map((child, index) => (
                    <>
                        <CarrouselItem
                            key={index}
                            active={currentSlide === index}
                            disabled={disabled}
                        >
                            {child}
                            <p>{child.props.alt}</p>
                        </CarrouselItem>
                    </>
                ))}
            </div>
        </>
    );
};

const CarrouselItem = ({ children, active, onClick }) => {
    return (
        <div
            className={`carrousel-item ${active ? "active" : ""}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

const CarrouselArrow = ({ direction, onClick, disabled }) => {
    return (
        <Tooltip label={direction === "left" ? "Previous" : "Next"}>
            <button
                className={`carrousel-arrow carrousel-arrow-${direction} hover__effect`}
                disabled={disabled}
                onClick={onClick}
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
    );
};

const CarrouselButtons = ({ items, currentSlide, onClick, disabled }) => {
    return (
        <div className="carrousel-buttons">
            {items.map((_, index) => (
                <button
                    key={index}
                    className={`carrousel-button ${
                        currentSlide === index ? "active" : ""
                    }`}
                    onClick={() => onClick(index)}
                    disabled={disabled}
                />
            ))}
        </div>
    );
};
