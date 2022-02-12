import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import commentBubble from '../../assets/shared/icon-comments.svg';
import './Feedback.css';

export default function Feedback() {
    const { id } = useParams();
    const navigate= useNavigate();
    const isCreator = false;
    const [data, setData] = useState({ title: '', category: '', upvotes: 0, description: '', comments: []});
    const maxCharacters = 250;
    const [comment, setComment] = useState('');

    useEffect(() => {
        //console.log(id)
        axios.get('http://localhost:5050/feedback/'.concat(id))
            .then(res => {
                console.log(res)
                setData(res.data)  
            })
            .catch(err => console.log(err))
    }, [id]);

    function handleFormChange(e) {
        console.log(e.target.value)
        setComment(e.target.value)

    }

    return (
        <div className='feedback'>
            <div className='feedback__buttons'>
                <div className='feedback__buttons__back' onClick={() => navigate('/')}>
                    <img src={leftArrow} alt='back arrow' />
                    <span>Go Back</span>
                </div>
                <button className='btn btn--edit' onClick={() => console.log(data)}>Edit Feedback</button>
            </div> 
            <div className='feedback__details'>
                <p className='feedback__details__title'>{data.title}</p>
                <p className='feedback__details__description'>{data.description}</p>
                <div className='feedback__details__category'>{data.category}</div>
                <div className='feedback__details__engagements'>
                    <button className='btn btn--upvotes'>
                        <span><img src={upArrow} alt='up arrow' /></span>
                        {data.upvotes}
                    </button>
                    <div className='feedback__details__engagements__comments'>
                        <span><img src={commentBubble} alt='comment bubble' /></span>
                        {data.comments.length}
                    </div>
                </div>
            </div>

            <div className='feedback__comments'></div>
            
            <div className='feedback__add-comment'>
                <form className='comment-form'>
                    <label htmlFor='comment-input'>Add Comment</label>
                    <input type='text' onChange={handleFormChange} id='comment-input' name='comment-input' />
                    <div className='comment-form__bottom'>
                        <p>{maxCharacters - comment.length} Characters left</p>
                        <button className='btn btn--post'>Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
