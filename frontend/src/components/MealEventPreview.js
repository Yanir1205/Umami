import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealEventPreview extends Component {
  render() {
    if (!this.props.meal) return <div></div>;
    const { meal } = this.props;
    return (
      <div className='category-card'>
        <div className='img-wrapper'>
          <img src={meal.imgUrls[1]} alt='category' className='card-img'></img>
        </div>
        <h5 className='card-name'>{meal.cuisineType}</h5>
        <div className='card-total-one'>
          <div>
            <span>{meal.title}</span>
          </div>
        </div>
        <div className='card-hosted'>
          <div>
            <span> </span>
          </div>
        </div>
        <div className='card-next-date'>
          <div>
            <span className='title'>Next Event Is On, </span> <span></span>
          </div>
        </div>
        <div className='card-avg-price'>
          <div>
            <span className='title'>Avg Price Is, </span>
            <span>
              <small> (per guest)</small>
            </span>
          </div>
        </div>
        <div className='card-btn'>
          <Link to={`/meal/${meal._id}`} className='btn'>
            <span className=''>View Events</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default MealEventPreview;
