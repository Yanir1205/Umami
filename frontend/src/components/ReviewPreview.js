import React, { Component } from 'react';
import Moment from 'moment';
import SocketService from '../services/SocketService';

class ReviewPreview extends Component {


  render() {
    const { review } = this.props;
    return (
      <div className='review-container '>
        {review && (
          <blockquote>
            <header>
              <span data-rating={review.rate || 0}>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
              </span>
              <strong>Event Name </strong>
              <span>{Moment(review.date).format('MM-DD-YY')}</span>
              <span>
                By <em>{review.user.fullName}</em>
              </span>
              <span>Verified Review</span>
            </header>
            <p>{review.txt}</p>
          </blockquote>
        )}
      </div>
    );
  }
}

export default ReviewPreview;
