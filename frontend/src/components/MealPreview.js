import React from "react";

export default function MealPreview({ meal, getAvgRate }) {
  const avgRate = getAvgRate(meal.reviews);
  return (
    <div className="meal-card">
      <img className = "img-meal" src={meal.imgUrls[0]} alt=""></img>
      {/* <p>{diningType}</p> */}
      <p>{meal.mealType} in {meal.location.city}</p>
      <h5>{meal.title}</h5>
      {meal.reviews.length > 0 && <p>{avgRate}/5 ({meal.reviews.length})</p>}
      <div>
        <p>Hosted By {meal.hostedBy.fullName}</p>
        <img className="user-Img" src={meal.hostedBy.imgUrl} alt=""></img>
      </div>
    </div>
  )
}