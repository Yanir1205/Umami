import React, { Component } from 'react';


import { withRouter } from "react-router";
import MealPreview from './MealPreview'

class MealList extends Component {

  render() {
    return (
      <section className='main-categories-container category-cards'>
        {this.props.meals.map(meal => (
          <div  key={meal._id}>
            <MealPreview onCardClick={this.props.onCardClick} meal={meal} getAvgRate={this.props.getAvgRate} renderType={this.props.renderType} />
          </div>
        ))}
      </section>
    )
  }
}

export default withRouter(MealList);




