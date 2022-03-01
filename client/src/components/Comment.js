import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Comment.css';
import '../pages/SharedStyles/styles.css';
import CommentReplies from './CommentReplies';

export default function Comment({ comment }) {
  //console.log(commentId);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [replies, setReplies] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const user = useSelector(state => state.user);
  const [id, setId] = useState('');
  const [parent, setParent] = useState('');
  const [rootId, setRootId] = useState('');
  const [replyingTo, setReplyingTo] = useState('');
  const [hasRootId, setHasRootId] = useState(false);

  useEffect(() => {
    setText(comment.content);
    setName(comment.creator.name);
    setUsername(comment.creator.username);
    setReplies(comment.replies);
    setHasRootId(comment.hasRootId);
  }, [comment]);

  useEffect(() => {
    if(hasRootId) {
      //const c = document.getElementById
    }
  }, [hasRootId])

  function handleReplyChange(e) {
    setReplyText(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    setReplying(!replying);

    //const newTotalComments = totalComments + 1;
    //updateTotalComments(newTotalComments);

    
    
    const toSubmit = {
      content: replyText,
      creator: {
        image: user.image,
        name: user.name,
        username: user.username,
        creatorID: user.userID
      },
      hasRootId: true,
      rootCommentId: rootId,
      replyTo: replyingTo
    }

    
  }


  return (
    <div className='comment'>
      <div className='comment__head'>
        <div className='comment__head__user'>
          <div className='comment__head__user__user-info'>
            <p className='comment__head__user__user-info__name'>{name}</p>
            <p className='comment__head__user__user-info__username'>@{username}</p>
          </div>
        </div> 
        <button 
          className='comment__head__reply' 
          onClick={() => setReplying(!replying)}
        >Reply</button>  
      </div>
      <div className='comment__body'>
        {replyingTo.length > 0 && <span>@{replyingTo}</span>} {' '}
        {text}
      </div>
      {replying && 
        <div>
          <form onSubmit={handleFormSubmit}>
            <input 
              type='text' 
              onChange={handleReplyChange} 
            />
            <input 
              type='submit' 
              value='Post Reply' 
              className='btn btn--save' 
            />
          </form>
        </div>
      }
      
      {replies.length > 0 && 
        <CommentReplies />
      }
    </div>
  )
}
