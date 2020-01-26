import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'moment';

import Utilities from '../services/UtilitiesService';

class MealPayment extends Component {
  state = { meal: [], activeOccurrence: 0, attendees: 0, date: '', totalPrice: 0, availableSlots: 0, availableText: '', buttonText: 'REGISTER EVENT', registerCounter: 0, paymentClass: 'hide' };

  componentDidMount() {
    const meal = { ...this.props.meal };
    meal.occurrences.sort(Utilities.sortunction);
    let date = Moment(meal.occurrences[0].date).format('MM-DD-YY');
    let activeOccurrence = meal.occurrences[0];
    let availableSlots = parseInt(meal.capacity) - parseInt(activeOccurrence.total);
    let availableText = `${availableSlots} available slots`;

    if (!this.props.loggedInUser) {
      this.setState({
        meal: meal,
        activeOccurrence: activeOccurrence,
        date: date,
        availableSlots: availableSlots,
        availableText: availableText,
      });
    } else {
      let userOccurrences = meal.occurrences.reduce((result, current) => {
        let user = current.attendees.filter(attendee => attendee._id === this.props.loggedInUser._id);
        if (user && user.length > 0) result.push({ user: user[0], activeOccurrence: current });
        return result;
      }, []);

      let attendees = 0,
        totalPrice = 0;

      if (userOccurrences && userOccurrences.length > 0) {
        activeOccurrence = userOccurrences[0].activeOccurrence;
        date = Moment(activeOccurrence.date).format('MM-DD-YY');
        attendees = userOccurrences[0].user.numOfAttendees;
        totalPrice = parseInt(attendees) * parseInt(meal.price);
        availableSlots = parseInt(meal.capacity) - parseInt(activeOccurrence.total);
        availableText = `${availableSlots} available slots`;
      } else userOccurrences = [];

      this.setState({
        meal: meal,
        activeOccurrence: activeOccurrence,
        attendees: attendees,
        totalPrice: totalPrice,
        date: date,
        availableSlots: availableSlots,
        availableText: availableText,
        registerCounter: attendees === 0 ? 0 : 1,
        buttonText: attendees === 0 ? 'REGISTER EVENT' : 'UPDATE EVENT',
        paymentClass: attendees === 0 ? 'hide' : 'payment',
      });
    }
  }

  handleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;

    if (name === 'attendees' && this.state.attendees !== value) {
      let totalPrice = value * this.props.meal.price;
      this.setState({ attendees: value, totalPrice: totalPrice });
    } else {
      let activeOccurrence = this.state.meal.occurrences.find(current => {
        return Moment(current.date).format('MM-DD-YY') === Moment(value).format('MM-DD-YY');
      });

      this.setState({ date: value, activeOccurrence: activeOccurrence });
    }
  };

  onEventRegistration = ev => {
    ev.preventDefault();
    if (this.state.registerCounter === 0) {
      let calcPrice = this.state.attendees * this.props.meal.price;
      this.setState({ totalPrice: calcPrice, registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
    } else if (this.state.registerCounter >= 1 && this.state.attendees !== 0) {
      this.setState({ registerCounter: 0 });
      this.props.onEventRegistration({ id: this.state.activeOccurrence.id, date: new Date(this.state.date).getTime(), attendees: this.state.attendees });
    }
  };

  render() {
    const { meal } = this.props;
    return (
      <div className='card-simple payment-container'>
        <div className='price'>
          <span>${meal.price}</span>
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
              {meal.occurrences.map((occurrence, idx) => {
                return (
                  <option key={idx} value={Moment(occurrence.date).format('MM-DD-YY')}>
                    {Moment(occurrence.date).format('MM-DD-YY')}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className='guests'>
            <label htmlFor='attendees'>Number of Guests</label>
            <input type='number' placeholder='Number of Guests' min='1' name='attendees' onChange={this.handleChange} value={this.state.attendees === 0 ? '' : this.state.attendees}></input>
            <small className='small-text'>{this.state.availableText}</small>
          </div>
          <div className={this.state.paymentClass}>
            <ul className='clean-list'>
              <li>
                <span>
                  ${meal.price} x {this.state.attendees}
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
            <button onClick={this.onEventRegistration} className='button btn-ghost'>
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
