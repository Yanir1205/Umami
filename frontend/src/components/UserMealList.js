import React from 'react';

import UserMealPreview from './UserMealPreview'

export default function UserMealList({ meals, userId }) {
    return <div>
        {/* <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" /> */}
        <React.Fragment>
            <h1>Events <sup>2.0</sup></h1>
            <div className="row">
                <div className="col">
                    {meals && meals.map((meal, idx) => {
                        return <div>

                            <h2>Open {meal.objForHosted && <b> Hosted </b>}{!meal.objForHosted && <b> Attendee </b>}</h2>
                            <div className="tabs">
                                <div className="tab">
                                    <input className= "checkbox-arrow" type="checkbox" id={`chck${idx}`} />
                                    <label className="tab-label" for={`chck${idx}`} >{meal.title}</label>
                                    <UserMealPreview meal={meal} userId={userId} />
                                </div>
                            </div>
                        </div>

                    })}
                </div>
            </div>
        </React.Fragment>

    </div>

}



//    {meals && meals.map(meal=>{
//    return <UserMealPreview  meal={meal} userId={userId} />})}
{/* {meals && <UserMealPreview  meals={meals} userId={userId} />} */ }