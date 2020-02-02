import React, { Component } from 'react';
import MealEventPreview from './MealEventPreview';
import UtilitiesService from '../services/UtilitiesService';

class MealEventList extends Component {
  // state = { meals: [] };
  // componentDidMount() {
  //   const meals = UtilitiesService.getTopEventsInfo(this.props.meals, 4);
  //   this.setState({ meals: meals ? meals : [] });
  // }

  render() {
    let meals = [];

    meals = [
      { _id: '5e273828d7a1f4e499a19d16', imgUrl: 'http://res.cloudinary.com/due4sgv19/image/upload/v1580641219/xn93qtdhbrskrw8iebqz.jpg', city: 'Dallas', country: 'TEXAS', price: 45, cuisineType: 'American', title: "Arkadiy's American Dinner" },
      {
        _id: '5e296e0e02c9ab91791f509d',
        imgUrl: 'https://cdn-image.departures.com/sites/default/files/styles/responsive_900x600/public/1543595955/floral-cobblestone-streets-cadaques-costa-brava-spain-GAUDISPAIN1118.jpg?itok=lNxj1eU-',
        city: 'Barcelona',
        country: 'Spain',
        price: 45,
        cuisineType: 'Spanish',
        title: 'El Rey Del Paella',
      },
      { _id: '5e296e0e02c9ab91791f509c', imgUrl: 'https://www.pata.org/wp-content/uploads/2017/07/unnamed-19.jpg', city: 'Bangkok', country: 'Thailand', price: 30, cuisineType: 'Asian', title: "Waan's Thai Appetizers" },
      { _id: '5e297aff02c9ab91791f509e', imgUrl: 'https://image.shutterstock.com/image-photo/palma-de-mallorca-spain-may-260nw-490104130.jpg', city: 'Barcelona', country: 'Spain', price: 32, cuisineType: 'Spanish', title: 'Casa Patricia' },
    ];

    return (
      <div className='main-categories-container category-cards'>
        {meals &&
          meals.map((meal, idx) => {
            return <MealEventPreview key={idx} meal={meal}></MealEventPreview>;
          })}
      </div>
    );
  }
}

export default MealEventList;
