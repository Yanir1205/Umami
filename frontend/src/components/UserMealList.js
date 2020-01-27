import React from 'react';

import UserMealPreview from './UserMealPreview'

export default function UserMealList({ meals, userId }) {
    return <div>
        <React.Fragment>
            <div className="row">
                <div className="col">
                    {meals && meals.map((meal, idx) => {
                        return <div>

                            <div className="preview-title "> {meal.objForHosted && <span >I'm Hosting </span>}{!meal.objForHosted && <span>I'm a Guest </span>}</div>
                            <div className="tabs-container">
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



