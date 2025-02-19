import React, { useState } from 'react';
import {
    Tooltip
} from "@/Components/minimalist/Tooltip"

export const Accordeon = ({ children, className }) => {
    const [openSection, setOpenSection] = useState(null);

    function toggleSection(index) {
        setOpenSection(openSection === index ? null : index);
    }

    const childrenWithProps = React.Children.map(children, (child, index) => {
        return React.cloneElement(child, {
            isOpen: openSection === index,
            onToggle: () => toggleSection(index),
            index: index,
        });
    });

    return <div className={`accordeon ${className}`}>{childrenWithProps}</div>;
};


export const AccordeonChildren = ({ children, isOpen, onToggle }) => {

    const childrenWithProps = React.Children.map(children, (child) => {
        return React.cloneElement(child, { isOpen, onToggle });
    });

    return <div className="accordeon-children">{childrenWithProps}</div>;
};

export const AccordeonLabel = ({ children, onToggle, isOpen }) => {
    return (
        <div className={`accordeon-label ${isOpen ? 'open' : ''}`} >
            <span>{children}</span>
            <Tooltip label={isOpen ? 'Collapse' : 'Expand'} >
                <button
                    onClick={onToggle}
                    className="hover__effect"
                >
                    <svg width="3" height="6" viewBox="0 0 3 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.32025 5.80038L2.86725 3.25338C2.88471 3.23597 2.89857 3.21528 2.90802 3.1925C2.91747 3.16972 2.92234 3.1453 2.92234 3.12063C2.92234 3.09597 2.91747 3.07155 2.90802 3.04877C2.89857 3.02599 2.88471 3.0053 2.86725 2.98788L0.32025 0.440883C0.294027 0.414593 0.260587 0.396681 0.224172 0.389419C0.187756 0.382156 0.150004 0.38587 0.115701 0.400089C0.081399 0.414308 0.0520909 0.438392 0.0314927 0.469288C0.0108944 0.500184 -6.61367e-05 0.5365 3.00246e-07 0.573633L3.00246e-07 5.66763C-6.61367e-05 5.70477 0.0108944 5.74108 0.0314927 5.77198C0.0520909 5.80287 0.081399 5.82696 0.115701 5.84118C0.150004 5.8554 0.187756 5.85911 0.224172 5.85185C0.260587 5.84458 0.294027 5.82667 0.32025 5.80038Z" fill="#8B949E"/>
                    </svg>
                </button>
            </Tooltip>
        </div>
    );
};

export const AccordeonContent = ({ children, isOpen }) => {
    return (
        <div className={`accordeon-content ${isOpen ? 'open' : ''}`}>
            {children}
        </div>
    );
};
