import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Feedback() {
    const { id } = useParams();
    
    useEffect(() => {
        //console.log(id)
        axios.get('http://localhost:5050/feedback/'.concat(id))
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    }, [id])

    return (
        <div>
            Feedback            
        </div>
    );
}
