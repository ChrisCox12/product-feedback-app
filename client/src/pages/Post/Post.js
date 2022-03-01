import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import commentBubble from '../../assets/shared/icon-comments.svg';
import Comment from '../../components/Comment';
import './Post.css';
import '../SharedStyles/styles.css';
import { signIn } from '../../actions';
import Comments from '../../components/Comments';

export default function Post() {
    const { id } = useParams();
    const navigate= useNavigate();
    const isCreator = false;
    const [data, setData] = useState({ title: '', category: '', upvotes: 0, description: '', comments: [], numComments: 0 });
    const maxCharacters = 250;
    const [commentText, setCommentText] = useState('');
    const [commentIds, setCommentIds] = useState([]);
    const isSignedIn = useSelector(state => state.isLogged);
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [numComments, setNumComments] = useState(0);
    const [rootComments, setRootComments] = useState([]);
    const [subComments, setSubComments] = useState([]);
    const COMMENTS_STRING = 'http://localhost:5050/comments/';
    const FEEDBACK_STRING = 'http://localhost:5050/feedback/';

    useEffect(() => {
        axios.get(FEEDBACK_STRING.concat(id))
            .then(res => {
                console.log(res.data)
                setData(res.data);
                setCommentIds(res.data.comments); 
                setNumComments(res.data.numComments);
            })
            .catch(err => console.log(err))
        
    }, [id]);

    useEffect(() => {
        
        const controller = new AbortController();

        async function getRootComments() {
            //let newRootComments = [...rootComments];
            let newRootComments = [];

            for(let i = 0; i < commentIds.length; i++) {
                await axios.get(COMMENTS_STRING.concat(commentIds[i]))
                    .then(res => {
                        console.log(res.data);
                        newRootComments.push(res.data);
                    })
                    .catch(err => console.log(err))
            }
            
            setRootComments(newRootComments);
        }


        if(commentIds.length > 0 && rootComments.length === 0) getRootComments();

        return () => controller.abort();
    }, [commentIds, rootComments]);

    useEffect(() => {
        console.log('root comments: ', rootComments)
        //have to get sub comments here
        //      v
        const controller = new AbortController();

        async function getSubComments() {
            let newSubComments = [];

            for(let i = 0; i < rootComments.length; i++) {
                if(rootComments[i].replies.length > 0) {
                    try {
                        const response = await axios.get(COMMENTS_STRING.concat(rootComments[i]._id, '/children'));

                        console.log('Sub comment response: ', response.data);
                        //newSubComments.push(response.data);
                    } 
                    catch(error) {
                        console.log(error);
                    }
                }
            }
        }

        getSubComments();

        return () => controller.abort();
        
    }, [rootComments])


    function handleFormChange(e) {
        setCommentText(e.target.value);
    }

    function incrementTotalComments() {
        const newNumComments = numComments + 1;
        
        setNumComments(newNumComments);
        
        const toSubmit = {
            title: data.title,
            category: data.category,
            upvotes: data.upvotes,
            description: data.description,
            comments: data.comments,
            numComments: newNumComments
        };

        axios.patch('http://localhost:5050/feedback/'.concat(id), toSubmit)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
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
        };

        try {
            const saveCommentRequest = await axios.post('http://localhost:5050/comments', newComment);
            
            await axios.patch('http://localhost:5050/feedback/'.concat(id, '/comment/', saveCommentRequest.data._id));
            await axios.patch('http://localhost:5050/feedback/'.concat(id, '/incrementComments'));

            console.log('save comment request: ', saveCommentRequest.data);

            let rs = [...rootComments];
            rs.push(saveCommentRequest.data);
            setRootComments(rs);
            setCommentText('');
            setNumComments(numComments+1);
        } catch (error) {
            console.log(error)
        }
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
                        {numComments}
                    </div>
                </div>
            </div>

            <div className='feedback__comments'>
                <Comments 
                    totalComments={numComments}
                    rootComments={rootComments}
                />
            </div>
            
            {isSignedIn &&
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
            }
        </div>
    );
}
