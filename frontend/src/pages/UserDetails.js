import React, { Component } from 'react';
import { connect } from 'react-redux';

import { load } from '../actions/MealActions'

export class UserDetails extends Component {

  //this page will display a calander. each date with a meal will appear with a special icon
  //when clicking on a specific date, a table will appear (below the calander) with all the meals of the chosen date
  //the table will show all attended meals and hosted meals of the chosen day
  //for any meal of which the current user is a host - the table will enable view, edit (remove???)
  //for any meal of which the current user is an attendee - the table will enable view and remove

  //the component will get inside it props - the user id (in match.params in the url)

  componentDidMount() {
    //get the user id from match.params
    //get all the meals related to this user by its id (a mongoDB find function)
    //for now (as long as we are using the json-server instead of mongoDB), we will perform a filter in the frontend
    //instead of a simple mongoDB find function
    const { id } = this.props.match.params
    debugger
    this.props.load()
  }

  get mealsToShow() {
    //filters the meals by this user id
    const { id } = this.props.match.params
    this.props.meals.filter(meal => {
      return (meal.attendees.filter(attendedUser => attendedUser._id === id) || meal.hostedBy._id === id);
    })
  }


  render() {
    return <div>UserDetails</div>
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals
});

const mapDispatchToProps = {
  load,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);


/*

import React, { useState } from "react";
import { Badge } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import { makeJSDateObject } from "../../../utils/helpers";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ServerRequest() {
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <DatePicker
        label="With server data"
        value={selectedDate}
        onChange={handleDateChange}
        onMonthChange={handleMonthChange}
        renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
          const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());

          // You can also use our internal <Day /> component
          return <Badge badgeContent={isSelected ? "🌚" : undefined}>{dayComponent}</Badge>;
        }}
      />
    </>
  );
}

export default ServerRequest;


*/