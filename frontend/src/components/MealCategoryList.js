import React, { Component } from 'react';
import MealCategoryPreview from './MealCategoryPreview';
import UtilitiesService from '../services/UtilitiesService';

class MealCategoryList extends Component {
  state = { categories: [], displayCategory: '' };
  componentDidMount() {
    const categories = UtilitiesService.getCategoriesInfo(this.props.meals, this.props.displayCategory);
    this.setState({ categories: categories ? categories : [], displayCategory: this.props.displayCategory });
  }

  render() {
    return (
      <div className='main-categories-container category-cards'>
        {this.state.categories &&
          this.state.categories.map((category, idx) => {
            return <MealCategoryPreview key={idx} category={category} displayCategory={this.props.displayCategory}></MealCategoryPreview>;
          })}
      </div>
    );
  }
}

export default MealCategoryList;
