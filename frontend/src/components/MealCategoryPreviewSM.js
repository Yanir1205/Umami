import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealCategoryPreviewSM extends Component {
  render() {
    if (!this.props.category) return <div></div>;
    return (
      <Link to={`/meal/${this.props.displayCategory.toLowerCase()}/${this.props.category.name}`}>
        <div className='category-card-sm flex column'>
          <img src={this.props.category.imgUrl} alt='category' className='card-img'></img>
          <h5 className='card-name'>{this.props.category.name}</h5>
        </div>
      </Link>
    );
  }
}

export default MealCategoryPreviewSM;
