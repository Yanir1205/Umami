import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

class MealPayment extends Component {
  state = { meal: [], selectedOccurance: {}, numOfAttendees: 0, totalPrice: 0, date: '', availableSeats: 0, availableText: '', registerCounter: 0, buttonText: '', paymentClass: 'hide' };

  componentDidMount() {
    let { meal, loggedInUser } = this.props;
    let loggedUserOccurrence = meal.selectedOccurance.reservations.find(reservation => reservation.isLoggedInUser);

    this.setState({
      meal: meal,
      selectedOccurance: meal.selectedOccurance,
      numOfAttendees: loggedUserOccurrence && loggedUserOccurrence.isLoggedInUser ? loggedUserOccurrence.totalAttendees : 0,
      totalPrice: loggedUserOccurrence && loggedUserOccurrence.isLoggedInUser ? loggedUserOccurrence.totalPrice : 0,
      date: Moment(meal.selectedOccurance.date).format('MM-DD-YY'),
      availableSeats: parseInt(meal.selectedOccurance.seatsLeft),
      availableText: `${meal.selectedOccurance.seatsLeft} available seats`,
      registerCounter: 0,
      buttonText: loggedUserOccurrence && loggedUserOccurrence.isLoggedInUser ? 'UPDATE EVENT' : 'REGISTER EVENT',
      paymentClass: loggedUserOccurrence && loggedUserOccurrence.isLoggedInUser ? 'payment' : 'hide',
    });
  }

  handleChange = ev => {
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
      if (this.state.date !== Moment(value).format('MM-DD-YY')) {
        let selectedOccurance = this.state.meal.occurrences.find(current => {
          return Moment(current.date).format('MM-DD-YY') === Moment(value).format('MM-DD-YY');
        });

        let userReservation = selectedOccurance.reservations.find(reservation => reservation.user._id === this.props.loggedInUser._id);
        if (userReservation) userReservation.isLoggedInUser = true;

        this.setState({
          date: value,
          selectedOccurance: selectedOccurance,
        });
      }
    }
  };

  onEventRegistration = ev => {
    ev.preventDefault();
    if (this.state.registerCounter === 0) {
      this.setState({ registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
    } else if (this.state.registerCounter >= 1 && this.state.numOfAttendees !== 0) {
      this.setState({ registerCounter: 0 });
      this.props.onEventRegistration({ id: this.state.selectedOccurance.id, date: new Date(this.state.date).getTime(), numOfAttendees: this.state.numOfAttendees });
    }
  };

  render() {
    debugger
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
          <div className='date'>
            <label htmlFor='date'>Date</label>
            <input name='date' list='occurrences' placeholder='Select Event Date' value={this.state.date} onChange={this.handleChange} title='Select one of the event dates' className='input-date'></input>
            <datalist id='occurrences'>
              {meal.availableDates.map((current, idx) => {
                // if (current != this.state.date)
                return (
                  <option key={idx} value={Moment(current.date).format('MM-DD-YY')}>
                    {Moment(current.date).format('MM-DD-YY')}
                  </option>
                );
              })}
            </datalist>
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