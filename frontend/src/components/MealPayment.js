import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

class MealPayment extends Component {
  state = { meal: [], selectedOccurance: {}, numOfAttendees: 0, totalPrice: 0, date: '', availableSeats: 0, availableText: '', registerCounter: 0, buttonText: '', paymentClass: 'hide', displayMsg: 'hide', msg: '' };

  componentDidMount() {
    let { meal } = this.props;
    let userOccurrence = null;
    if (meal.selectedOccurance && meal.selectedOccurance.reservations && meal.selectedOccurance.reservations.length > 0) {
      userOccurrence = meal.selectedOccurance.reservations.find(reservation => reservation.isLoggedInUser);

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
        buttonText: userOccurrence && userOccurrence.isLoggedInUser ? 'Update Event' : 'Register Event',
        paymentClass: userOccurrence && userOccurrence.isLoggedInUser ? 'payment' : 'hide',
      });
    } else if (meal.selectedOccurance) {
      this.setState({
        meal: meal,
        msg: '',
        displayMsg: 'hide',
        selectedOccurance: meal.selectedOccurance,
        numOfAttendees: 0,
        totalPrice: 0,
        date: Moment(meal.selectedOccurance.date).format('MM-DD-YY'),
        availableSeats: parseInt(meal.selectedOccurance.seatsLeft),
        availableText: `${meal.selectedOccurance.seatsLeft} available seats`,
        registerCounter: 0,
        buttonText: 'Register Event',
        paymentClass: 'hide',
      });
    } else {
      this.setState({
        meal: meal,
        msg: '',
        displayMsg: 'hide',
        selectedOccurance: {},
        numOfAttendees: 0,
        totalPrice: 0,
        date: Moment(new Date()).format('MM-DD-YY'),
        availableSeats: 0,
        availableText: `There are no available seats`,
        registerCounter: 0,
        buttonText: 'Event',
        paymentClass: 'hide',
      });
    }
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
      if (this.state.date !== value) {
        let selectedOccurance = this.props.meal.occurrences.find(current => {
          return Moment(current.date).format('MM-DD-YY') === value;
        });

        if (this.props.loggedInUser && selectedOccurance.reservations && selectedOccurance.reservations.length > 0) {
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
        }, this.updateOccurrance);
      }
    }
    //set the selectedOccurrence in the meal object to contain the actualy selected occurrance from this function!
  };

  updateOccurrance = () => {
    this.props.onChangeDate(this.state.selectedOccurance)
  }

  onEventRegistration = ev => {
    ev.preventDefault();
    if (this.state.registerCounter === 0) {
      this.setState({ registerCounter: 1, buttonText: 'Book Event', paymentClass: 'payment' });
    } else if (this.state.registerCounter >= 1 && this.state.numOfAttendees !== 0) {
      if (!this.props.loggedInUser) {
        console.log('Meal Reservation - user not logged in');
        this.setState({ msg: this.state.meal.messages.pleaseLogin, displayMsg: '' });
        return;
      }
      this.props.onEventRegistration({ id: this.state.selectedOccurance.id, date: +Moment(this.state.date, 'MM-DD-YY'), numOfAttendees: this.state.numOfAttendees });
      this.setState({ registerCounter: 0, msg: '', displayMsg: 'hide', buttonText: 'Book Event', paymentClass: 'hide' });
    }
  };

  render() {
    const { meal } = this.props;
    return (
      <div className='card-simple card-bkg-yellow  payment-container'>
        <div className='price'>
          <span>$</span>
          {meal.price}
          <small>per guest</small>
        </div>
        <div></div>
        <div className='details-container'>
          <div className='msg'>
            <span className={this.state.displayMsg}>{this.state.msg}</span>
          </div>
          <div className='date'>
            <label htmlFor='date'>Date</label>
            <select name='date' onChange={this.handleChange} value={this.state.date} style={{ fontFamily: 'raleway' }} className='minimal'>
              {meal.availableDates.length > 0 ? meal.availableDates.map((current, idx) => {
                return (
                  <option key={idx} value={Moment(current.date).format('MM-DD-YY')}>
                    {Moment(current.date).format('MM-DD-YY')}
                  </option>
                );
              }) : <option key={1} value={'No Dates Available!'}></option>}
            </select>
          </div>
          <div className='guests'>
            <label htmlFor='numOfAttendees'>Number of Guests</label>
            <input type='number' placeholder='Number of Guests' min='1' name='numOfAttendees' onChange={this.handleChange} value={this.state.numOfAttendees === 0 ? '' : this.state.numOfAttendees}></input>
            <small className='small-text'>{}</small>
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
            <button onClick={this.onEventRegistration} className='button btn-red'>
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
