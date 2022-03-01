import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import './Comments.css';

export default function Comments({ totalComments, rootComments }) {

    useEffect(() => {
        
    }, []);

    return (
        <div className='comments-wrapper'>
            <p className='num-comments'>{totalComments} Comments</p>
            <div className='comments-section'>
                {rootComments.map((rootComment, index) => {
                    return (
                        <Comment 
                            key={index} 
                            comment={rootComment}
                        />
                    )
                })}
            </div>
        </div>
    )
}
