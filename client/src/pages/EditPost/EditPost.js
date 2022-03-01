import React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import penTip from '../../assets/shared/icon-edit-feedback.svg';
import downArrow from '../../assets/shared/icon-arrow-down.svg';
import upArrow from '../../assets/shared/icon-arrow-up.svg';
import check from '../../assets/shared/icon-check.svg';
import './EditPost.css';
import '../SharedStyles/styles.css';

export default function EditPost() {
  const [toggleCategoryDropdown, setToggleCategoryDropdown] = useState(false);
  const [toggleStatusDropdown, setToggleStatusDropdown] = useState(false);
  const [status, setStatus] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    //console.log('id: ', id)
    axios.get('http://localhost:5050/feedback/'.concat(id))
      .then(res => {
        //console.log(res.data)
        setStatus(res.data.status);
        setCategory(res.data.category);
        setDescription(res.data.description);
        setTitle(res.data.title);
        document.getElementById('feedback-title').value = res.data.title;
        document.getElementById('feedback-description').value = res.data.description;
      })
      .catch(err => console.log(err));
  }, []);

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDetailChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //console.log('save')

    const toSubmit = {
      title: title,
      category: category,
      description: description,
      status: status
    };

    axios.patch('http://localhost:5050/feedback/'.concat(id), toSubmit)
      .then(res => {
        navigate( '/feedback/'.concat(id) );
      })
      .catch(err => console.log(err));
  }


  return (
    <div className='edit-feedback'>
      <div className='edit-feedback__back'>
        <img src={leftArrow} alt='back arrow' />
        <span>Go Back</span>
      </div>

      <div className='edit-feedback__form-wrapper'>
        <img className='edit-feedback__form-wrapper__img' src={penTip} alt='Pen' />
        <p className='edit-feedback__form-wrapper__header'>Editing '{title}'</p>
        <form className='edit-feedback__form' onSubmit={handleSubmit}>
          <div className="edit-feedback__form__title">
            <label className="edit-feedback__form__title__label" htmlFor='feedback-title'>Feedback Title</label>
            <p className='edit-feedback__form__title__sub'>Add a short, descriptive headline</p>
            <input 
              type='text' 
              name='feedback-title' 
              id='feedback-title' 
              onChange={handleTitleChange}  
            />
          </div>

          <div className="edit-feedback__form__category">
            <p className='edit-feedback__form__category__header'>Category</p>
            <p className='edit-feedback__form__category__sub'>Choose a category for your feedback</p>
            <div className='edit-feedback__form__category__select' onClick={() => setToggleCategoryDropdown(!toggleCategoryDropdown)}>
              <span id='category-select'>{category}</span>
              {toggleCategoryDropdown ?
                <img src={upArrow} alt='up arrow' />
                :
                <img src={downArrow} alt='down arrow' />
              }
            </div>
            {toggleCategoryDropdown &&
              <ul className='edit-feedback__form__category__dropdown'>
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
          </div>

          <div className='edit-feedback__form__status'>
            <p className='edit-feedback__form__status__header'>Update Status</p>
            <p className='edit-feedback__form__status__sub'>Change feedback state</p>
            <div className='edit-feedback__form__status__select' onClick={() => setToggleStatusDropdown(!toggleStatusDropdown)}>
              <span id='status-select'>{status}</span>
              {toggleStatusDropdown ?
                <img src={upArrow} alt='up arrow' />
                :
                <img src={downArrow} alt='down arrow' />
              }
            </div>
            {toggleStatusDropdown &&
              <ul className='edit-feedback__form__status__dropdown'>
                <li onClick={() => setStatus('Suggestion')}>
                  Suggestion {status === 'Suggestion' && <span><img src={check} alt='checked' /></span>}
                </li>
                <li onClick={() => setStatus('Planned')}>
                  Planned {status === 'Planned' && <span><img src={check} alt='checked' /></span>}
                </li>
                <li onClick={() => setStatus('In-Progress')}>
                  In-Progress {status === 'In-Progress' && <span><img src={check} alt='checked' /></span>}
                </li>
                <li onClick={() => setStatus('Live')}>
                  Live {status === 'Live' && <span><img src={check} alt='checked' /></span>}
                </li>
              </ul>
            }
          </div>

          <div className='edit-feedback__form__detail'>
            <label className="edit-feedback__form__detail__label" htmlFor='feedback-description'>Feedback Detail</label>
            <p className='edit-feedback__form__detail__sub'>Include any specific comments on what should be improved, added, etc.</p>
            <input 
              type='text' 
              name='feedback-description' 
              id='feedback-description' 
              onChange={handleDetailChange}  
            />
          </div>

          <div className='edit-feedback__form__buttons'>
            <button className='btn btn--delete'>Delete</button>
            <div>
              <button className='btn btn--cancel'>Cancel</button>
              <input 
                type='submit' 
                value='Save Changes' 
                className='btn btn--save' 
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
