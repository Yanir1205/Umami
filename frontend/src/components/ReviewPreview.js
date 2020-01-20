import React, { Component } from 'react';
import Moment from 'moment';

class ReviewPreview extends Component {
  render() {
    const review = this.props.review;

    return (
      <div className='review-container '>
        {review && (
          <blockquote>
            <header>
              <span data-rating={review.rate}>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
                <i className='icon-small fas fa-star'></i>
              </span>
              <strong>Event Name </strong>
              <span>{Moment.unix(review.at).format('LL')}</span>
              <span>
                By <em>{review.byUser.fullName}</em>
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
