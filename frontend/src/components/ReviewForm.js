import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMsg } from '../actions/SocketAction';

class ReviewForm extends Component {
  state = {
    email: '',
    txt: '',
    rate: 0,
    starClass: 'icon-medium color-gray far fa-star',
    starSelected: 'icon-medium color-yellow fas fa-star',
    msgs: '',
  };
  onSaveReviewForm = ev => {
    ev.preventDefault();
    this.props.onSaveReviewForm({ email: this.state.email, txt: this.state.txt, rate: this.state.rate });
    this.setState({ email: '', txt: '', rate: 0, starClass: 'icon-medium color-gray far fa-star' });
  };

  onToggleStar = ev => {
    ev.preventDefault();
    let id = ev.target.id;
    let newRate = id === '1' && this.state.rate === '1' ? '0' : id;
    this.setState({ rate: newRate });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='flex '>
        <div className='main-review-form-container flex column'>
          {/* <i className='icon-medium color-gray fas fa-times' title='Close' onClick={this.props.onCloseReviewForm}></i> */}
          <form className='review-form flex column align-center' onSubmit={this.onSaveReviewForm}>
            <h3>How satisfied are you?</h3>
            <div className='rating flex margin-bottom-20'>
              {Array.from(Array(5), (_, idx) => {
                return <i key={idx} id={idx + 1} className={idx < this.state.rate ? this.state.starSelected : this.state.starClass} name={idx + 1} onClick={this.onToggleStar}></i>;
              })}
            </div>
            <h3>We would love to hear what you think</h3>
            <div className='email'>
              <input type='email' placeholder='Email' name='email' onChange={this.onHandleChange} required></input>
            </div>
            <div className='review'>
              <textarea className='' id='review' name='txt' onChange={this.onHandleChange} min='5' placeholder='Tell us what you think'></textarea>
            </div>
            <div className='save flex justify-end'>
              <button className='button btn-yellow'>SAVE</button>
            </div>
          </form>
          <h4 className='review-h5'>Thank you for taking the time & reviewing us.</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  msg: state.socket.msg,
});

const mapDispatchToProps = {
  addMsg,
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);
