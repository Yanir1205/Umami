import React, { Component } from 'react';

class MealPreview extends Component {
  getNextDateFromNow() {
    let max = -Infinity;
    let maxIdx;
    this.props.meal.occurrences.forEach((occurrence, idx) => {
      if (occurrence.date > max && occurrence.date > Date.now()) {
        max = occurrence;
        maxIdx = idx;
      }
    });
    return { max, maxIdx };
  }

  getDifferenceInDays(date) {
    const date1 = new Date(date);
    const now = new Date(Date.now());
    const diffInDays = (date1.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
    return Math.floor(diffInDays);
  }

  getPromotionMsg() {
    const nextMeal = this.getNextDateFromNow();
    if (this.props.meal.isPromoted) return 'super host';
    else if (this.getDifferenceInDays(nextMeal.max.date) <= 2) return 'hurry up!';
    return `${this.props.meal.capacity - this.props.meal.occurrences[nextMeal.maxIdx].attendees.length} places left!`;
  }

  getMainMsg() {
    let res;
    if (this.props.renderType === 'location') {
      res = {
        val: this.props.meal.location.city + ', ' + this.props.meal.location.country,
        type: 'location',
      };
      return res;
    } else {
      res = {
        val: this.props.meal.cuisineType,
        type: 'cuisine',
      };
      return res;
    }
  }

  onCardClick = id => {
    this.props.onCardClick(id);
  };

  render() {
    // const description = this.props.meal.description
    const msg = this.getMainMsg();
    const avgRate = this.props.meal ? this.props.getAvgRate(this.props.meal.reviews) : '';
    let nextDate = new Date(this.getNextDateFromNow().max.date);
    nextDate = nextDate
      .toDateString()
      .split(' ')
      .slice(1, 3)
      .join(' ');
    return (
      this.props.meal && (
        <div className='item  meal-card flex' onClick={() => this.onCardClick(this.props.meal._id)}>
          <div className='category '>{this.getPromotionMsg()}</div>
          <img className='img-meal ' src={this.props.meal.imgUrls[0]} alt=''></img>
          <div className='flex.column text-card'>
            <div className='flex space-between '>
              <div className='card-main-msg'>{msg.val}</div>
              <div className='star'>{avgRate ? Math.floor(avgRate) + ' ⭐' : ''}</div>
            </div>
            <div>{msg.type === 'location' ? this.props.meal.cuisineType : this.props.meal.location.city + ', ' + this.props.meal.location.country}</div>
            <div className='flex space-between '>
              <div>{this.props.meal.title}</div>
              <div>{nextDate}</div>
            </div>
            <div className='description-tag'>
              <hr className='hr'></hr>
            </div>
            <div className='price-tag flex align-end justify-end'>{this.props.meal.price} $</div>
          </div>
        </div>
      )
    );
  }
}
export default MealPreview;
