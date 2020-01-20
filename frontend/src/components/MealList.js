import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export class MealList extends Component {
//   render() {
//     return <div>MealList</div>;
//   }
// }

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(MealList);

import { withRouter } from "react-router";
import MealPreview from './MealPreview'
import CuisinePreview from './CuisinePreview'
import LocationPreview from './LocationPreview'

class MealList extends Component {

  state = {
    cuisineTypes: '',
    locations: ''
  }

  componentDidMount() {
    this.getList();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.renderType !== this.props.renderType) {
      this.getList()
    }
  }

  getList = () => {
    if (this.props.renderType === 'cuisine') {
      //reduce to an array which includes all cuisine types in the DB

      const cuisineTypes = this.props.meals.reduce((acc, meal) => {
        return acc.includes(meal.cuisineType) ? acc : [...acc, meal.cuisineType]
      }, []);
      this.setState({ cuisineTypes: cuisineTypes, locations: '' })

    } else if (this.props.renderType === 'location') {
      //reduce to an array which includes all locations in the DB (reduce by city name)

      const locations = this.props.meals.reduce((acc, meal) => {
        return acc.includes(meal.location.city) ? acc : [...acc, meal.location.city]
      }, []);
      this.setState({ locations: locations, cuisineTypes: '' })
    }
  }

  render() {
    return (
      <section>
        {this.props.renderType === 'meal' && <div className="clean-list">
          {this.props.meals.map(meal => (
            <div className="" key={meal._id} onClick={() => this.props.history.push(`/meal/${meal._id}`)}>
              <MealPreview meal={meal} getAvgRate={this.props.getAvgRate} />
            </div>
          ))}
        </div>}

        {this.props.renderType === 'cuisine' && this.state.cuisineTypes && <div>
          {this.state.cuisineTypes.map(cuisineType => {
            return <div className="cuisine-card-container" key={cuisineType}>
              <CuisinePreview cuisineType={cuisineType} onCuisineClick={this.props.onCuisineClick}></CuisinePreview>
            </div>
          })}
        </div>}

        {this.props.renderType === 'location' && this.state.locations && <div>
          {this.state.locations.map(location => {
            return <div className="cuisine-card-container" key={location}>
              <LocationPreview location={location} onLocationClick={this.props.onLocationClick}></LocationPreview>
            </div>
          })}
        </div>}

      </section>
    )
  }
}

export default withRouter(MealList)
