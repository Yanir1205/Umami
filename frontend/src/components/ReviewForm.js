import React, { Component } from 'react';

class ReviewForm extends Component {
  state = {
    email: '',
    txt: '',
    rate: 0,
    starClass: 'icon-medium color-gray fas fa-star',
    starSelected: 'icon-medium color-yellow fas fa-star',
  };

  onSaveReviewForm = ev => {
    ev.preventDefault();
    this.props.onSaveReviewForm({ email: this.state.email, review: this.state.txt, rate: this.state.rate });
  };

  onToggleStar = ev => {
    ev.preventDefault();
    let id = ev.target.id;
    this.setState({ rate: id });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className='card-container-lg card-container-horizontal flex align-center justify-center'>
        <div className='card-background-lg main-review-form-container flex column align-end'>
          <i className='icon-medium color-gray fas fa-times' title='Close' onClick={this.props.onCloseReviewForm}></i>
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
              <textarea className='' id='review' name='review' onChange={this.onHandleChange} placeholder='Tell us what you think'></textarea>
            </div>
            <div className='save'>
              <button className='button btn-ghost'>SAVE</button>
            </div>
          </form>
          <h4 className='review-h5'>Thanks for your feedback</h4>
        </div>
      </div>
    );
  }
}

export default ReviewForm;
