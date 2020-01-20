import React from 'react';

import UserMealPreview from './UserMealPreview'

export default function UserMealList({ attended, host }) {
    return <div>

        {attended.map(attendedMeal => (
            <div key={attendedMeal._id}>
                <UserMealPreview meal={attendedMeal} isHost={false} />
            </div>
        ))}

        {host.map(hostMeal => (
            <div key={hostMeal._id}>
                <UserMealPreview meal={hostMeal} isHost={true} />
            </div>
        ))}

    </div>

}