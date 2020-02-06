import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealEventPreview extends Component {
  render() {
    if (!this.props.meal) return <div></div>;
    const { meal } = this.props;

    return (
      <Link to={`/meal/${meal._id}`}>
        <div className='category-card'>
          <div className='img-wrapper'>
            <img src={meal.imgUrls[0]} alt='category' className='card-img'></img>
          </div>
          <h5 className='card-name'>{meal.cuisineType}</h5>
          <div className='card-total-one'>
            <div>
              <span>{meal.title}</span>
            </div>
          </div>
          <div className='card-hosted'>
            <div>
              <span>{meal.location.country} </span>,<span>{meal.location.city} </span>
            </div>
          </div>
          <div className='card-avg-price'>
            <div>
              <span className='title'>Price:</span>
              <span>&nbsp;{meal.price}</span>
            </div>
          </div>
          <div className='card-btn'>
            <span className='btn'>View Event</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default MealEventPreview;
