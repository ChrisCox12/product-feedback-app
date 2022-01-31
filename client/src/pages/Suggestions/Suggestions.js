import React, { useState, useEffect } from 'react';
import './Suggestions.css';
import hamburger from '../../assets/shared/mobile/icon-hamburger.svg';
import close from '../../assets/shared/mobile/icon-close.svg';
import plus from '../../assets/shared/icon-plus.svg';

export default function Suggestions() {
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if(toggle) {
            sidebar.classList.add('showSidebar');
            //overlay.classList.remove('hideOverlay');
            overlay.classList.add('showOverlay');
        }
        else {
            sidebar.classList.remove('showSidebar');
            overlay.classList.remove('showOverlay');
            //overlay.classList.add('hideOverlay');
        }
    }, [toggle]);


    function toggleSidebar() {
        setToggle(!toggle);
    }


    return (
        <div className='suggestions'>
            <div className='suggestions__head'>
                <div className='suggestions__head__title'>
                    <p>Frontend Mentor</p>
                    <p>Feedback Board</p>
                </div>

                <div className='suggestions__head__menu' onClick={toggleSidebar}>
                    {toggle ?
                        <img src={close} alt='close menu' />
                        :
                        <img src={hamburger} alt='hamburger menu' />
                    }
                </div>
            </div>

            <div className='suggestions__sort-bar'>
                <div className='suggestions__sort-bar__num-suggestions'>6 suggestions</div>
                <div>Sort by : Most Upvotes</div>
                <button className='btn btn--add-feedback'><span><img src={plus} alt='plus sign' /></span> Add Feedback</button>
            </div>

            <div className='suggestions__suggested-feedbacks'>
                <p>zcvjkfgzldfkvbgzdflkffffffffffffffffff</p>
                <button className='btn'>Click</button>
            </div>

            <div className='suggestions__overlay' id='overlay'></div>

            <div className='suggestions__sidebar__content' id='sidebar'>gjkhsdfglksjdfhg</div>

            {/* <div className='suggestions__head--mobile'>
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
            </div> */}

            {/* <div className='suggestions__head--mobile__sidebar'>
                <div className='suggestions__head--mobile__sidebar__overlay' id='overlay--mobile'></div>

                <div className='suggestions__head--mobile__sidebar__content' id='sidebar--mobile'>
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
            </div> */}
        </div>
        
    );
}
