import React, { Component } from 'react';
import { connect } from 'react-redux';
import { load } from '../actions/MealActions';
import { setFilter } from '../actions/FlterActions'

import UserMealList from '../components/UserMealList'
import UserService from '../services/UserService';

class UserDetails extends Component {

  async componentDidMount() {

    await this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id })

    await this.loadMeals();
  }
 

  loadMeals = () => {
     this.props.load(this.props.filter)
  }


  onCreateMeal = () => {
    this.props.history.push('/meal/edit');
  }

  mealsToShow = async () => {
    const { id } = this.props.match.params
    const attended = [];
    const host = [];


    const meals = [];
      meals = [...this.props.meals]
      await meals.forEach(async (meal) => {
        console.log('meal.hostedBy._id.toString() === id', meal.hostedBy._id.toString() === id);
        debugger
        if (meal.hostedBy._id.toString() === id) {
          await host.push(meal);
        } else {
          await attended.push(meal);
        }
      })

    

    return { host, attended }
  }


  render() {

    console.log('this.props.meals', this.props.meals);

    const user = JSON.parse(UserService.getUserLoggedin())
    console.log('UserDetails - > user ',user);
    
    return <div className="container">
      <div className="user-container">

        <h3>Hello {user.fullName}</h3>
        <img className="user-img-propile" src={user.imgUrl} />
      </div>
      <button className="create-new-meal btn" onClick={this.onCreateMeal}>CREATE EVENT</button>
      {this.props.meals.length >0 && <UserMealList  meals={this.props.meals}  userId={user._id}></UserMealList>}
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
