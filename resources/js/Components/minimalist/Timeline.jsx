import React, { useState } from 'react';

export const Timeline = ({ children, className }) => {
    return <div className={`timeline ${className ? className : ""}`}>
        <div className='timeline-line'></div>
        {children}
    </div>;
};

export const TimelineItem = ({ label, date, duration }) => {
    return <>
        <div className="timeline-item">
            <div className="timeline-content">
                <h5>
                    {label}
                </h5>
                <p>
                    {date} &bull; {duration}
                </p>
            </div>
        </div>
    </>;
};