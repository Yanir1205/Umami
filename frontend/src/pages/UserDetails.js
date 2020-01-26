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
      <div className='container'>
        <div className='user-container'>
          <h3>Hello {user.fullName}</h3>
        </div>
        <div className ="flex "> 
        <button className='btn-cta btn-mdd align-end' onClick={this.onCreateMeal}>
          CREATE EVENT
        </button>
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
