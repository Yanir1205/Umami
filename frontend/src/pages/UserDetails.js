import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { load } from '../actions/MealActions';
<<<<<<< HEAD
import DateFnsUtils from '@date-io/date-fns';
=======
import { setFilter } from '../actions/FlterActions'
import DateFnsUtils from "@date-io/date-fns";
>>>>>>> 867d3455d76da21179ece75d8bebc9a675c89726

import UserMealList from '../components/UserMealList';
import Calander from '../components/Calander';

export class UserDetails extends Component {
  //this page will display a calander. each date with a meal will appear with a special icon
  //when clicking on a specific date, a table will appear (below the calander) with all the meals of the chosen date
  //the table will show all attended meals and hosted meals of the chosen day
  //for any meal of which the current user is a host - the table will enable view, edit (remove???)
  //for any meal of which the current user is an attendee - the table will enable view and remove

<<<<<<< HEAD
  //the component will get inside it props - the user id (in match.params in the url)

  state = {
    date: new Date(Date.now()),
  };

=======
>>>>>>> 867d3455d76da21179ece75d8bebc9a675c89726
  componentDidMount() {
    //get the user id from match.params
    //get all the meals related to this user by its id (a mongoDB find function)
    //for now (as long as we are using the json-server instead of mongoDB), we will perform a filter in the frontend
    //instead of a simple mongoDB find function
<<<<<<< HEAD

    //[LIOR] - Just in case - not sure which part is needed :)
    // const { id } = this.props.match.params;
    // this.props.load();

    this.props.load(); //loads all the meals
    this.filterMealsForCurrUser();
=======
    // this.props.setFilter({ ...this.props.filter, at: new Date(), userId: this.props.match.params.id }) //sets the filter
    // this.props.load(this.props.filter); //loads only the filtered meals into the state and the data
    // this.filterMealsForCurrUser()
    this.props.setFilter({ ...this.props.filter, userId: this.props.match.params.id })

    //should be (when the server will be ready)
    //this.props.load({at: this.state.date, byUserId: this.props.match.params.id})
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.filter) !== JSON.stringify(this.props.filter)) {
      this.loadMeals();
    }
  }

  loadMeals() {
    this.props.load(this.props.filter);
>>>>>>> 867d3455d76da21179ece75d8bebc9a675c89726
  }

  onDateChange = newDate => {
    //whenver the user changes the date on the calander this function will operate
    //it will change the table (which appears below the calander), so that it will display the event of the chosen date
<<<<<<< HEAD
    this.setState({ date: newDate });
  };
=======
    // this.setState(prevState => ({ date: newDate, filterBy: { ...prevState.filterBy, at: newDate.toLocaleDateString() } }))
    this.props.setFilter({ ...this.props.filter, at: Date.parse(newDate) })
  }
>>>>>>> 867d3455d76da21179ece75d8bebc9a675c89726

  filterMealsForCurrUser = () => {
    //gets the meals from the props (this.props.meals)
    //filters the props and returns the fltered results according to the user id from the url
    const { id } = this.props.match.params;

    //getting the meal items this user is hosting:
    const hostMeals = this.props.meals.filter(meal => meal.hostedBy._id === id);

    //getting the meal items this user is attending:
    let attendedMeals = [];
    for (let i = 0; i < this.props.meals.length; i++) {
      for (let j = 0; j < this.props.meals[i].attendees.length; j++) {
        if (this.props.meals[i].attendees[j]._id === id) {
          attendedMeals.push(this.props.meals[i]);
        }
      }
    }
    return { hostMeals, attendedMeals };
<<<<<<< HEAD
  };

  render() {
    console.log(this.filterMealsForCurrUser());
    const { hostMeals, attendedMeals } = this.filterMealsForCurrUser();
    return (
      <div>
        UserDetails
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Calander date={this.state.date} onDateChange={this.onDateChange}></Calander>
        </MuiPickersUtilsProvider>
        <UserMealList attended={attendedMeals} host={hostMeals}></UserMealList>
      </div>
    );
=======
  }

  mealsToShow = () => {
    const { id } = this.props.match.params
    const attended = [];
    const host = [];
    this.props.meals.forEach(meal => {
      if (meal.hostedBy.id === id) {
        host.push(meal);
      } else {
        attended.push(meal);
      }
    })
    return { host, attended }
  }

  onCreateMeal = () => {
    debugger
    this.props.history.push('/meal/edit');
  }

  render() {
    const { host, attended } = this.mealsToShow();
    return <div>
      UserDetails
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Calander date={this.props.filter.at} onDateChange={this.onDateChange}></Calander>
      </MuiPickersUtilsProvider>
      <button className="create-new-meal btn" onClick={this.onCreateMeal}>CREATE MEAL</button>
      {this.props.meals.length > 0 && <UserMealList attended={attended} host={host}></UserMealList>}
    </div>
>>>>>>> 867d3455d76da21179ece75d8bebc9a675c89726
  }
}

const mapStateToProps = state => ({
  meals: state.meal.meals,
  filter: state.filter.filter
});

const mapDispatchToProps = {
  load,
  setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetails);

// getUserMeals = () => {
//   //filters the meals by this user id
//   const { id } = this.props.match.params
//   let hostMeals = this.props.meals.filter(meal => meal.hostedBy._id === id)
//   let attendedMeals = [];
//   // const attendedByCurrUser = this.props.meals.reduce((acc, meal) => {
//   //   return acc.push(meal.attendees.filter(attendedUser => {
//   //     return attendedUser._id === id
//   //   }))
//   // }, [])
//   for (let i = 0; i < this.props.meals.length; i++) {
//     for (let j = 0; j < this.props.meals[i].attendees.length; j++) {
//       if (this.props.meals[i].attendees[j]._id === id) {
//         attendedMeals.push(this.props.meals[i])
//       }
//     }
//   }
//   return { hostMeals, attendedMeals };
// }
