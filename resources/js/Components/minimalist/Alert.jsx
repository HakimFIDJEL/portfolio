import React, { useState } from 'react';

export const Alert = ({ children, variant }) => {
    return (
        <div className={`alert alert-${variant}`}>
            {children}
        </div>
    );
}