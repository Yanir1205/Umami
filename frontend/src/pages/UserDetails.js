import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions'

import UserMealList from '../components/UserMealList'

class UserDetails extends Component {

  async componentDidMount() {
    await this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id })
    this.loadMeals();
  }

  loadMeals = () => {
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
    const { host, attended } = this.mealsToShow();
    const user = this.props.user.fullName
    return <div className="container">
      <h3>Hello {user}</h3>
      <button className="create-new-meal btn" onClick={this.onCreateMeal}>CREATE EVENT</button>
      {this.props.meals.length > 0 && <UserMealList host={host} attended={attended}></UserMealList>}
    </div>
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter,
  user: state.user.loggedInUser
});

const mapDispatchToProps = {
  load,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);
