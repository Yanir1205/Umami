import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

class MealPayment extends Component {
  state = { meal: [], selectedOccurance: {}, numOfAttendees: 0, totalPrice: 0, date: '', availableSeats: 0, availableText: '', registerCounter: 0, buttonText: '', paymentClass: 'hide', displayMsg: 'hide', msg: '' };

  componentDidMount() {
    let { meal } = this.props;
    let userOccurrence = meal.selectedOccurance.reservations.find(reservation => reservation.isLoggedInUser);

    this.setState({
      meal: meal,
      msg: userOccurrence && userOccurrence.isLoggedInUser ? meal.messages.userRegistered : '',
      displayMsg: userOccurrence && userOccurrence.isLoggedInUser ? '' : 'hide',
      selectedOccurance: meal.selectedOccurance,
      numOfAttendees: userOccurrence && userOccurrence.isLoggedInUser ? userOccurrence.occurrenceAttendees : 0,
      totalPrice: userOccurrence && userOccurrence.isLoggedInUser ? userOccurrence.occurrenceTotalPrice : 0,
      date: Moment(meal.selectedOccurance.date).format('MM-DD-YY'),
      availableSeats: parseInt(meal.selectedOccurance.seatsLeft),
      availableText: `${meal.selectedOccurance.seatsLeft} available seats`,
      registerCounter: 0,
      buttonText: userOccurrence && userOccurrence.isLoggedInUser ? 'UPDATE EVENT' : 'REGISTER EVENT',
      paymentClass: userOccurrence && userOccurrence.isLoggedInUser ? 'payment' : 'hide',
    });
  }

  handleChange = ev => {
    debugger;
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;
    if (name === 'numOfAttendees' && this.state.numOfAttendees !== value) {
      this.setState({
        numOfAttendees: parseInt(value),
        totalPrice: parseInt(value) * parseInt(this.state.meal.price),
        availableSeats: parseInt(this.state.availableSeats) - parseInt(value),
        availableText: `${parseInt(this.state.availableSeats) - parseInt(value)} available seats`,
      });
    } else {
      debugger;
      if (this.state.date !== value) {
        debugger;
        let selectedOccurance = this.props.meal.occurrences.find(current => {
          return Moment(current.date).format('MM-DD-YY') === value;
        });

        if (this.props.loggedInUser) {
          let userOccurrence = selectedOccurance.reservations.find(reservation => reservation.user._id === this.props.loggedInUser._id);
          if (userOccurrence) userOccurrence.isLoggedInUser = true;
        }

        this.setState({
          date: value,
          selectedOccurance: selectedOccurance,
          availableSeats: parseInt(selectedOccurance.seatsLeft) - parseInt(this.state.numOfAttendees),
          availableText: `${parseInt(selectedOccurance.seatsLeft) - parseInt(this.state.numOfAttendees)} available seats`,
          msg: '',
          displayMsg: 'hide',
        });
      }
    }
  };

