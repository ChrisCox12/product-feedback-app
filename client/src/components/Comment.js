import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Comment.css';

export default function Comment({ commentId, level }) {
  //console.log(commentId);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [text, setText] = useState('');
  const [replies, setReplies] = useState([]);
  const [isReply, setIsReply] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5050/comments/'.concat(commentId))
      .then(res => {
        console.log(res.data);
        setName(res.data.creator.name);
        setUsername(res.data.creator.username);
        setText(res.data.content);
        setReplies(res.data.replies);
        setIsReply(res.data.isReply);
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div className='comment'>
      <div className='comment__head'>
        <div className='comment__head__user'>
          <div className='comment__head__user__user-info'>
            <p className='comment__head__user__user-info__name'>{name}</p>
            <p className='comment__head__user__user-info__username'>@{username}</p>
          </div>
        </div>
        <button className='comment__head__reply'>Reply</button>
      </div>
      <div className='comment__body'>{text}</div>
      {replies.length > 0 && level < 3 ? 
        <div className='comment__replies'>
          {replies.map((reply, index) => {
            return <Comment commentId={reply} key={index} level={level+1} />
          })}
        </div>
        :
        <div>huh</div>
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
