import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import './Comment.css';
import '../pages/SharedStyles/styles.css';

export default function Comment({ commentId, rootCommentId, level, parentUsername, replyTo, totalComments, updateTotalComments, incrementTotalComments }) {
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

  useEffect(() => {
    axios.get('http://localhost:5050/comments/'.concat(commentId))
      .then(res => {
        console.log(res.data);
        setName(res.data.creator.name);
        setUsername(res.data.creator.username);
        setText(res.data.content);
        setReplies(res.data.replies);
        setIsReply(res.data.isReply);
        setParent(parentUsername);
        setRootId(rootCommentId);
        //setReplyingTo(replyTo);
        res.data.hasRootId ? setReplyingTo(res.data.replyTo) : setReplyingTo(res.data.creator.username);
      })
      .catch(err => console.log(err))
  }, [commentId])

  function handleReplyChange(e) {
    setReplyText(e.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    setReplying(!replying);

    //const newTotalComments = totalComments + 1;
    //updateTotalComments(newTotalComments);

    incrementTotalComments();
    
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

    axios.post('http://localhost:5050/comments', toSubmit)
      .then(res => {
        //const newReplies = [...replies];
        //newReplies.push(res.data);

        //setReplies(newReplies);
        console.log(res.data)
        axios.patch('http://localhost:5050/comments/'.concat(rootId, '/', res.data))
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
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
        {/* {parent.length > 0 && <span>@{parent}</span>} {' '} */}
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
        <div className='comment__replies'>
          {replies.map((reply, index) => {
            return (
              <Comment 
                commentId={reply} 
                rootCommentId={rootId}
                key={index} 
                level={2} 
                parentUsername={username}
                replyTo={replyingTo}
                incrementTotalComments={incrementTotalComments}
              />
            )
          })}
        </div>
      }
      {/* <div className='comment__head'>
        <div className='comment__head__user'>
          <img className='comment__head__user__image' />
          <div className='comment__head__user__user-info'>
            <p className='comment__head__user__user-info__name'>{comment.creator.name}</p>
            <p className='comment__head__user__user-info__username'>@{comment.creator.username}</p>
          </div>
        </div>
        <button className='comment__head__reply'>Reply</button>
      </div>
      <div className='comment__body'>{comment.content}</div>
      {comment.replies?.length > 0 && 
        <div className='comment__replies'>
          {comment.replies?.map((reply, index) => {
            return <Comment />
          })}
        </div>
      } */}
    </div>
  )
}
