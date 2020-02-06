import React, { Component } from 'react';
import MealCategoryPreviewSM from './MealCategoryPreviewSM';
import UtilitiesService from '../services/UtilitiesService';

class MealCategoryList extends Component {
  state = { categories: [], displayCategory: '' };
  componentDidMount() {
    const categories = UtilitiesService.getRandomCategories(this.props.meals, this.props.displayCategory);
    this.setState({ categories: categories ? categories : [], displayCategory: this.props.displayCategory });
  }

  render() {
    return (
      <div className='main-categories-container category-cards'>
        {this.state.categories &&
          this.state.categories.map((category, idx) => {
            return <MealCategoryPreviewSM key={idx} category={category} displayCategory={this.props.displayCategory}></MealCategoryPreviewSM>;
          })}
      </div>
    );
  }
}

export default MealCategoryList;
