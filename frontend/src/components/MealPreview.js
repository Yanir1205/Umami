// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export class MealPreview extends Component {
//   render() {
//     return <div>MealPreview</div>;
//   }
// }

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(MealPreview);


import React from "react";

export default function MealPreview({ meal, getAvgRate }) {
  const avgRate = getAvgRate(meal.reviews);
  return (
    <div className="meal-card">
      <img src={meal.imgUrls[0]} alt=""></img>
      {/* <p>{diningType}</p> */}
      <p>{meal.mealType} in {meal.location.city}</p>
      <h5>{meal.title}</h5>
      <p>{avgRate}/5 ({meal.reviews.length})</p>
      <div>
        <p>Hosted By {meal.hostedBy.fullName}</p>
        <img className="user-Img" src={meal.hostedBy.imgUrl} alt=""></img>
      </div>
    </div>
  )
}