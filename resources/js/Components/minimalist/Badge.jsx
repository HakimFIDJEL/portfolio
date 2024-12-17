import React, { useState } from 'react';

export const BadgeContainer = ({ children, title, key }) => {

   
    return (
        <div className="badge-container" key={key}>
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


export const Badge = ({ children, key }) => {

    // get the proficiency level from the children


    return (
        <span className="badge" key={key}>
            {children}
        </span>
    );
};