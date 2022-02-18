import React, { useEffect, useState } from 'react';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import arrowUpWhite from '../assets/shared/icon-arrow-up-white.svg';
import commentBubble from '../assets/shared/icon-comments.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUpvotedPost, removeUpvotedPost } from '../actions';
import axios from 'axios';
import './FeedbackCard.css';
import '../pages/SharedStyles/styles.css';


export default function FeedbackCard({ item, index }) {
  const navigate = useNavigate();
  const title = item.title || '';
  //const [upvotes, setUpvotes] = useState(item.upvotes || 0);
  const [upvotes, setUpvotes] = useState(0);
  //let upvotes = item.upvotes || 0;
  //const upvotes = item.upvotes || 0;
  const description = item.description || '';
  const category = item.category || '';
  const _id = item._id || '';
  const commentLength = item.comments.length || 0;
  const [isUpvoted, setIsUpvoted] = useState(false);
  const divID = 'feedback'.concat(index);
  const prevUpvoted = useSelector(state => state.user.upvotedPosts.includes(_id));
  const dispatch = useDispatch();

  useEffect(() => {
    if(prevUpvoted) {
      setIsUpvoted(true);
    }
    //setUpvotes(item.upvotes);
  }, []);

  useEffect(() => {
    console.log('item changed');
    console.log('item: ', item.title);
    setUpvotes(item.upvotes);
  }, [item])

  useEffect(() => {
    const post = document.getElementById(divID);
    const postUpvoteButton = post.childNodes[3].childNodes[0];
    //console.log(postUpvoteButton);

    if(isUpvoted) {
      postUpvoteButton.classList.add('upvoted');
    }
    else {
      postUpvoteButton.classList.remove('upvoted');
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
    
    axios.patch('http://localhost:5050/feedback/'.concat(_id), { upvotes: newUpvotes })
        .then(res => console.log(res))
        .catch(err => console.log(err));
  }


  return (
    <div className='suggestions__suggested-feedback__feedback' id={divID}>
      <p 
        className='suggestions__suggested-feedback__feedback__title' 
        onClick={() => navigate('/feedback/'.concat(_id))}
      >{title}</p>
      <p className='suggestions__suggested-feedback__feedback__description'>{description}</p>
      <div className='suggestions__suggested-feedback__feedback__category'>{category}</div>
      <div className='suggestions__suggested-feedback__feedback__engagements'>
          <button className='btn btn--upvotes' onClick={vote}>
              <span>
                {isUpvoted ? <img src={arrowUpWhite} alt='upvoted' /> : <img src={arrowUp} alt='upvotes' />}
              </span> 
              <span>{upvotes}</span>
          </button>
          <button className='btn btn--comments' onClick={() => navigate('/feedback/'.concat(_id))}>
              <span><img src={commentBubble} alt='comments' /></span> 
              {commentLength}
          </button>
      </div>
    </div>
  )
}
