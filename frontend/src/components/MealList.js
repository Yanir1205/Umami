import React, { Component } from 'react';
import { withRouter } from "react-router";
// import MealPreview from './MealPreview'
import PreviewWithCarousel from './PreviewWithCarousel'

class MealList extends Component {

  render() {
    return (
      <section className="container category-cards-list">
        {this.props.meals.map(meal => (
          <div  key={meal._id}>
            <PreviewWithCarousel onCardClick={this.props.onCardClick} meal={meal} getAvgRate={this.props.getAvgRate} renderType={this.props.renderType} />
          </div>
        ))}
      </section>
    )
  }
}

export default withRouter(MealList);




