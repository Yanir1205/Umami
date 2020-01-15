import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getById} from '../actions/MealActions'
export class MealDetails extends Component {
  componentDidMount(){
    // const id = this.props.match.params
    // this.props.getById(id)
    
  }
  render() {
    const id = this.props.match.params
    const meal = this.props.getById(id)
    console.log("MealDetails -> render id",this.props.match.params);
    console.log("MealDetails -> render ",meal);
    
    return <div>MEAL DETAILS</div>
  }
}

const mapStateToProps = state => (
  {meal:state.meal.meal}
  );

const mapDispatchToProps = {
  getById
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
