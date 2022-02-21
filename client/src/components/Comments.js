import React, { useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ commentIds }) {

    useEffect(() => {
        
    }, []);

    return (
        <div className='comments-wrapper'>
            <p className='num-comments'>{commentIds.length} Comments</p>
            {commentIds.length > 0 &&
                commentIds.map((commentId, index) => {
                    return <Comment commentId={commentId} key={index} level={1} />
                })
            }
            {/* <p className='num-comments'>{comments.length} Comments</p>
            {comments.length > 0 && 
                comments.map((comment, index) => {
                    return <Comment comment={comment} key={index} />
                })
            } */}
        </div>
    )
}
