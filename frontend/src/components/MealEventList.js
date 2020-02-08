import React, { Component } from 'react';
import MealEventPreview from './MealEventPreview';
import UtilitiesService from '../services/UtilitiesService';

class MealEventList extends Component {
  state = { meals: [] };
  componentDidMount() {
    const meals = UtilitiesService.getRandomMeals(this.props.meals, 4);
    this.setState({ meals: meals ? meals : [] });
  }

  render() {
    return (
      <div className='main-categories-container category-cards'>
        {this.state.meals &&
          this.state.meals.map((meal, idx) => {
            return <MealEventPreview key={idx} meal={meal}></MealEventPreview>;
          })}
      </div>
    );
  }
}

export default MealEventList;
