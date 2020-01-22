import React, { Component } from 'react';
import Moment from 'moment';

class MealPayment extends Component {
  state = { numOfGuests: 0,
     date: '', maxDate: '', 
     totalPrice: 0,
   buttonText: 'REGISTER',
    registerCounter: 0, 
    paymentClass: 'hide' 
  };

  componentDidMount() {
    //TODO - if logged in user & registered - fill out fields based on registered event

    let eventDate = Moment(this.props.meal.date).format('YYYY-MM-DD');
    let maxDate = Moment(this.props.meal.date)
      .add(1, 'month')
      .format('YYYY-MM-DD');

    this.setState({ date: eventDate, maxDate: maxDate });
  }

  handleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;

    if (name === 'numOfGuests' && this.state.numOfGuests !== value) {
      let calcPrice = value * this.props.meal.price;
      this.setState({ counter: 0, numOfGuests: value, totalPrice: calcPrice, registerCounter: 1, buttonText: 'BOOK MEAL', paymentClass: 'payment' });
    } else this.setState({ counter: 0, [name]: value });
  };

  onRegister = ev => {
    ev.preventDefault();
    
    let counter = this.state.registerCounter;
    if (counter === 0) {

      let calcPrice = this.state.numOfGuests * this.props.meal.price;
      this.setState({ totalPrice: calcPrice, registerCounter: 1, buttonText: 'BOOK MEAL', paymentClass: 'payment' });
    } else if (counter >= 1 && this.state.numOfGuests !== 0) {
      this.setState({ registerCounter: 0 });
      this.props.onRegister({ date: this.state.date, numOfGuests: this.state.numOfGuests });
    }
  };

  render() {
    const { meal } = this.props;
    return (
      <div className='card-border payment-container'>
        <div className='price'>
          <span>${meal.price}</span>
        </div>
        <div>
          <hr />
        </div>
        <div className='details-container'>
          <div className='date'>
            <label htmlFor='date'>Date</label>
            <input type='date' name='date' onChange={this.handleChange} value={this.state.date} min={this.state.date} max={this.state.maxDate} step='7' pattern='\dddd-\dd-\dd' className='input-date'></input>
            <span className='validity'></span>
          </div>
          <div className='guests'>
            <label htmlFor='numOfGuests' name='numOfGuests'>
              Number of Guests
            </label>
            <input type='number' placeholder='Number of guests' min='1' name='numOfGuests' onChange={this.handleChange} value={this.state.numOfGuests === 0 ? 1 : this.state.numOfGuests}></input>
            <span className='validity'></span>
          </div>
          <div className={this.state.paymentClass}>
            <ul className='clean-list'>
              <li>
                <span>
                  ${meal.price} x {this.state.numOfGuests} guests
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
            <button onClick={this.onRegister} className='button btn-ghost'>{this.state.buttonText}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MealPayment;
