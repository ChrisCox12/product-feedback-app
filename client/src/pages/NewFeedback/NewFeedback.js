import React, { useState, useEffect } from 'react';
import plus from '../../assets/shared/icon-plus.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import downArrow from '../../assets/shared/icon-arrow-down.svg';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import check from '../../assets/shared/icon-check.svg';
import './NewFeedback.css';

export default function NewFeedback() {
    const [toggleDropdown, setToggleDropdown] = useState(false);
    const [category, setCategory] = useState('Feature');


    return (
        <div className='new-feedback'>
            <div className='new-feddback__back'>
                <img src={leftArrow} alt='back arrow' />
                <span>Go Back</span>
            </div>
            <form className='new-feedback__form'>
                <div className='new-feedback__form__plus-icon'>
                    <img src={plus} alt='plus sign' />
                </div>
                <p className='new-feedback__form__form-header'>Create New Feedback</p>
                <div className='new-feedback__form__title'>
                    <label htmlFor='feedback-title'>Feedback Title</label>
                    <p>Add a short, descriptive headline</p>
                    <input type='text' id='feedback-title' name='feedback-title' />
                </div>
                <div className='new-feedback__form__category'>
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
                            <li onClick={() => setCategory('Feature')}>
                                Feature {category === 'Feature' && <span><img src={check} alt='checked' /></span>}
                            </li>
                            <li onClick={() => setCategory('UI')}>
                                UI {category === 'UI' && <span><img src={check} alt='checked' /></span>}
                            </li>
                            <li onClick={() => setCategory('UX')}>
                                UX {category === 'UX' && <span><img src={check} alt='checked' /></span>}
                            </li>
                            <li onClick={() => setCategory('Enhancement')}>
                                Enhancement {category === 'Enhancement' && <span><img src={check} alt='checked' /></span>}
                            </li>
                            <li onClick={() => setCategory('Bug')}>
                                Bug {category === 'Bug' && <span><img src={check} alt='checked' /></span>}
                            </li>
                        </ul>
                    }
                    {/* <label htmlFor='category'>Category</label>
                    <p>Choose a category for your feedback</p>
                    <select id='category' name='category'>
                        <option>Feature</option>
                        <option>UI</option>
                        <option>UX</option>
                        <option>Enhancement</option>
                        <option>Bug</option>
                    </select> */}
                </div>
                <div className='new-feedback__form__detail'>
                    <label htmlFor='detail'>Feedback Detail</label>
                    <p>Include any specific comments on what should be improved, added, etc.</p>
                    <input type='text' name='detail' id='detail' />
                </div>
            </form>
        </div>
    );
}