  onEventRegistration = ev => {
    ev.preventDefault();
    debugger;
    if (this.state.registerCounter === 0) {
      this.setState({ registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
    } else if (this.state.registerCounter >= 1 && this.state.numOfAttendees !== 0) {
      if (!this.props.loggedInUser) {
        console.log('Meal Reservation - user not logged in');
        this.setState({ msg: this.state.meal.messages.pleaseLogin, displayMsg: '' });
        return;
      }
      debugger;
      this.setState({ registerCounter: 0, msg: '', displayMsg: 'hide' });
      this.props.onEventRegistration({ id: this.state.selectedOccurance.id, date: +Moment(this.state.date, 'MM-DD-YY'), numOfAttendees: this.state.numOfAttendees });
    }
  };

  render() {
    const { meal } = this.props;
    console.log('MealPayment - props', this.props);
    console.log('MealPayment - state', this.state);

    return (
      <div className='card-simple payment-container'>
        <div className='price'>
          <span>$</span>
          {meal.price}
          <small>per guest</small>
        </div>
        <div>
          <hr />
        </div>
        <div className='details-container'>
          <div className='msg'>
            <span className={this.state.displayMsg}>{this.state.msg}</span>
          </div>
          <div className='date'>
            <label htmlFor='date'>Date</label>
            <select name='date' onChange={this.handleChange} value={this.state.date}>
              {meal.availableDates.map((current, idx) => {
                return (
                  <option key={idx} value={Moment(current.date).format('MM-DD-YY')}>
                    {Moment(current.date).format('MM-DD-YY')}
                  </option>
                );
              })}
            </select>
          </div>
          <div className='guests'>
            <label htmlFor='numOfAttendees'>Number of Guests</label>
            <input type='number' placeholder='Number of Guests' min='1' name='numOfAttendees' onChange={this.handleChange} value={this.state.numOfAttendees === 0 ? '' : this.state.numOfAttendees}></input>
            <small className='small-text'>{this.state.availableText}</small>
          </div>
          <div className={this.state.paymentClass}>
            <ul className='clean-list'>
              <li>
                <span>
                  ${meal.price} x {this.state.numOfAttendees}
                </span>
                <span>guests</span>
              </li>
              <li>
                <span>Total</span>
                <span>${this.state.totalPrice}</span>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={this.onEventRegistration} className='button btn-main'>
              {this.state.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

export default connect(mapStateToProps, null)(MealPayment);

// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Moment from 'moment';

// import Utilities from '../services/UtilitiesService';

// class MealPayment extends Component {
//   state = { meal: [], activeOccurrence: 0, numOfAttendees: 0, date: '', totalPrice: 0, availableSlots: 0, availableText: '', buttonText: 'REGISTER EVENT', registerCounter: 0, paymentClass: 'hide' };

//   componentDidMount() {
//     const meal = { ...this.props.meal };
//     meal.occurrences.sort(Utilities.sortunction);
//     let date = Moment(meal.occurrences[0].date).format('MM-DD-YY');
//     let activeOccurrence = meal.occurrences[0];
//     let availableSlots = parseInt(meal.capacity) - parseInt(activeOccurrence.total);
//     let availableText = `${availableSlots} available slots`;

//     if (!this.props.loggedInUser) {
//       this.setState({
//         meal: meal,
//         activeOccurrence: activeOccurrence,
//         date: date,
//         availableSlots: availableSlots,
//         availableText: availableText,
//       });
//     } else {
//       let userOccurrences = meal.occurrences.reduce((result, current) => {
//         let user = current.attendees.filter(attendee => attendee._id === this.props.loggedInUser._id);
//         if (user && user.length > 0) result.push({ user: user[0], activeOccurrence: current });
//         return result;
//       }, []);

//       let numOfAttendees = 0,
//         totalPrice = 0;

//       if (userOccurrences && userOccurrences.length > 0) {
//         activeOccurrence = userOccurrences[0].activeOccurrence;
//         date = Moment(activeOccurrence.date).format('MM-DD-YY');
//         numOfAttendees = userOccurrences[0].user.numOfAttendees;
//         totalPrice = parseInt(numOfAttendees) * parseInt(meal.price);
//         availableSlots = parseInt(meal.capacity) - parseInt(activeOccurrence.total);
//         availableText = `${availableSlots} available slots`;
//       } else userOccurrences = [];

//       this.setState({
//         meal: meal,
//         activeOccurrence: activeOccurrence,
//         numOfAttendees: numOfAttendees,
//         totalPrice: totalPrice,
//         date: date,
//         availableSlots: availableSlots,
//         availableText: availableText,
//         registerCounter: numOfAttendees === 0 ? 0 : 1,
//         buttonText: numOfAttendees === 0 ? 'REGISTER EVENT' : 'UPDATE EVENT',
//         paymentClass: numOfAttendees === 0 ? 'hide' : 'payment',
//       });
//     }
//   }

//   handleChange = ev => {
//     ev.preventDefault();

//     let name = ev.target.name;
//     let value = ev.target.value;

//     if (name === 'numOfAttendees' && this.state.numOfAttendees !== value) {
//       let totalPrice = value * this.props.meal.price;
//       this.setState({ numOfAttendees: value, totalPrice: totalPrice });
//     } else {
//       let activeOccurrence = this.state.meal.occurrences.find(current => {
//         return Moment(current.date).format('MM-DD-YY') === Moment(value).format('MM-DD-YY');
//       });

//       this.setState({ date: value, activeOccurrence: activeOccurrence });
//     }
//   };

//   onEventRegistration = ev => {
//     ev.preventDefault();
//     debugger;
//     if (this.state.registerCounter === 0) {
//       let calcPrice = this.state.numOfAttendees * this.props.meal.price;
//       this.setState({ totalPrice: calcPrice, registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
//     } else if (this.state.registerCounter >= 1 && this.state.numOfAttendees !== 0) {
//       this.setState({ registerCounter: 0 });
//       this.props.onEventRegistration({ id: this.state.activeOccurrence.id, date: new Date(this.state.date).getTime(), numOfAttendees: this.state.numOfAttendees });
//     }
//   };

//   render() {
//     const { meal } = this.props;
//     return (
//       <div className='card-simple payment-container'>
//         <div className='price'>
//           <span>${meal.price}</span>
//           <small>per guest</small>
//         </div>
//         <div>
//           <hr />
//         </div>
//         <div className='details-container'>
//           <div className='date'>
//             <label htmlFor='date'>Date</label>
//             <input name='date' list='occurrences' placeholder='Select Event Date' value={this.state.date} onChange={this.handleChange} title='Select one of the event dates' className='input-date'></input>
//             <datalist id='occurrences'>
//               {meal.occurrences.map((occurrence, idx) => {
//                 return (
//                   <option key={idx} value={Moment(occurrence.date).format('MM-DD-YY')}>
//                     {Moment(occurrence.date).format('MM-DD-YY')}
//                   </option>
//                 );
//               })}
//             </datalist>
//           </div>
//           <div className='guests'>
//             <label htmlFor='numOfAttendees'>Number of Guests</label>
//             <input type='number' placeholder='Number of Guests' min='1' name='numOfAttendees' onChange={this.handleChange} value={this.state.numOfAttendees === 0 ? '' : this.state.numOfAttendees}></input>
//             <small className='small-text'>{this.state.availableText}</small>
//           </div>
//           <div className={this.state.paymentClass}>
//             <ul className='clean-list'>
//               <li>
//                 <span>
//                   ${meal.price} x {this.state.numOfAttendees}
//                 </span>
//                 <span>guests</span>
//               </li>
//               <li>
//                 <span>Total</span>
//                 <span>${this.state.totalPrice}</span>
//               </li>
//             </ul>
//           </div>
//           <div>
//             <button onClick={this.onEventRegistration} className='button btn-main'>
//               {this.state.buttonText}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => ({
//   loggedInUser: state.user.loggedInUser,
// });

// export default connect(mapStateToProps, null)(MealPayment);
