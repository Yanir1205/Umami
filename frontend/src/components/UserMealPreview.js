import React from 'react';

export default function UserMealPreview(props) {
    // const dateToShow = new Date(props.meal.date).split(' ').
    return <div>
        <span>{props.isHost ? 'Host' : 'Attended'}</span>
        <span>{props.meal.title}</span>
    </div>
}