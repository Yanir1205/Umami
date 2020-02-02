import React, { Component } from 'react';
import MealCategoryPreviewSM from './MealCategoryPreviewSM';
import UtilitiesService from '../services/UtilitiesService';

class MealCategoryList extends Component {
  // state = { categories: [], displayCategory: '' };
  // componentDidMount() {
  //   const categories = UtilitiesService.getCategoriesInfo(this.props.meals, this.props.displayCategory);
  //   this.setState({ categories: categories ? categories : [], displayCategory: this.props.displayCategory });
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   // debugger;
  //   console.log('MealCategoryList componentDidUpdate prevProps', prevProps);
  //   console.log('MealCategoryList componentDidUpdate prevState', prevState);

  //   if (prevState.categories !== this.state.categories) {
  //     const categories = UtilitiesService.getCategoriesInfo(this.props.meals, this.props.displayCategory);
  //     console.log('MealCategoryList componentDidUpdate this.props.meals', this.props.meals);
  //     console.log('MealCategoryList componentDidUpdate this.props.displayCategory', this.props.displayCategory);
  //     console.log('MealCategoryList componentDidUpdate categories', categories);

  //     // this.setState({ categories: categories ? categories : [], displayCategory: this.props.displayCategory });
  //   }
  // }

  render() {
    let categories = [];
    if (this.props.displayCategory.toLowerCase() == 'location') {
      categories = [
        { name: 'Dallas', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/dallas.jpg' },
        { name: 'Barcelona', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/barcelona.jpg' },
        { name: 'Bangkok', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/bangkok.jpg' },
        { name: 'Duino', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322154/duino.jpg' },
      ];
    } else {
      categories = [
        { name: 'American', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/default-c.jpg' },
        { name: 'Spanish', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/barcelona.jpg' },
        { name: 'Bangkok', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/asian.jpg' },
        { name: 'Italian', imgUrl: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/italian.jpg' },
      ];
    }

    return (
      <div className='main-categories-container category-cards'>
        {categories &&
          categories.map((category, idx) => {
            return <MealCategoryPreviewSM key={idx} category={category} displayCategory={this.props.displayCategory}></MealCategoryPreviewSM>;
          })}
      </div>
    );
  }
}

export default MealCategoryList;
