import React from 'react';

import UserMealPreview from './UserMealPreview'

export default function UserMealList({meals,userId}) {
   
    return <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
       {meals && <UserMealPreview  meals={meals} userId={userId}/>}
    </div>

}