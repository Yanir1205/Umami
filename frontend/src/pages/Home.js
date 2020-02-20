import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadHomeMeals } from '../actions/MealActions';
import SocketService from '../services/SocketService';

import SearchBar from '../components/SearchBar';
import MealCategoryList from '../components/MealCategoryList';
import MealEventList from '../components/MealEventList';
import MeetOurHosts from '../components/MeetOurHosts';

class Home extends Component {

  componentDidMount() {
    window.scrollTo(0,0)
    this.props.loadHomeMeals();
  }

  onAllCuisines = () => {
    this.props.history.push('/meal/cuisine')
  }

  onAllLocations = () => {
    this.props.history.push('/meal/location')
  }

  render() {
    return (
      <>
        <div className='hero-container'>
          <div className='hero-box flex column align-center'>
            <div className='text flex column align-center'>
              <span>let's eat.</span>
              <span>Discover Home Cooking Around The World</span>
            </div>
            <div className='how-to'>
              <ul className='clean-list flex align-center justify-center margin-bottom-20'>
                <li>
                  <img src='https://res.cloudinary.com/contentexs/image/upload/v1580171632/globe.svg' alt='Food'></img>
                  <span>
                    <span>1.</span> Location
                  </span>
                </li>
                <li>
                  <img src='https://res.cloudinary.com/contentexs/image/upload/v1580171632/event.svg' alt='Food'></img>
                  <span>
                    <span>2.</span>Select
                  </span>
                </li>
                <li>
                  <img src='https://res.cloudinary.com/contentexs/image/upload/v1580172376/calender.svg' alt='Food'></img>
                  <span>
                    <span>3.</span>Register
                  </span>
                </li>
              </ul>
            </div>
            <div className='search-container'>
              <SearchBar placeholder='Where to ?  '></SearchBar>
            </div>
          </div>
        </div>
        <div className='section-container'>
          {this.props.meals && this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>Browse Our Top Locations</h2>
                <button className="container btn-more-options" onClick={this.onAllLocations}>More Locations</button>
              </div>
              <MealCategoryList meals={this.props.meals} displayCategory='Location'></MealCategoryList>
            </>
          )}
        </div>
        <div className='section-container'>
          {this.props.meals && this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>View Our Exciting Cuisines</h2>
                <button className="container btn-more-options" onClick={this.onAllCuisines}>More Cuisines</button>
              </div>
              <MealCategoryList meals={this.props.meals} displayCategory='Cuisine'></MealCategoryList>
            </>
          )}
        </div>
        <div className='section-container'>
          {this.props.meals && this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>Here Are Our New Events</h2>
              </div>
              <MealEventList meals={this.props.meals}></MealEventList>
            </>
          )}
        </div>
        <div className='section-container'>
          <div className='section-title-container'>
            <h2>Meet Our Hosts</h2>
          </div>
          <MeetOurHosts></MeetOurHosts>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  filter: state.filter.filter,
  meals: state.meal.homeMeals,
  msg: state.socket.msg,
});

const mapDispatchToProps = {
  loadHomeMeals,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
