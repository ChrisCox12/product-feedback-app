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
import Comments from '../../components/Comments';

export default function Feedback() {
    const { id } = useParams();
    const navigate= useNavigate();
    const isCreator = false;
    const [data, setData] = useState({ title: '', category: '', upvotes: 0, description: '', comments: [] });
    const maxCharacters = 250;
    const [commentText, setCommentText] = useState('');
    const [commentIds, setCommentIds] = useState([]);
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
        /* const postRequest = axios.get('http://localhost:5050/feedback/'.concat(id));
        const commentsRequest = axios.get('http://localhost:5050/comments');

        axios.all([postRequest, commentsRequest])
            .then(
                axios.spread((...responses) => {
                    const res1 = responses[0].data;
                    const res2 = responses[1].data;

                    console.log( res1, res2 );

                    setData(res1);
                    setCommentIds(res2);
                })
            )
            .catch(err => {
                console.log(err)
            }) */
    }, [id]);

    function handleFormChange(e) {
        //console.log(e.target.value)
        setCommentText(e.target.value)
    }

    async function handleFormSubmit(e) {
        e.preventDefault();

        const newComment = {
            content: commentText,
            creator: {
                image: user.image,
                name: user.name,
                username: user.username,
                creatorID: user.userID
            }
        }

        try {
            const commentRequest = await axios.post('http://localhost:5050/comments', newComment);
            console.log(commentRequest);
            const postRequest = await axios.patch('http://localhost:5050/feedback/'.concat(id, '/comment/', commentRequest.data._id))
            console.log(postRequest);
            //const postRequest = axios.patch('http')
        } catch (error) {
            console.log(error)
        }
        
        /* const newComment = {
            content: commentText,
            creator: {
                image: user.image,
                name: user.name,
                username: user.username,
                creatorID: user.userID
            }
        };

        data.comments.push(newComment);

        //console.log(data);

        setData({...data});

        axios.patch('http://localhost:5050/feedback/'.concat(id, '/comment'), newComment)
            .then(res => console.log(res.data))
            .catch(err => console.log(err)); */

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
                {/* <Comments comments={data.comments} /> */}
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
                            <p>{maxCharacters - commentText.length} Characters left</p>
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
