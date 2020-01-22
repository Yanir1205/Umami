import React from 'react';
import Moment from 'moment';

export default function MealPreview({ meal, getAvgRate }) {
  const avgRate = getAvgRate(meal.reviews);
  return (
    <div className='meal-card card-border align-base margin-bottom-20'>
      <img className='img-meal' src={meal.imgUrls[0]} alt=''></img>
      <strong className='date sports'>
        <p>
          {Moment.unix(meal.date)
            .format('LL')
            .split('')
            .slice(0, 3)}
        </p>
        <p>
          {Moment.unix(meal.date)
            .format('LL')
            .split('')
            .slice(8, 9)}
        </p>
      </strong>
      {/* <strong className="date sports"> {Moment.unix(meal.date).format('LL').split(',').slice(8,9)}</strong> */}
      {/* {meal.mealType}  */}
      <div className='review-container flex space-between flex.row '>
        <p>📍{meal.location.city}</p>
      </div>
      <h5>{meal.title}</h5>
      {/* {meal.reviews.length > 0 && <p>{avgRate}/5 ({meal.reviews.length})</p>} */}
      <div className='flex flex.row align-center '>
        <img className='user-img' src={meal.hostedBy.imgUrl} alt=''></img>
        <div>
          <p>{meal.hostedBy.fullName}</p>
        </div>
      </div>
    </div>
  );
}
