import React, { Component } from 'react';


import { withRouter } from "react-router";
import MealPreview from './MealPreview'

class MealList extends Component {

  render() {
    return (
      <section className="card-container meal-list">
        {this.props.meals.map(meal => (
          <div className="" key={meal._id}>
            <MealPreview  onCardClick={this.props.onCardClick} meal={meal} getAvgRate={this.props.getAvgRate} renderType={this.props.renderType} />
          </div>
        ))}
        {/* <MealPreview onCardClick={this.props.onCardClick} meal={this.props.meals[0]} getAvgRate={this.props.getAvgRate} renderType={this.props.renderType}/> */}
      </section>
    )
  }
}

export default withRouter(MealList);




