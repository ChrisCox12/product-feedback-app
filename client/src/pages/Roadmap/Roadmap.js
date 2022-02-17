import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../SharedStyles/styles.css';
import './Roadmap.css';
import plus from '../../assets/shared/icon-plus.svg';
import leftArrow from '../../assets/shared/icon-arrow-left.svg';
import RoadmapCard from '../../components/RoadmapCard';

export default function Roadmap() {
    const navigate = useNavigate();
    const [content, setContent] = useState([]);
    const [status, setStatus] = useState('In-Progress');
    const [planned, setPlanned] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [live, setLive] = useState([]);

    useEffect(() => {
        let p;
        let iP;
        let l;

        axios.get('http://localhost:5050/feedback')
            .then(res => {
                //console.log('res', res.data);
                //setContent(res.data);
                /* setContent([
                    {title: 'hello', status: 'Planned'},
                    {title: 'world', status: 'In-Progress'},
                    {title: '!', status: 'Live'}
                ]) */

                p = [...res.data.filter(item => item.status === 'Planned')];
                iP = [...res.data.filter(item => item.status === 'In-Progress')];
                l = [...res.data.filter(item => item.status === 'Live')];
            })
            .then(() => {
                console.table([p,iP, l]);
                setPlanned(p);
                setInProgress(iP);
                setLive(l);
            })
            .catch(err => console.log(err))
    }, []);

    useEffect(() => {
        const grid = document.getElementById('roadmap__content');

        switch (status) {
            case 'Planned':
                if(grid.classList.contains('showLive')) grid.classList.remove('showLive');
                grid.classList.add('showPlanned');
                break;
            case 'Live':
                if(grid.classList.contains('showPlanned')) grid.classList.remove('showPlanned');
                grid.classList.add('showLive');
                break;
            default:
                grid.classList.remove('showPlanned');
                grid.classList.remove('showLive');
                break;
        }
    }, [status]);

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
                <button onClick={() => setStatus('Planned')}>Planned ({planned.length})</button>
                <button onClick={() => setStatus('In-Progress')}>In-Progress ({inProgress.length})</button>
                <button onClick={() => setStatus('Live')}>Live ({live.length})</button>
            </div>

            <div className='roadmap__content' id='roadmap__content'>
                <div className='roadmap__content__planned'>
                    <div>
                        <p>Planned ({planned.length})</p>
                        <p>Ideas prioritized for research</p>
                    </div>
                    <div className='roadmap__content__planned__cards'>
                        {planned.map((item, index) => {
                            return <RoadmapCard item={item} index={index} key={index} />
                        })}
                    </div>
                </div>
                <div className='roadmap__content__in-progress'>
                    <div>
                        <p>In-Progress ({inProgress.length})</p>
                        <p>Features currently being developed</p>
                    </div>
                    <div className='roadmap__content__in-progress__cards'>
                        {inProgress.map((item, index) => {
                            return <RoadmapCard item={item} index={index} key={index} />
                        })}
                    </div>
                </div>
                <div className='roadmap__content__live'>
                    <div>
                        <p>Live ({live.length})</p>
                        <p>Released features</p>
                    </div>
                    <div className='roadmap__content__live__cards'>
                        {live.map((item, index) => {
                            return <RoadmapCard item={item} index={index} key={index} />
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
