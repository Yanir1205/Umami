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
import Paper from '@material-ui/core/Paper';


// function MealList({ meals, history, getCityName, getAvgRate }) {
function MealList(props) {
  const classes = props;

  return (
    <section>
      <ul className="clean-list">
        {props.meals.map(meal => (
          <Paper elevation={1} className={classes.paper}>
            <li key={meal._id} onClick={() => props.history.push(`/meal/${meal._id}`)}>
              <MealPreview meal={meal} getAvgRate={props.getAvgRate} />
            </li>
          </Paper>
        ))}
      </ul>
    </section>
  )
}

export default withRouter(MealList)
