import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealForm } from '../components/MealForm.js';
import { getById, add } from '../actions/MealActions.js';
import UserService from '../services/UserService'

class MealFormWrapper extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.getById(id);
    }
  }

  onSaveMeal = meal => {
    const user = {...JSON.parse(UserService.getUserLoggedin())}
    delete user.email
    delete user.phone
    delete user.username
    meal.hostedBy = user
    console.log('MealFormWrapper - > ',meal);
   
    this.props.add({...meal});
  };

  render() {
    return (
      <React.Fragment>
        <div className='container main-form-container'>
          <h2>Event</h2>
          <MealForm onSaveMeal={this.onSaveMeal} meal={this.props.meal} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    meal: state.meal.selectedMeal,
  };
};

const mapDispatchToProps = {
  getById,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealFormWrapper);
