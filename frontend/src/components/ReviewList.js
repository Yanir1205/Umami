import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ReviewPreview } from './ReviewPreview';


export class ReviewList extends Component {
  render() {
    const reviews = this.props.reviews
    return <div><ul>
        {reviews && reviews.map((review) => {
          return <ReviewPreview review ={review}></ReviewPreview> 
        })}</ul>
    </div>
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
