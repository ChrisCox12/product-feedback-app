import React, { useEffect, useState } from 'react';
import arrowUp from '../assets/shared/icon-arrow-up.svg';
import commentBubble from '../assets/shared/icon-comments.svg';
import { useNavigate } from 'react-router-dom';


export default function FeedbackCard({ item, index }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(item.title || '');
  const [upvotes, setUpvotes] = useState(item.upvotes || 0);
  const [description, setDescription] = useState(item.description || '');
  const [category, setCategory] = useState(item.category || '');
  const [isUpvoted, setIsUpvoted] = useState(false);
  const divID = 'feedback'.concat(index);

  /* useEffect(() => {
    const f = document.getElementById(id);
    
    //console.log(f.childNodes)

    f.childNodes.forEach(child => {
      child.addEventListener('click', () => {
        console.log('yee')
      })
    })

    console.log(f.childNodes)
  }, [id]); */

  function incrementVotes() {
    //item.upvotes = item.upvotes + 1;
  }


  return (
    <div className='suggestions__suggested-feedback__feedback' id={divID} onClick={() => navigate('feedback/'.concat(item._id))}>
        <p className='suggestions__suggested-feedback__feedback__title'>{title}</p>
        <p className='suggestions__suggested-feedback__feedback__description'>{description}</p>
        <div className='suggestions__suggested-feedback__feedback__category'>{category}</div>
        <div className='suggestions__suggested-feedback__feedback__engagements'>
            <button className='btn btn--upvotes' onClick={incrementVotes}>
                <span><img src={arrowUp} alt='upvotes' /></span> {upvotes}
            </button>
            <button className='btn btn--comments'>
                <span><img src={commentBubble} alt='comments' /></span> {item.comments.length}
            </button>
        </div>
    </div>
  )
}
