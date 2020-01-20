import React, { Component } from 'react';

class MealPageNav extends Component {
  state = { startTime: '', endTime: '', minCapacity: '', totalRates: 0, avgRate: 0, rateClass: 'hide' };

  componentDidMount() {
    const { meal } = this.props;
    let startTime = meal.mealType === 'dinner' ? '6:00PM' : meal.mealType === 'lunch' ? '12:00PM' : '9:00AM';
    let endTime = meal.mealType === 'dinner' ? '9:00PM' : meal.mealType === 'lunch' ? '4:00PM' : '11:00AM';
    let minCapacity = Math.floor(parseInt(meal.capacity) / 2);
    let totalRates = meal.reviews.length;
    let avgRate = 0,
      rateClass = 'hide';
    if (totalRates > 0) {
      avgRate = meal.reviews.reduce((acc, currReview) => acc + currReview.rate, 0) / meal.reviews.length;
      rateClass = 'rate';
    }

    this.setState({
      startTime: startTime,
      endTime: endTime,
      minCapacity: minCapacity,
      totalRates: totalRates,
      avgRate: avgRate,
      rateClass: rateClass,
    });
  }

  render() {
    let { meal } = this.props;
    // console.log('MealPageNav',meal);
    
    return (
      <div className='nav-container'>
        <div className='top-box flex '>
          <a className='underline-link' href='#menu'>
            Menu
          </a>
          <a className='underline-link' href='#reviews'>
            Reviews
          </a>
          <a className='underline-link' href='#location'>
            Location
          </a>
        </div>
        <div className='devider-box'>
          <hr />
        </div>
        <div className='bottom-box flex'>
          <div className={this.state.rateClass}>
            <i className='icon-small fas fa-star'></i>
            <span>{Math.ceil(this.state.avgRate)}</span>
            <span>({this.state.totalRates})</span>
          </div>
          <div className='meal-period'>
            <span>{this.state.startTime}</span> - <span>{this.state.endTime}</span>
          </div>
          <div>{meal.mealType}</div>
          <div>{meal.cuisineType}</div>
          <div className='meal-guests'>
            <span>{this.state.minCapacity}</span> - <span>{meal.capacity}</span>
            <span> Guests </span>
          </div>
          <div className='available-places'>
            <span> Available Places-{meal.capacity - meal.currCapacity }</span> 
            
          </div>
        </div>
      </div>
    );
  }
}

export default MealPageNav;
