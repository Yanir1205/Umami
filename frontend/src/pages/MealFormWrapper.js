import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealForm } from '../components/MealForm.js';
import { getById, add } from '../actions/MealActions.js';

class MealFormWrapper extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    if (id) {
      this.props.getById(id);
    }
  }

  onSaveMeal = meal => {
    const { loggedInUser } = this.props;
    meal.hostedBy = { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl };
    this.props.add(meal);
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

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  meal: state.meal.selectedMeal,
});

const mapDispatchToProps = {
  getById,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealFormWrapper);
