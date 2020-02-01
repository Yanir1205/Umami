import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReviewPreview from './ReviewPreview';

export class ReviewList extends Component {
  render() {
    const { reviews } = this.props;
    return (
      <div className='main-reviews-container'>
        {reviews &&
          reviews.map((review, idx) => {
            return <ReviewPreview key={idx} review={review}></ReviewPreview>;
          })}
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
