import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/MealActions';

import SearchBar from '../components/SearchBar';
import MealCategoryList from '../components/MealCategoryList';

class Home extends Component {
  componentDidMount() {
    debugger;
    this.props.load();
  }

  render() {
    if (!this.props.meals) return <div className='border-loading-indicator col-2 row-1'></div>;
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
                    <span>2.</span>Choose Hosted Event
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
              <SearchBar></SearchBar>
            </div>
          </div>
        </div>
        <div className='top-box-container'>{this.props.meal && <MealCategoryList meals={this.props.meals} category='Location'></MealCategoryList>}</div>
        <div className='top-box-container'>{this.props.meal && <MealCategoryList meals={this.props.meals} category='Cuisine'></MealCategoryList>}</div>
      </>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  filter: state.filter.filter,
  meals: state.meal.meals,
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
