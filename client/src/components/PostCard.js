import React, { useEffect, useState } from 'react';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import arrowUpWhite from '../assets/shared/icon-arrow-up-white.svg';
import commentBubble from '../assets/shared/icon-comments.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUpvotedPost, removeUpvotedPost } from '../actions';
import axios from 'axios';
import './PostCard.css';
import '../pages/SharedStyles/styles.css';


export default function PostCard({ post, index }) {
  const navigate = useNavigate();
  const title = post.title || '';
  const [upvotes, setUpvotes] = useState(0);
  const description = post.description || '';
  const category = post.category || '';
  const _id = post._id || '';
  const commentLength = post.comments.length || 0;
  const [isUpvoted, setIsUpvoted] = useState(false);
  const divID = 'feedback'.concat(index);
  const prevUpvoted = useSelector(state => state.user.upvotedPosts.includes(_id));
  const dispatch = useDispatch();
  const numComments = post.numComments || 0;
  const POST_STRING = 'http://localhost:5050/posts/';

  useEffect(() => {
    if(prevUpvoted) {
      setIsUpvoted(true);
    }
  }, []);

  useEffect(() => {
    setUpvotes(post.upvotes);
  }, [post]);

  useEffect(() => {
    const card = document.getElementById(divID);
    const cardUpvoteButton = card.childNodes[3].childNodes[0];

    if(isUpvoted) {
      cardUpvoteButton.classList.add('upvoted');
    }
    else {
      cardUpvoteButton.classList.remove('upvoted');
    }
  }, [isUpvoted]);


  function vote() {
    let newUpvotes = upvotes;
    //const post = document.getElementById(divID);
    //const postUpvoteButton = post.childNodes[3].childNodes[0];

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
    //upvotes = newUpvotes;
    //postUpvoteButton.childNodes[1].textContent = newUpvotes;
    //upvotes = newUpvotes;
    
    axios.patch(POST_STRING.concat(_id), { upvotes: newUpvotes })
        .then(res => console.log(res))
        .catch(err => console.log(err));
  }


  return (
    <div className='suggested-feedback' id={divID}>
      <p 
        className='suggested-feedback__title' 
        onClick={() => navigate('/post/'.concat(_id))}
      >{title}</p>
      <p className='suggested-feedback__description'>{description}</p>
      <div className='suggested-feedback__category'>{category}</div>
      <div className='suggested-feedback__engagements'>
          <button className='btn btn--upvotes' onClick={vote}>
              <span>
                {isUpvoted ? <img src={arrowUpWhite} alt='upvoted' /> : <img src={arrowUp} alt='upvotes' />}
              </span> 
              <span>{upvotes}</span>
          </button>
          <button className='btn btn--comments' onClick={() => navigate('/feedback/'.concat(_id))}>
              <span><img src={commentBubble} alt='comments' /></span> 
              {numComments}
          </button>
      </div>
    </div>
  )
}
