import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getById, add } from '../actions/MealActions';
import ImageGallery from '../components/ImageGallery';
import MealPageNav from '../components/MealPageNav';
import MealPayment from '../components/MealPayment';
import ShowHideText from '../components/ShowHideText';
import MealMenu from '../components/MealMenu';
import AttendeesList from '../components/AttendeesList';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import MealMap from '../components/MealMap';

class MealDetails extends Component {
  state = { displayReviewForm: 'hide' };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getById(id);
  }

  onRegister = registration => {
    console.log(registration);
    //TODO: Came from the 'payment' section
    //      save registartion for logged-in user/guest
    //      need to add to DB -> the number of guests for current registered event
  };

  onSelectedMenu = selectedMenuItems => {
    console.log(selectedMenuItems);
    //TODO: Came from the 'menu' section
    //      Low priority - if we would want to have multiple menus
    //      for an event and have the user choose which course he would like
  };

  onDisplayReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: '' });
  };

  onCloseReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: 'hide' });
  };

  onSaveReviewForm = review => {
    this.setState({ displayReviewForm: 'hide' });
    console.log(review);

    //TODO: Came from the 'submit review' section
    //      save review for logged-in user/guest
  };

  render() {
    const meal = this.props.meal;
    return (
      <div className='container meal-details-page-container'>
        {meal && (
          <React.Fragment>
            <div className='page-title'>
              <h2>{meal.title}</h2>
            </div>
            <ImageGallery images={meal.imgUrls}></ImageGallery>
            <div className='meal-details-container flex'>
              <div className='left-box flex-shrink-70'>
                <MealPageNav meal={meal}></MealPageNav>
                <h3>A word about the experience</h3>
                <ShowHideText text={meal.description} showRows={3}></ShowHideText>
                <h3 id='menu'>Our menu</h3>
                <MealMenu menu={meal.menu} onSelectedMenu={this.onSelectedMenu} />
                <h3>Meet the other guests</h3>
                <AttendeesList attendees={meal.attendees}></AttendeesList>
                <div className='reviews-title-wrapper'>
                  <h3 id='reviews'>Reviews</h3>
                  <a className='btn-round' title='Review Us' href='' onClick={this.onDisplayReviewForm}>
                    <i className='icon-medium fas fa-plus'></i>
                  </a>
                </div>
                <div className={this.state.displayReviewForm}>
                  <ReviewForm onSaveReviewForm={this.onSaveReviewForm} onCloseReviewForm={this.onCloseReviewForm}></ReviewForm>
                </div>
                <ReviewList reviews={meal.reviews}></ReviewList>
                <h3 id='location'>Location</h3>
                <MealMap></MealMap>
              </div>
              <div className='right-box flex-shrink-30'>
                <MealPayment meal={meal} onRegister={this.onRegister}></MealPayment>
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({ meal: state.meal.meal });

const mapDispatchToProps = {
  getById,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
