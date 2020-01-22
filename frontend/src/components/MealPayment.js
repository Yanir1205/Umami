import React, { Component } from 'react';
import { connect } from 'react-redux';

import Moment from 'moment';
import Utilities from '../services/UtilitiesService';

class MealPayment extends Component {
  state = { sortedOccurrences: [], activeOccurrence: 0, attendees: 0, date: '', totalPrice: 0, buttonText: 'REGISTER EVENT', registerCounter: 0, paymentClass: 'hide' };

  componentDidMount() {
    const sortedOccurrences = this.props.meal.occurrences.sort(Utilities.sortFunction);
    let date = Moment(sortedOccurrences[0].date).format('MM-DD-YY');
    let activeOccurrence = sortedOccurrences[0];

    if (!this.props.loggedInUser) {
      this.setState({
        sortedOccurrences: sortedOccurrences,
        activeOccurrence: activeOccurrence,
        date: date,
      });
    } else {
      debugger;
      let userOccurrences = this.props.meal.occurrences.reduce((result, current) => {
        let exists = current.attendees.filter(attendee => attendee._id === this.props.loggedInUser._id);
        if (exists) result.push(exists);
      }, []);

      let attendees = 0,
        totalPrice = 0;

      if (userOccurrences && userOccurrences.length > 0) {
        activeOccurrence = userOccurrences.sort(Utilities.sortFunction);
        date = Moment(activeOccurrence[0].date).format('MM-DD-YY');
        attendees = activeOccurrence[0].attendees[0].numOfAttendees;
        totalPrice = attendees * this.props.meal.price;
      } else userOccurrences = [];

      this.setState({
        sortedOccurrences: sortedOccurrences,
        activeOccurrence: activeOccurrence,
        attendees: attendees,
        totalPrice: totalPrice,
        date: date,
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
      let activeOccurrence = this.state.sortedOccurrences.find(current => {
        return Moment(current.date).format('MM-DD-YY') === Moment(value).format('MM-DD-YY');
      });

      this.setState({ date: value, activeOccurrence: activeOccurrence });
    }
  };

  onEventRegistration = ev => {
    ev.preventDefault();
    debugger;
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
      <div className='card-border payment-container'>
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
            <span className='validity'></span>
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MealPayment);
