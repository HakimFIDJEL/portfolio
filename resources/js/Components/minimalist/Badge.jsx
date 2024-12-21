import React, { useState } from 'react';

export const BadgeContainer = ({ children, title }) => {

   
    return (
        <div className="badge-container">
            <h6 className="badge-title">
                {title}
            </h6>
            {children}
        </div>
    );
};

export const BadgeWrapper = ({ children }) => {
    
    return (
        <div className="badge-wrapper">
            {children}
        </div>
    );
};


export const Badge = ({ children }) => {

    // get the proficiency level from the children


    return (
        <span className="badge">
            {children}
        </span>
    );
};