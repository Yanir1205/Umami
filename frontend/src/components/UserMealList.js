import React, { Component } from 'react';
import { connect } from 'react-redux';
import MaterialTable from 'material-table';

import UserMealPreview from './UserMealPreview'

export default function UserMealList({ attended, host }) {
    return <ul className="clean-list">

        {attended.map(attendedMeal => (
            <li key={attendedMeal._id}>
                <UserMealPreview meal={attendedMeal} isHost={false} />
            </li>
        ))}

        {host.map(hostMeal => (
            <li key={hostMeal._id}>
                <UserMealPreview meal={hostMeal} isHost={true} />
            </li>
        ))}

    </ul>

}


/*

<ul>
        {meals.map(meal => (
          <li key={meal._id} onClick={() => history.push(`/meal/${meal._id}`)}>
            <MealPreview meal={meal} getAvgRate={getAvgRate}/>
          </li>
        ))}
      </ul>
*/