import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SharedStyles/styles.css';
import './Roadmap.css';
import plus from '../../assets/shared/icon-plus.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';

export default function Roadmap() {
    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [status, setStatus] = useState('In-Progress');

    useEffect(() => {
        axios.get('http://localhost:5050/feedback')
            .then(res => {
                //console.log(res.data);
                setContent(res.data);
            })
            .catch(err => console.log(err))
    }, []);

    return (
        <div className='roadmap'>
            <div className='roadpmap__head'>
                <div className='roadmap__head__back'>
                    <button className='btn' onClick={() => navigate('/')}>
                        <img src={leftArrow} alt='back arrow' />
                        <span>Go Back</span>
                    </button>
                    <p>Roadmap</p>
                </div>
                <button className='btn btn--add-feedback'>
                    <img src={plus} alt='plus' />{' '}
                    <span>Add Feedback</span>
                </button>
            </div>

            <div className='roadmap__statuses'>
                <button>Planned ({})</button>
                <button>In-Progress ({})</button>
                <button>Live ({})</button>
            </div>

            <div className='roadmap__content'>
                
            </div>
        </div>
    );
}
