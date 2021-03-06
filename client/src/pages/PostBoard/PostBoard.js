import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import hamburger from '../../assets/shared/mobile/icon-hamburger.svg';
import close from '../../assets/shared/mobile/icon-close.svg';
import plus from '../../assets/shared/icon-plus.svg';
import arrowDown from '../../assets/shared/icon-arrow-down.svg';
import arrowUp from '../../assets/shared/icon-arrow-up.svg';
import emptyIllustration from '../../assets/suggestions/illustration-empty.svg';
import './PostBoard.css';
import '../SharedStyles/styles.css';

import PostCard from '../../components/PostCard';

import { useDispatch } from 'react-redux';
import { signIn, setUser } from '../../actions';


export default function PostBoard() {
    const [toggle, setToggle] = useState(false);
    const [toggleDrop, setToggleDrop] = useState(false);
    const [sortBy, setSortBy] = useState('sort');
    const [noPosts, setNoPosts] = useState(false);
    const [currentUser, setCurrentUser] = useState({ image: '', name: '', username: '' });
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const POST_STRING = 'http://localhost:5050/posts/';
    const USER_STRING = 'http://localhost:5050/users/';

    /* useEffect(() => {
        setCurrentUser({
            image: "./assets/user-images/image-zena.jpg",
            name: "Zena Kelley",
            username: "velvetround",
            userID: '6201be50e0963bb111eed761'
        })
    }, []) */

    useEffect(() => {
        axios.get(POST_STRING)
            .then(res => {
                if (res.data.length === 0) {
                    //console.log('no data')
                    setNoPosts(true);
                }
                else {
                    //console.log(res.data);
                    setPosts(res.data);
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

    useEffect(() => {
        let s = [...posts];
        switch (sortBy) {
            case 'Most Upvotes':
                insertionSort(s, s.length, 'mU');
                //console.log(s);
                setPosts(s);
                break;
            case 'Least Upvotes':
                insertionSort(s, s.length, 'lU');
                //console.log(s)
                setPosts(s);
                break;
            case 'Most Comments':
                insertionSort(s, s.length, 'mC');
                //console.log(s);
                setPosts(s);
                break;
            case 'Least Comments':
                insertionSort(s, s.length, 'lC');
                //console.log(s);
                setPosts(s);
                break;
            default:
                break;
        }
    }, [sortBy]);

    function insertionSort(arr, arrLength, str) {
        let i = 0;
        let key = 0;
        let j = 0;

        switch (str) {
            case 'mU':
                for(i = 1; i < arrLength; i++){
                    key = arr[i];
                    j = i - 1;
        
                    while(j >= 0 && key.upvotes > arr[j].upvotes) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
        
                    arr[j + 1] = key;
                }
                break;
            case 'lU':
                for(i = 1; i < arrLength; i++){
                    key = arr[i];
                    j = i - 1;
        
                    while(j >= 0 && arr[j].upvotes > key.upvotes) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
        
                    arr[j + 1] = key;
                }
                break;
            case 'mC':
                for(i = 1; i < arrLength; i++){
                    key = arr[i];
                    j = i - 1;
        
                    while(j >= 0 && key.comments.length > arr[j].comments.length) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
        
                    arr[j + 1] = key;
                }
                break;
            case 'lC':
                for(i = 1; i < arrLength; i++){
                    key = arr[i];
                    j = i - 1;
        
                    while(j >= 0 && arr[j].comments.length > key.comments.length) {
                        arr[j + 1] = arr[j];
                        j = j - 1;
                    }
        
                    arr[j + 1] = key;
                }
                break;
            default:
                break;
        }
    }

    function toggleSidebar() {
        setToggle(!toggle);
    }

    function toggleDropDown() {
        setToggleDrop(!toggleDrop);
    }

    function handleSortChange(sort) {
        setSortBy(sort);
        toggleDropDown();
    }

    function signAndSet() {
        axios.get(USER_STRING.concat('6201be50e0963bb111eed761'))
            .then(res => {
                //console.log(res.data)
                dispatch(signIn());
                dispatch(setUser(res.data));
            })
            .catch(err => console.log(err));
    }

    function signAndSet2() {
        axios.get(USER_STRING.concat('62142a57f09c2c3bae9a3a8c'))
            .then(res => {
                //console.log(res.data)
                dispatch(signIn());
                dispatch(setUser(res.data));
            })
            .catch(err => console.log(err));
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
                        Sort by:{' '}
                            <span>
                                {sortBy} { toggleDrop ? <img src={arrowUp} alt='up arrow' /> : <img src={arrowDown} alt='down arrow' /> }
                            </span>
                    </div>

                    <div className='suggestions__sort-bar__dropdown__dropdown-content' id='dropdown'>
                        <button className='btn--sort-option' onClick={() => handleSortChange('Most Upvotes')}>Most Upvotes</button>
                        <button className='btn--sort-option' onClick={() => handleSortChange('Least Upvotes')}>Least Upvotes</button>
                        <button className='btn--sort-option' onClick={() => handleSortChange('Most Comments')}>Most Comments</button>
                        <button className='btn--sort-option' onClick={() => handleSortChange('Least Comments')}>Least Comments</button>
                    </div>
                </div>
                <button className='btn btn--add-feedback' onClick={() => navigate('/feedback/new')}>
                    <span><img src={plus} alt='plus sign' /></span> Add Feedback
                </button>
            </div>

            <div className='suggestions__suggested-feedback'>
                {noPosts ?
                    <div className='no-feedback'>
                        <img src={emptyIllustration} alt='There is no feedback' />
                        <p>There is no feedback yet.</p>
                        <p>
                            Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.
                        </p>
                        <button className='btn btn--add-feedback' onClick={() => navigate('/feedback/new')}>
                            <span><img src={plus} alt='plus sign' /></span> Add Feedback
                        </button>
                    </div>
                    :
                    posts.map((post, index) => {
                        return <PostCard key={index} post={post} index={index} />
                    })
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
                        <button className='btn btn--view' onClick={() => navigate('/roadmap')}>View</button>
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

            <button onClick={signAndSet}>Sign In</button>
            <button onClick={signAndSet2}>Sign In 2</button>
        </div>
        
    );
}
