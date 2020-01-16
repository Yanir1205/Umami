import React, { Component } from 'react';
import { connect } from 'react-redux';
import {getById} from '../actions/MealActions'
import Menu from '../components/Menu'
export class MealDetails extends Component {
  componentDidMount(){
    
    const id = this.props.match.params.id
    this.props.getById(id)
    
  }
  render() {
    
    const meal = this.props.meal
    console.log("MealDetails -> render id",this.props.match.params);
    console.log("MealDetails -> render meal",meal);
    debugger
    return <div>MEAL DETAILS
      {meal && <div>
        <h2>{meal.title}</h2> 
        <p> {meal.txt}</p>
      <p>Adrress: {meal.location.address}</p>
      <p>hosted by: {meal.hostedBy.fullName} 
      
      <img className="user-Img" src={meal.hostedBy.imgUrl}></img>
      <Menu menu={meal.menu}/>
        <img src={meal.imgUrls[0]}></img></p>

        </div>}
        </div>
  }
}

const mapStateToProps = state => (
  {meal:state.meal.meal}
  );

const mapDispatchToProps = {
  getById,

};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
