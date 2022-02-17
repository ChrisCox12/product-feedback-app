import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './RoadmapCard.css';
import '../pages/SharedStyles/styles.css';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import arrowUpWhite from '../assets/shared/icon-arrow-up-white.svg';
import commentBubble from '../assets/shared/icon-comments.svg';

import { addUpvotedPost, removeUpvotedPost } from '../actions';

export default function RoadmapCard({ item, index }) {
    const title = item.title || '';
    const description = item.description || '';
    const category = item.category || '';
    const status = item.status || '';
    const _id = item._id || '';
    const [upvotes, setUpvotes] = useState(item.upvotes || 0);
    const numComments = item.comments.length || 0;
    const cardID = 'roadmap-card--'.concat(status, '-', index);
    const [isUpvoted, setIsUpvoted] = useState(false);
    const prevUpvoted = useSelector(state => state.user.upvotedPosts.includes(_id));
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if(prevUpvoted) {
            setIsUpvoted(true);
        }
    }, []);

    useEffect(() => {
        const card = document.getElementById(cardID);

        switch (status) {
            case 'Planned':
                card.classList.add('card--planned');
                break;
            case 'Live':
                card.classList.add('card--live');
                break;
            default:
                card.classList.add('card--in-progress');
                break;
        }
    }, [cardID, status]);

    useEffect(() => {
        const post = document.getElementById(cardID);
        const upvoteButton = post.childNodes[4].childNodes[0];

        if(isUpvoted) {
            upvoteButton.classList.add('upvoted');
        }
        else {
            upvoteButton.classList.remove('upvoted');
        }
    }, [isUpvoted]);

    function vote() {
        let newUpvotes = upvotes;

        if(!isUpvoted) {
            dispatch(addUpvotedPost(_id));
            newUpvotes = newUpvotes + 1;
            setIsUpvoted(true);
        }
        else {
            dispatch(removeUpvotedPost(_id));
            newUpvotes = newUpvotes - 1;
            setIsUpvoted(false);
        }

        setUpvotes(newUpvotes);

        axios.patch('http://localhost:5050/feedback/'.concat(_id), { upvotes: newUpvotes })
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    return (
        <div className='roadmap-card' id={cardID}>
            <div className='roadmap-card__status'>
                <span className={status}></span> {status}
            </div>
            <p className='roadmap-card__title' onClick={() => navigate('/feedback/'.concat(_id))}>{title}</p>
            <p className='roadmap-card__description'>{description}</p>
            <div className='roadmap-card__category'>{category}</div>
            <div className='roadmap-card__engagements'>
                <button className='btn btn--upvotes' onClick={vote}>
                    <span>
                        {isUpvoted ? <img src={arrowUpWhite} alt='upvoted' /> : <img src={arrowUp} alt='upvotes' />}
                    </span>
                    {upvotes}
                </button>
                <button className='btn btn--comments' onClick={() => navigate('/feedback/'.concat(_id))}>
                    <span><img src={commentBubble} alt='comments' /></span>
                    {numComments}
                </button>
            </div>
        </div>
    )
}
