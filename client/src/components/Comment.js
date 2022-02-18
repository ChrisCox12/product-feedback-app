import React from 'react';
import './Comment.css';

export default function Comment({ comment }) {
  console.log(comment)
  return (
    <div className='comment'>
      <div className='comment__head'>
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
    </div>
  )
}
