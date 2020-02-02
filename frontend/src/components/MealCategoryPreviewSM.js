import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealCategoryPreviewSM extends Component {
  // state = { category: null, displayCategory: '', toggleIcon: '', toggleTxt: '', hostedTxt: '', txtPeriod: '' };
  // componentDidMount() {
  //   const { category } = this.props;
  //   this.setState({
  //     category: {
  //       nextAvailableDate: {
  //         date: category.nextAvailableDate.date,
  //         city: category.nextAvailableDate.city,
  //         country: category.nextAvailableDate.country,
  //         cuisine: category.nextAvailableDate.cuisine,
  //       },
  //       name: category.name,
  //       variations: category.variations,
  //       totalOccurrences: category.totalOccurrences,
  //       currentWeekOccurrences: category.currentWeekOccurrences,
  //       totalEvents: category.totalEvents,
  //       totalPrice: category.totalPrice,
  //       priceAvg: category.priceAvg,
  //       imgUrl: category.imgUrl,
  //     },
  //     variationIcon: this.props.displayCategory === 'Cuisine' ? 'https://res.cloudinary.com/contentexs/image/upload/v1580171634/location.svg' : 'https://res.cloudinary.com/contentexs/image/upload/v1580170530/dish-round.svg',
  //     variationTxt: this.props.displayCategory === 'Cuisine' ? `On ${category.variations.length} Different Locations` : `${category.variations.length} Different Cuisine Types`,
  //     hostedTxt: category.currentWeekOccurrences > 0 ? `${category.currentWeekOccurrences} Hosted Events` : `${category.totalOccurrences} Hosted Events`,
  //     txtPeriod: category.currentWeekOccurrences > 0 ? 'This Week' : '',
  //   });
  // }

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
