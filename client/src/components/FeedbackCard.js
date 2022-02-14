import React, { useEffect, useState } from 'react';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import arrowUpWhite from '../assets/shared/icon-arrow-up-white.svg';
import commentBubble from '../assets/shared/icon-comments.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUpvotedPost, removeUpvotedPost } from '../actions';


export default function FeedbackCard({ item, index }) {
  const navigate = useNavigate();
  const title = item.title || '';
  const [upvotes, setUpvotes] = useState(item.upvotes || 0);
  const description = item.description || '';
  const category = item.category || '';
  const _id = item._id || '';
  const [isUpvoted, setIsUpvoted] = useState(false);
  const divID = 'feedback'.concat(index);
  const isUp = useSelector(state => state.user.upvotedPosts.includes(_id));
  const dispatch = useDispatch();

  useEffect(() => {
    if(isUp) {
      setIsUpvoted(true);
    }
  }, []);

  useEffect(() => {
    const post = document.getElementById(divID);
    const postUpvoteButton = post.childNodes[3].childNodes[0];

    if(isUpvoted) {
      postUpvoteButton.classList.add('upvoted');
    }
    else {
      postUpvoteButton.classList.remove('upvoted');
    }
  }, [isUpvoted]);


  function vote() {
    if(!isUpvoted) {
      dispatch(addUpvotedPost(_id));
      setUpvotes(upvotes + 1);
      setIsUpvoted(true);
    }
    else {
      dispatch(removeUpvotedPost(_id));
      setUpvotes(upvotes - 1);
      setIsUpvoted(false);
    }
  }


  return (
    <div className='suggestions__suggested-feedback__feedback' id={divID}>
      <p 
        className='suggestions__suggested-feedback__feedback__title' 
        onClick={() => navigate('feedback/'.concat(item._id))}
      >{title}</p>
      <p 
        className='suggestions__suggested-feedback__feedback__description' 
        onClick={() => navigate('feedback/'.concat(item._id))}
      >{description}</p>
      <div className='suggestions__suggested-feedback__feedback__category'>{category}</div>
      <div className='suggestions__suggested-feedback__feedback__engagements'>
          <button className='btn btn--upvotes' onClick={vote}>
              <span>
                {isUpvoted ? <img src={arrowUpWhite} alt='upvoted' /> : <img src={arrowUp} alt='upvotes' />}
              </span> 
              {upvotes}
          </button>
          <button className='btn btn--comments' onClick={() => navigate('feedback/'.concat(item._id))}>
              <span><img src={commentBubble} alt='comments' /></span> {item.comments.length}
          </button>
      </div>
    </div>
  )
}
