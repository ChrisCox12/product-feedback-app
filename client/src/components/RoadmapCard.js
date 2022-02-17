import React, { useEffect } from 'react';

export default function RoadmapCard({ item, index }) {
    const title = item.title || '';
    const description = item.description || '';
    const category = item.category || '';
    const status = item.status || '';
    const upvotes = item.upvotes || 0;
    const numComments = item.comments.length || 0;
    const cardID = 'roadmap-card--'.concat(status, '-', index);

    useEffect(() => {
        const card = document.getElementById(cardID);

        switch (status) {
            case 'Planned':
                card.classList.add('card--planned');
                break;
            case 'Live':
                card.classList.add('card--live');
                break;
            default:
                card.classList.add('card--in-progress');
                break;
        }
    }, [cardID, status]);

    return (
        <div className='roadmap-card' id={cardID}>
            <div>{status}</div>
            <p>{title}</p>
            <p>{description}</p>
            <div>{category}</div>
            <div>
                <button>{upvotes}</button>
                <div>{numComments}</div>
            </div>
            RoadmapCard
        </div>
    )
}
