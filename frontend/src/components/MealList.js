import React, { Component } from 'react';


import { withRouter } from "react-router";
import MealPreview from './MealPreview'
import CuisinePreview from './CuisinePreview'
import LocationPreview from './LocationPreview'

class MealList extends Component {

  render() {
    return (

      <section >
        {this.props.renderType === 'meal' && <div className="meal-list clean-list">
          {this.props.meals.map(meal => (
            <div className="" key={meal._id} onClick={() => this.props.history.push(`/meal/${meal._id}`)}>
              <MealPreview meal={meal} getAvgRate={this.props.getAvgRate} />
            </div>
          ))}
        </div>}

        {this.props.renderType === 'cuisine' && this.props.cuisineTypes && <div>
          {this.props.cuisineTypes.map(cuisineType => {
            return <div className="cuisine-card-container" key={cuisineType}>
              <CuisinePreview  cuisineType={cuisineType} onCuisineClick={this.props.onCuisineClick}></CuisinePreview>
            </div>
          })}
        </div>}

        {this.props.renderType === 'location' && this.props.locations && <div>
          {this.props.locations.map(location => {
            return <div className="cuisine-card-container" key={location}>
              <LocationPreview location={location} onLocationClick={this.props.onLocationClick}></LocationPreview>
            </div>
          })}
        </div>}

      </section>
    )
  }
}

export default withRouter(MealList);
