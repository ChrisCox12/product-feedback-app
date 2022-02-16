import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import commentBubble from '../../assets/shared/icon-comments.svg';
import Comment from '../../components/Comment';
import './Feedback.css';
import '../SharedStyles/styles.css';
import { signIn } from '../../actions';

export default function Feedback() {
    const { id } = useParams();
    const navigate= useNavigate();
    const isCreator = false;
    const [data, setData] = useState({ title: '', category: '', upvotes: 0, description: '', comments: [] });
    const maxCharacters = 250;
    const [comment, setComment] = useState('');
    const isSignedIn = useSelector(state => state.isLogged);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        //console.log(e.target.value)
        setComment(e.target.value)

    }

    function handleFormSubmit(e) {
        e.preventDefault();

        data.comments.push(comment)
        //console.log(data)
    }

    return (
        <div className='feedback'>
            <div className='feedback__buttons'>
                <div className='feedback__buttons__back' onClick={() => navigate('/')}>
                    <img src={leftArrow} alt='back arrow' />
                    <span>Go Back</span>
                </div>
                {user.userID === data.creatorID &&
                    <button 
                        className='btn btn--edit' 
                        onClick={() => navigate('/feedback/edit/'.concat(id))}
                    >Edit Feedback</button>
                }
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

            <div className='feedback__comments'>
                <p className='feedback__comments__num-comments'>{data.comments.length} Comment(s)</p>
                {data.comments.map((comment, index) => {
                    return ( <Comment data={comment} key={index} /> );
                })}
            </div>
            
            {isSignedIn ? 
                <div className='feedback__add-comment'>
                    <form className='comment-form' onSubmit={handleFormSubmit}>
                        <label htmlFor='comment-input'>Add Comment</label>
                        <input 
                            type='text' 
                            onChange={handleFormChange} 
                            id='comment-input' 
                            name='comment-input' 
                        />
                        <div className='comment-form__bottom'>
                            <p>{maxCharacters - comment.length} Characters left</p>
                            <input 
                                type='submit'
                                className='btn btn--post'
                                value='Post Comment' 
                            />
                        </div>
                    </form>
                </div>
                : 
                null
            }
        </div>
    );
}
