import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class MealCategoryPreview extends Component {
  state = { category: null, displayCategory: '', toggleIcon: '', toggleTxt: '', hostedTxt: '', txtPeriod: '' };
  componentDidMount() {
    const { category } = this.props;
    this.setState({
      category: {
        nextAvailableDate: {
          date: category.nextAvailableDate.date,
          city: category.nextAvailableDate.city,
          country: category.nextAvailableDate.country,
          cuisine: category.nextAvailableDate.cuisine,
        },
        name: category.name,
        variations: category.variations,
        totalOccurrences: category.totalOccurrences,
        currentWeekOccurrences: category.currentWeekOccurrences,
        totalEvents: category.totalEvents,
        totalPrice: category.totalPrice,
        priceAvg: category.priceAvg,
        imgUrl: category.imgUrl,
      },
      variationIcon: this.props.displayCategory === 'Cuisine' ? 'https://res.cloudinary.com/contentexs/image/upload/v1580171634/location.svg' : 'https://res.cloudinary.com/contentexs/image/upload/v1580170530/dish-round.svg',
      variationTxt: this.props.displayCategory === 'Cuisine' ? `On ${category.variations.length} Different Locations` : `${category.variations.length} Different Cuisine Types`,
      hostedTxt: category.currentWeekOccurrences > 0 ? `${category.currentWeekOccurrences} Hosted Events` : `${category.totalOccurrences} Hosted Events`,
      txtPeriod: category.currentWeekOccurrences > 0 ? 'This Week' : '',
    });
  }

  render() {
    if (!this.state.category) return <div></div>;
    return (
      <div className='category-card'>
        <img src={this.state.category.imgUrl} alt='category' className='card-img'></img>
        <h5 className='card-name'>{this.state.category.name}</h5>
        <div className='card-total-one'>
          <img src={this.state.variationIcon}></img>
          <div>
            <span>{this.state.variationTxt}</span>
          </div>
        </div>
        <div className='card-hosted'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/dinner-round.svg'></img>
          <div>
            <span> {this.state.hostedTxt} </span>
          </div>
        </div>
        <div className='card-next-date'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580170530/calender-round.svg'></img>
          <div>
            <span className='title'>Next Event Is On, </span> <span>{this.state.category.nextAvailableDate.date}</span>
          </div>
        </div>
        <div className='card-avg-price'>
          <img src='https://res.cloudinary.com/contentexs/image/upload/v1580328925/money.svg'></img>
          <div>
            <span className='title'>Avg Price Is, </span>
            <span>
              ${this.state.category.priceAvg}
              <small> (per guest)</small>
            </span>
          </div>
        </div>
        <div className='card-btn'>
          <Link to={`/meal/${this.props.displayCategory.toLowerCase()}`} className='btn'>
            <span className=''>View Events</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default MealCategoryPreview;
