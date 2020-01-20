import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions'

import UserMealList from '../components/UserMealList'
import UserService from '../services/UserService';

class UserDetails extends Component {
  //when clicking on a specific date, a table will appear (below the calander) with all the meals of the chosen date
  //the table will show all attended meals and hosted meals of the chosen day
  //for any meal of which the current user is a host - the table will enable view, edit (remove???)
  //for any meal of which the current user is an attendee - the table will enable view and remove

  async componentDidMount() {
    //set the filter to the current user id 
    //after the filter is set - load the meals according to the filter
    await this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id })
    this.loadMeals();
  }

  loadMeals = () => {
    debugger
    this.props.load(this.props.filter)
  }


  onCreateMeal = () => {
    this.props.history.push('/meal/edit');
  }

  mealsToShow = () => {
    const { id } = this.props.match.params
    const attended = [];
    const host = [];
    this.props.meals.forEach(meal => {
      if (meal.hostedBy._id === id) {
        host.push(meal);
      } else {
        attended.push(meal);
      }
    })
    return { host, attended }
  }

  render() {
    debugger;
    const { host, attended } = this.mealsToShow();
    const user = JSON.parse(UserService.getUserLoggedin()).username
    return <div className="container">
      <h3>Hello {user}</h3>
      <button className="create-new-meal btn" onClick={this.onCreateMeal}>CREATE EVENT</button>
      {this.props.meals.length > 0 && <UserMealList host={host} attended={attended}></UserMealList>}
    </div>
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter
});

const mapDispatchToProps = {
  load,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
