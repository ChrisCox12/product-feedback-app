import React from 'react';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ comments }) {

    return (
        <div className='comments-wrapper'>
            <p className='num-comments'>{comments.length} Comments</p>
            {comments.length > 0 && 
                comments.map((comment, index) => {
                    return <Comment comment={comment} key={index} />
                })
            }
        </div>
    )
}
