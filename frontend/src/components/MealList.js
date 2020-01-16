// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export class MealList extends Component {
//   render() {
//     return <div>MealList</div>;
//   }
// }

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(MealList);

import React from "react";
import { withRouter } from "react-router";
import MealPreview from './MealPreview'

function MealList({ meals, history, getCityName, getAvgRate }) {
  return (
    <section>
      <ul>
        {meals.map(meal => (
          <li key={meal._id} onClick={() => history.push(`/meal/${meal._id}`)}>
            <MealPreview meal={meal} getCityName={getCityName} getAvgRate={getAvgRate}/>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default withRouter(MealList)
