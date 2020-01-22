import React, { Component } from 'react';
import Moment from 'moment';
import Utilities from '../services/UtilitiesService';

class MealPayment extends Component {
  state = { sortedOccurrences: [], userOccurrences: [], datePattern: '', selectedOccurance: 0, numOfAttendees: 0, date: '', totalPrice: 0, buttonText: 'REGISTER EVENT', registerCounter: 0, paymentClass: 'hide' };

  componentDidMount() {
    debugger;
    const sortedOccurrences = this.props.meal.occurrences.sort(Utilities.sortFunction);
    let userOccurrences = [],
      numOfAttendees = 0,
      totalPrice = 0,
      buttonText = 'REGISTER EVENT',
      paymentClass = 'hide',
      date = Moment(sortedOccurrences[0].date).format('MM-DD-YY'),
      datePattern = sortedOccurrences.reduce((pattern, current) => `${pattern}${Moment(current.date).format('MM-DD-YY')}`, '');

    if (this.props.loggedInUser) {
      userOccurrences = this.props.meal.occurrences.filter(occurrence => {
        return occurrence.attendees.find(attendee => attendee._id === this.props.loggedInUser._id);
      });

      //populate fields from first occurrence
      if (userOccurrences.length > 0) {
        // date = Moment(userOccurrences[0].date).format('MM-DD-YY');
        numOfAttendees = userOccurrences[0].attendees[0].numOfAttendees;
        totalPrice = numOfAttendees * this.props.meal.price;
        buttonText = 'UPDATE EVENT';
        paymentClass = 'payment';
      }
    }

    this.setState({
      sortedOccurrences: sortedOccurrences,
      userOccurrences: userOccurrences,
      counter: 0,
      numOfAttendees: numOfAttendees,
      totalPrice: totalPrice,
      datePattern: datePattern,
      date: date,
      registerCounter: 0,
      buttonText: buttonText,
      paymentClass: paymentClass,
    });
  }

  handleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;

    if (name === 'numOfAttendees' && this.state.numOfAttendees !== value) {
      let totalPrice = value * this.props.meal.price;
      this.setState({ numOfAttendees: value, totalPrice: totalPrice, registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
    } else {
      let selectedOccurance = this.state.sortedOccurrences.find(current => {
        return Moment(current.date).format('MM-DD-YY') === Moment(value).format('MM-DD-YY');
      });
      this.setState({ counter: 0, [name]: value, selectedOccurance: selectedOccurance });
    }
  };

  onOccuranceRegistration = ev => {
    debugger;
    ev.preventDefault();
    if (this.state.registerCounter === 0) {
      let calcPrice = this.state.numOfAttendees * this.props.meal.price;
      this.setState({ totalPrice: calcPrice, registerCounter: 1, buttonText: 'BOOK EVENT', paymentClass: 'payment' });
    } else if (this.state.registerCounter >= 1 && this.state.numOfAttendees !== 0) {
      this.setState({ registerCounter: 0 });
      this.props.onOccuranceRegistration({ id: this.state.selectedOccurance.id, date: new Date(this.state.date).getTime(), numOfAttendees: this.state.numOfAttendees });
    }
  };

  render() {
    const { meal } = this.props;
    return (
      <div className='card-border payment-container'>
        <div className='price'>
          <span>${meal.price}</span>
          <span>per guest</span>
        </div>
        <div>
          <hr />
        </div>
        <div className='details-container'>
          <div className='date'>
            <label htmlFor='date'>Date</label>
            <input name='date' list='occurrenceDates' onChange={this.handleChange} pattern={this.state.datePattern} title='Must be one of the offered dates' className='input-date'></input>
            <datalist id='occurrenceDates'>
              {meal.occurrences.map((occurrence, idx) => {
                return (
                  <option key={idx} className={this.state.userOccurrences.includes(occurrence.date) ? 'selected-date' : ''} value={Moment(occurrence.date).format('MM-DD-YY')}>
                    {Moment(occurrence.date).format('MM-DD-YY')}
                  </option>
                );
              })}
            </datalist>
          </div>
          <div className='guests'>
            <label htmlFor='numOfAttendees'>Number of Guests</label>
            <input type='number' placeholder='Number of guests' min='1' name='numOfAttendees' onChange={this.handleChange} value={this.state.numOfAttendees === 0 ? '' : this.state.numOfAttendees}></input>
            <span className='validity'></span>
          </div>
          <div className={this.state.paymentClass}>
            <ul className='clean-list'>
              <li>
                <span>
                  ${meal.price} x {this.state.numOfAttendees} guests
                </span>
                <span></span>
              </li>
              <li>
                <span>Total</span>
                <span>${this.state.totalPrice}</span>
              </li>
            </ul>
          </div>
          <div>
            <button onClick={this.onOccuranceRegistration} className='button btn-ghost'>
              {this.state.buttonText}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default MealPayment;
