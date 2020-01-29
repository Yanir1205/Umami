import React from 'react';
import MealCategoryPreview from './MealCategoryPreview';
import UtilitiesService from '../services/UtilitiesService';

function MealCategoryList(meals, category) {
  const categories = UtilitiesService.getCategoriesInfo(meals, category);
  return (
    <div className='main-categories-container'>
      <div></div>
      {categories &&
        categories.map((category, idx) => {
          return <MealCategoryPreview key={idx} category={category}></MealCategoryPreview>;
        })}
    </div>
  );
}

export default MealCategoryList;
