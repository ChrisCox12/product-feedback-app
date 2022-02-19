import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import plus from '../../assets/shared/icon-plus.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import downArrow from '../../assets/shared/icon-arrow-down.svg';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import check from '../../assets/shared/icon-check.svg';
import newFeedbackIcon from '../../assets/shared/icon-new-feedback.svg';
import './NewFeedback.css';
import '../SharedStyles/styles.css';

export default function NewFeedback() {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [feedbackTitle, setFeedbackTitle] = useState('');
    const [category, setCategory] = useState('Feature');
    const [feedbackDetail, setFeedbackDetail] = useState('');
    const navigate = useNavigate();
    const user = useSelector(state => state.user);

    //useEffect(() => console.log(user), [])

    function handleTitleChange(e) {
        setFeedbackTitle(e.target.value);
    }

    function handleDetailChange(e) {
        setFeedbackDetail(e.target.value);
    }

    function handleCategoryChange(str) {
        setCategory(str);
        setToggleDropdown(!toggleDropdown);
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const toSubmit = {
            title: feedbackTitle,
            category: category,
            description: feedbackDetail,
            creatorID: user.userID
        };
        
        axios.post('http://localhost:5050/feedback', toSubmit)
            .then(res => {
                console.log(res)
                navigate('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className='new-feedback'>
            <div className='new-feedback__back' onClick={() => navigate('/')}>
                <img src={leftArrow} alt='back arrow' />
                <span>Go Back</span>
            </div>

            <div className="new-feedback__form-wrapper">
                <img className='new-feedback__form-wrapper__img' src={newFeedbackIcon} alt='new feedback' />
                <form className='new-feedback__form' onSubmit={handleSubmit}>
                    <p className='new-feedback__form__form-header'>Create New Feedback</p>
                    <div className='new-feedback__form__title'>
                        <label className='new-feedback__form__title__header' htmlFor='feedback-title'>Feedback Title</label>
                        <p className='new-feedback__form__title__sub'>Add a short, descriptive headline</p>
                        <input type='text' id='feedback-title' name='feedback-title' onChange={handleTitleChange} />
                    </div>
                    <div className='new-feedback__form__category'>
                        <p className='new-feedback__form__category__header'>Category</p>
                        <p className='new-feedback__form__category__sub'>Choose a category for your feedback</p>
                        <div className='new-feedback__form__category__select' onClick={() => setToggleDropdown(!toggleDropdown)}>
                            <span id='category-select'>{category}</span>
                            {toggleDropdown ?
                                <img src={upArrow} alt='up arrow' />
                                :
                                <img src={downArrow} alt='down arrow' />
                            }
                        </div>
                        {toggleDropdown &&
                            <ul className='new-feedback__form__category__dropdown'>
                                <li onClick={() => handleCategoryChange('Feature')}>
                                    Feature {category === 'Feature' && <span><img src={check} alt='checked' /></span>}
                                </li>
                                <li onClick={() => handleCategoryChange('UI')}>
                                    UI {category === 'UI' && <span><img src={check} alt='checked' /></span>}
                                </li>
                                <li onClick={() => handleCategoryChange('UX')}>
                                    UX {category === 'UX' && <span><img src={check} alt='checked' /></span>}
                                </li>
                                <li onClick={() =>handleCategoryChange('Enhancement')}>
                                    Enhancement {category === 'Enhancement' && <span><img src={check} alt='checked' /></span>}
                                </li>
                                <li onClick={() => handleCategoryChange('Bug')}>
                                    Bug {category === 'Bug' && <span><img src={check} alt='checked' /></span>}
                                </li>
                            </ul>
                        }
                    </div>
                    <div className='new-feedback__form__detail'>
                        <label className='new-feedback__form__detail__header' htmlFor='detail'>Feedback Detail</label>
                        <p className='new-feedback__form__title__sub'>Include any specific comments on what should be improved, added, etc.</p>
                        <input type='text' name='feedback-description' id='feedback-description' onChange={handleDetailChange} />
                    </div>
                    <div className='new-feedback__form__buttons'>
                        <input type='submit' value='Add Feedback' className='btn btn--save' />
                        <button className='btn btn--cancel' onClick={() => navigate('/')}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
