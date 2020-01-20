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

import React from 'react';
import { withRouter } from 'react-router';
import MealPreview from './MealPreview';
import Paper from '@material-ui/core/Paper';

function MealList({ meals, history, getAvgRate }) {
  return (
    <section>
      <ul className="meal-list clean-list">
        {meals.map(meal => (
          <li key={meal._id} onClick={() => history.push(`/meal/${meal._id}`)}>
            <MealPreview meal={meal} getAvgRate={getAvgRate} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default withRouter(MealList);
