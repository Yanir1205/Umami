import React, { Component } from 'react';
import { connect } from 'react-redux';

import SocketService from '../services/SocketService';
import { getById, loadUserMeal, load, add } from '../actions/MealActions';
import { setFilter } from '../actions/FilterActions';
import UserMealList from '../components/UserMealList';

class UserDetails extends Component {

  async componentDidMount() {

  window.scrollTo(0,10)
    
    this.resetFilterDefinitions();
  }

  resetFilterDefinitions = async () => {
    await this.props.setFilter({
      userId: this.props.match.params.id,
      at: '',
      type: '',
      location: {
        city: '',
        country: '',
      },
      tags: '',
    });
    this.loadMeals();
  };

  loadMeals = () => {
    this.props.loadUserMeal(this.props.filter);
  };

  onCreateMeal = () => {
    this.props.history.push('/meal/edit');
  };

  mealsToShow = async () => {
    const { id } = this.props.match.params;
    const attended = [];
    const host = [];

    let meals = [];
    meals = [...this.props.userMeals];
    await meals.forEach(async meal => {
      if (meal.hostedBy._id === id) {
        await host.push(meal);
      } else {
        await attended.push(meal);
      }
    });
    return { host, attended };
  };

  onDelete = async (userId, mealId, occurenceId) => {
    await this.props.getById(mealId);
    const meal = { ...this.props.meal };
    const occurrence = meal.occurrences.find(occurrence => {
      return occurrence.id === occurenceId;
    });
    const idx = occurrence.attendees.findIndex(attendee => {
      return attendee._id === userId;
    });
    
    occurrence.attendees.splice(idx, 1);
    await this.props.add(meal);
    this.loadMeals();
  };

  render() {
    
    const user = this.props.loggedInUser;
    if (!user) return null
    return (
      user && (
        <div className='container user-details-container '>
          <div className=' user-container'>
            <span>Hello, </span>
            <span>{user.fullName}</span>
          </div>
          <div className='controlls-container flex space-between '>
            <div className='flex-shrink-50'>
              <span>Events </span>
            </div>
            <div className='flex-shrink-50 flex justify-end'>
              <button className='btn-sm-md btn-action align-end ' onClick={this.onCreateMeal}>
                Create Event
              </button>
            </div>
            
          </div>
          {this.props.userMeals.length > 0 && <UserMealList  onDelete={this.onDelete} meals={this.props.userMeals} userId={user._id}></UserMealList>}
        </div>
      )
    );
  }
}

const mapStateToProps = state => ({
  userMeals: state.meal.userMeals,
  meals: state.meal.meals,
  filter: state.filter.filter,
  meal: state.meal.selectedMeal,
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {
  loadUserMeal,
  setFilter,
  add,
  load,
  getById,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
