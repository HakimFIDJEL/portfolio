import React, { useState, useRef } from 'react';
import {
    Tooltip
} from "@/Components/minimalist/Tooltip"

export const Carrousel = ({ children, navigation, pagination }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const carrouselRef = useRef(null);

    function goToSlide(index) {
        if (index < 0 || index >= children.length) return; // Limiter l'index à l'intérieur des bornes

        setCurrentSlide(index);

        // Appliquer le déplacement
        carrouselRef.current.style.transform = `translateX(-${index * 100}%)`;
    }

    function onDrag(e) {


        console.log(e.clientX);



    }

    return (
        <div className="carrousel-container">
            <div className="carrousel-body">
                {/* Flèche gauche */}
                {navigation && (
                    <CarrouselArrow
                        direction="left"
                        onClick={() => goToSlide(currentSlide - 1)}
                        disabled={currentSlide === 0}
                    />
                )}

<Tooltip label={children[currentSlide].props.alt}>
                <div className="carrousel-wrapper">
                    <div className="carrousel" ref={carrouselRef} onDrag={onDrag}>

                        {children.map((child, index) => (
                            <CarrouselItem key={index} active={currentSlide === index}>
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
                        disabled={currentSlide === children.length - 1}
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
                                disabled={currentSlide === children.length - 1}
                            />
                        </div>
                    )}
                    {pagination && (
                        <CarrouselButtons
                            items={children}
                            currentSlide={currentSlide}
                            onClick={(index) => goToSlide(index)}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

const CarrouselItem = ({ children, active }) => {
    return (
        <div className={`carrousel-item ${active ? 'active' : ''}`} >
            <a href={children.props.src} target='_blank' className='carrousel-item-image'>
                {children}
            </a>
        </div>
    );
};

const CarrouselArrow = ({ direction, onClick, disabled }) => {
    return (
        <Tooltip label={direction === 'left' ? 'Previous' : 'Next'}>
            <button
                className={`carrousel-arrow carrousel-arrow-${direction} hover__effect`}
                disabled={disabled}
                onClick={onClick}
            >
                <svg width="15" height="13" viewBox="0 0 15 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.0001 7H2.75009L8.00009 12.25L7.34009 13L0.840088 6.5L7.34009 0L8.00009 0.75L2.75009 6H15.0001V7Z" fill="#C9D1D9" />
                </svg>
            </button>
        </Tooltip>
    );
};

const CarrouselButtons = ({ items, currentSlide, onClick }) => {
    return (
        <div className="carrousel-buttons">
            {items.map((_, index) => (
                <button
                    key={index}
                    className={`carrousel-button ${currentSlide === index ? 'active' : ''}`}
                    onClick={() => onClick(index)}
                />
            ))}
        </div>
    );
};
