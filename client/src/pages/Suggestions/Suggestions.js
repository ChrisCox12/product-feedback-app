import React, { useState } from 'react';
import './Suggestions.css';
import hamburger from '../../assets/shared/mobile/icon-hamburger.svg';
import close from '../../assets/shared/mobile/icon-close.svg';

export default function Suggestions() {
    const [toggle, setToggle] = useState(false);

    function toggleSidebar() {
        setToggle(!toggle);
    }

    return (
        <div className='suggestions'>
            <div className='suggestions__head'></div>
        
            <div className='suggestions__head--mobile'>
                <div className='suggestions__head--mobile__title'>
                    <p>Frontend Mentor</p>
                    <p>Feedback Board</p>
                </div>

                <div className='suggestions__head--mobile__menu' onClick={toggleSidebar}>
                    {toggle ? 
                        <img src={close} alt='close menu' />
                        : 
                        <img src={hamburger} alt='hamburger menu' />
                    }
                </div> 
            </div>

            <div className='suggestions__head--mobile__sidebar'>
                <div className='suggestions__head--mobile__sidebar__overlay'></div>

                <div className='suggestions__head--mobile__sidebar__content'>
                    <div className='suggestions__head--mobile__sidebar__content__suggestion-selectors'>
                        <button className='btn btn--suggestion-selector selected'>All</button>
                        <button className='btn btn--suggestion-selector'>UI</button>
                        <button className='btn btn--suggestion-selector'>UX</button>
                        <button className='btn btn--suggestion-selector'>Enhancement</button>
                        <button className='btn btn--suggestion-selector'>Bug</button>
                        <button className='btn btn--suggestion-selector'>Feature</button>
                    </div>

                    <div className='suggestions__head--mobile__sidebar__content__roadmap-stats'>
                        <div className='suggestions__head--mobile__sidebar__content__roadmap-stats__header'>
                            <p>Roadmap</p>
                            <button className='btn btn--view'>View</button>
                        </div>
                        
                        <ul>
                            <li>Planned</li>
                            <li>In-Progress</li>
                            <li>Live</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='suggestions__sort-bar'></div>

            <div className='suggestions__suggested-feedbacks'></div>
        </div>
        
    );
}
