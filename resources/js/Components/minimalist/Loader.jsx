import React from 'react'; 

export const Loader = ({ display }) => {

    if(!display) return null;
    
    return (
        <aside className="loader">
            <div className="loader-open">
                <div className='loader-open-up'/>
                <div className='loader-open-down'/>
            </div>
            <div className="loader-close">
                <div className='loader-close-left'/>
                <div className='loader-close-right'/>
            </div>
            <div className="preloader">
                <div class="banter-loader">
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                    <div class="banter-loader__box"></div>
                </div>
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
