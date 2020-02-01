import React from 'react';

export default function NotificationMsg(props) {


    return (props && <div className='msg-notification-container clean-list'>
        <div className='notification-img'>
            <img className='user-img-profile' src={props.user.imgUrl}></img>
        </div>
        <div className='user-info-notification' >
            <span>Just now</span>
            <span > {props.user.fullName}</span>
            <span>has just signed-in to your event</span>
            <span>{props.user.titelHost}</span>
        </div>
    </div>
    );
}

//