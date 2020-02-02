import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/MealActions';
import SocketService from '../services/SocketService';

import SearchBar from '../components/SearchBar';
import MealCategoryList from '../components/MealCategoryList';
import MealEventList from '../components/MealEventList';
import MeetOurHosts from '../components/MeetOurHosts';

class Home extends Component {
  componentDidMount() {
    debugger
    this.props.load();
  }

  render() {
    debugger
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
                    <span>1.</span>Choose Location
                  </span>
                </li>
                <li>
                  <img src='https://res.cloudinary.com/contentexs/image/upload/v1580171632/event.svg' alt='Food'></img>
                  <span>
                    <span>2.</span>Select Event
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
              <SearchBar placeholder='Where to ?  What are you craving for? '></SearchBar>
            </div>
          </div>
        </div>
        <div className='section-container'>
          {this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>Browse Our Top Locations</h2>
              </div>
              <MealCategoryList meals={this.props.meals} displayCategory='Location'></MealCategoryList>
            </>
          )}
        </div>
        <div className='section-container'>
          {this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>View Our Exciting Cuisines</h2>
              </div>
              <MealCategoryList meals={this.props.meals} displayCategory='Cuisine'></MealCategoryList>
            </>
          )}
        </div>
        <div className='section-container'>
          {this.props.meals.length > 0 && (
            <>
              <div className='section-title-container'>
                <h2>Here Are Our New Events</h2>
              </div>
              {/* <MealEventList meals={this.props.meals} displayCategory='Cuisine'></MealEventList> */}
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
  meals: state.meal.meals,
  msg: state.socket.msg,
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
