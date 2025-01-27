import React from 'react'; 

export const Loader = ({ display }) => {

    if(!display) return null;
    
    return (
        <aside className="loader">
            <div className="loader-panels">
                <div className='loader-panel-left'/>
                <div className='loader-panel-right'/>
            </div>
        </aside>
    )
}

export const openLoader = () => {
    document.querySelector('.loader').classList.add('opened');
    document.querySelector('.loader').classList.remove('closed');
}

export const closeLoader = () => {
    document.querySelector('.loader').classList.add('closed');
    document.querySelector('.loader').classList.remove('opened');
}

export const loaderExists = () => {
    return document.querySelector('.loader') ? true : false;
}
