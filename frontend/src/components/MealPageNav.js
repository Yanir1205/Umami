import React, { Component } from 'react';
import { connect } from 'react-redux';
class MealPageNav extends Component {
  render() {
    let { hostRating, eventSetup } = this.props;
    return (
      <div className='card-simple nav-container'>
        <div className='top-box flex '>
          <a className='btn' href='#menu'>
            Menu
          </a>
          <a className='btn' href='#reviews'>
            Reviews
          </a>
          <a className='btn' href='#location'>
            Location
          </a>
        </div>
        <div className='bottom-box flex flex-shrink-30'>
          {hostRating.avgRate > 0 && (
            <div className={hostRating.avgRate && hostRating.avgRate > 0 ? 'rate' : 'hide'}>
              <i className='icon-small fas fa-star'></i>
              <span>{hostRating.avgRate}</span>
              <span>({hostRating.totalRated})</span>
            </div>
          )}

          <div className='meal-period'>
            <span>{eventSetup.startTime}</span> - <span>{eventSetup.endTime}</span>
          </div>
          <div>{eventSetup.mealType}</div>
          <div>{eventSetup.cuisineType}</div>
          <div className='meal-guests'>
            <span>{eventSetup.capacity}</span>
            <span> Guests </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(MealPageNav);