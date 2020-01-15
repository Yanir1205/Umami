// import React, { Component } from 'react';
// import { connect } from 'react-redux';

// export class MealPreview extends Component {
//   render() {
//     return <div>MealPreview</div>;
//   }
// }

// const mapStateToProps = state => ({});

// const mapDispatchToProps = {};

// export default connect(mapStateToProps, mapDispatchToProps)(MealPreview);


import React from "react";

export default function MealPreview({ meal }) {
  return (
    <section>
      <h5>{meal.title}</h5>
    </section>
  )
}