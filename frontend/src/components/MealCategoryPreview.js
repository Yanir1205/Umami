import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealCategoryPreview extends Component {
  render() {
    const { category } = this.props;
    return (
      <div className='card'>
        <img src={category.img} alt='category' class='card-img'></img>
        <h5 className='card-name'>{category.name}</h5>
        <div className='card-total-one'>
          <img src={category.toggleIcon}></img>
          <p>
            {category.toggleTxt} 5 Different types of Cuisines <small>(this week)</small>
          </p>
        </div>
        <div className='card-hosted'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/dinner-round.svg'></img>
          <p>
            {category.hostedTxt}30 Hosted events <small>(this week)</small>
          </p>
        </div>
        <div className='card-next-date'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/calender-round.svg'></img>
          <p>
            Closest hosted event: <span> {category.nextAvailableDate} March 15, 2020</span>
          </p>
        </div>
        <div className='card-avg-price'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580171634/money.svg'></img>
          <p>
            Avg price: <span>{category.avgPrice}$35</span>
            <small>(per guest)</small>
          </p>
        </div>
        <div>
          <Link to={`/meal/${category.type}`} className='btn card-btn'>
            <span className=''>View Events</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default MealCategoryPreview;
