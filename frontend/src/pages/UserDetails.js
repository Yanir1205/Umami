import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FilterActions';
import UserMealList from '../components/UserMealList';

class UserDetails extends Component {
  async componentDidMount() {
    await this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id });
    await this.loadMeals();
  }

  loadMeals = () => {
    this.props.load(this.props.filter);
  };

  onCreateMeal = () => {
    this.props.history.push('/meal/edit');
  };

  mealsToShow = async () => {
    const { id } = this.props.match.params;
    const attended = [];
    const host = [];

    const meals = [];
    meals = [...this.props.meals]
    await meals.forEach(async (meal) => {
      if (meal.hostedBy._id.toString() === id) {
        await host.push(meal);
      } else {
        await attended.push(meal);
      }
    })
    return { host, attended }
  }


  render() {
    const user = this.props.loggedInUser;
    return (
      <div className='user-details-container container'>
        <div className='user-container'>
          <span>Hello, </span><span>{user.fullName}</span>
        </div>
        <div className="controlls-container flex space-between " >
          <div className="flex-shrink-50">
            <span>Events </span>
          </div>
          <div className="flex-shrink-50 flex justify-end">
            <button className='btn-cta btn-mdd align-end margin-right-10 ' onClick={this.onCreateMeal}>
              Create Event
            </button>
          </div>
        </div>
        {this.props.meals.length > 0 && <UserMealList meals={this.props.meals} userId={user._id} ></UserMealList>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter,
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  load,
  setFilter,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
