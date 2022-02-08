import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import hamburger from '../../assets/shared/mobile/icon-hamburger.svg';
import close from '../../assets/shared/mobile/icon-close.svg';
import plus from '../../assets/shared/icon-plus.svg';
import arrowDown from '../../assets/shared/icon-arrow-down.svg';
import arrowUp from '../../assets/shared/icon-arrow-up.svg';
import emptyIllustration from '../../assets/suggestions/illustration-empty.svg';
import './Suggestions.css';

export default function Suggestions() {
    const [toggle, setToggle] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [sortBy, setSortBy] = useState('sort');
    const [isNoFeedback, setIsNoFeedback] = useState(false);
    const [currentUser, setCurrentUser] = useState({ image: '', name: '', username: '' });
    const navigate = useNavigate();

    useEffect(() => {
        setCurrentUser({
            image: "./assets/user-images/image-zena.jpg",
            name: "Zena Kelley",
            username: "velvetround"
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:5050/feedback')
            .then(res => {
                if (res.data.length === 0) {
                    console.log('no data')
                    setIsNoFeedback(true);
                }
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('overlay');

        if(toggle) {
            sidebar.classList.add('showSidebar');
            overlay.classList.add('showOverlay');
        }
        else {
            sidebar.classList.remove('showSidebar');
            overlay.classList.remove('showOverlay');
        }
    }, [toggle]);

    useEffect(() => {
        const dropdown = document.getElementById('dropdown');

        if(toggleDrop) {
            dropdown.classList.add('showDropdown');
        }
        else {
            dropdown.classList.remove('showDropdown');
        }
    }, [toggleDrop]);


    function toggleSidebar() {
        setToggle(!toggle);
    }

    function toggleDropDown() {
        setToggleDrop(!toggleDrop);
    }

    function setSort(sortBy) {
        setSortBy(sortBy);
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
                <div className='suggestions__sort-bar__dropdown'>
                    <div className='suggestions__sort-bar__dropdown__sort-by' onClick={toggleDropDown}>
                        Sort by :
                            <span>
                                {sortBy} { toggleDrop ? <img src={arrowUp} alt='up arrow' /> : <img src={arrowDown} alt='down arrow' /> }
                            </span>
                    </div>

                    <div className='suggestions__sort-bar__dropdown__dropdown-content' id='dropdown'>
                        <button className='btn--sort-option' onClick={() => setSort('Most Upvotes')}>Most Upvotes</button>
                        <button className='btn--sort-option' onClick={() => setSort('Least Upvotes')}>Least Upvotes</button>
                        <button className='btn--sort-option' onClick={() => setSort('Most Comments')}>Most Comments</button>
                        <button className='btn--sort-option' onClick={() => setSort('Least Comments')}>Least Comments</button>
                    </div>
                </div>
                <button className='btn btn--add-feedback' onClick={() => navigate('/feedback/new')}><span><img src={plus} alt='plus sign' /></span> Add Feedback</button>
            </div>

            <div className='suggestions__suggested-feedbacks'>
                {isNoFeedback ?
                    <div className='no-feedback'>
                        <img src={emptyIllustration} alt='There is no feedback' />
                        <p>There is no feedback yet.</p>
                        <p>
                            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
                        </p>
                        <button className='btn btn--add-feedback' onClick={() => navigate('/feedback/new')}><span><img src={plus} alt='plus sign' /></span> Add Feedback</button>
                    </div>
                    :
                    <p>There is feedback</p>
                }
            </div>

            <div className='suggestions__overlay' id='overlay' onClick={toggleSidebar}></div>

            <div className='suggestions__sidebar' id='sidebar'>
                <div className='suggestions__sidebar__suggestion-selectors'>
                    <button className='btn btn--suggestion-selector selected'>All</button>
                    <button className='btn btn--suggestion-selector'>UI</button>
                    <button className='btn btn--suggestion-selector'>UX</button>
                    <button className='btn btn--suggestion-selector'>Enhancement</button>
                    <button className='btn btn--suggestion-selector'>Bug</button>
                    <button className='btn btn--suggestion-selector'>Feature</button>
                </div>
                
                <div className='suggestions__sidebar__roadmap-stats'>
                    <div className='suggestions__sidebar__roadmap-stats__header'>
                        <p className='suggestions__sidebar__roadmap-stats__header__title'>Roadmap</p>
                        <button className='btn btn--view'>View</button>
                    </div>

                    <div className='suggestions__sidebar__roadmap-stats__stats'>
                        <ul>
                            <li>Planned</li>
                            <li>In-Progress</li>
                            <li>Live</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        
    );
}
