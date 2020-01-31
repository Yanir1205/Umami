import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MealForm } from '../components/MealForm.js';
import { getById, add } from '../actions/MealActions.js';

class MealFormWrapper extends Component {

  async componentDidMount() {
    const id = this.props.match.params.id;
    if (id) { //edit mode:
      await this.props.getById(id);
    }
  }

  onSaveMeal = async meal => {
    const loggedInUser = { ...this.props.loggedInUser };

    await this.props.add(meal);
    this.props.history.push(`/user/${loggedInUser._id}`)
  };

  render() {
    const loggedInUser = { ...this.props.loggedInUser }
    const id = this.props.match.params.id;
    return (
      <React.Fragment>
        <div className='container main-form-container'>
          <h2>Event</h2>
          {((id && this.props.meal) || !id) && <MealForm loggedInUser={loggedInUser} onSaveMeal={this.onSaveMeal} meal={id ? this.props.meal : ''} />}
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
