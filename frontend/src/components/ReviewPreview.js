import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';

export class ReviewPreview extends Component {
  render() {
    const review = this.props.review
    console.log("ReviewPreview --> render review ", review);

    return <div className ="review-container">
      <li><img className="user-Img" src={review.byUser.imgUrl}></img>{review.byUser.fullName} 
  <span>date: <Moment date ={review.at}>
                
            </Moment></span></li>
     
      <li >{review.txt}</li>
    </div>;
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewPreview);
