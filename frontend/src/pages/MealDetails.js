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
import UserService from '../services/UserService'

class MealDetails extends Component {
  state = { displayReviewForm: 'hide' };

  componentDidMount() {
    const id = this.props.match.params.id;

    this.props.getById(id);
  }
  componentDidUpdate() {

  }
  onRegister = registration => {

    const user = JSON.parse(UserService.getUserLoggedin())
    const meal = { ...this.props.meal };
    // if(meal.currCapacity + registration.numOfGuests <= meal.capacity){
    delete user.email;
    delete user.phone;
    user.numGust = registration.numOfGuests;
    meal.attendees.push(user);
    this.props.add(meal);
    // }
  };

  onSelectedMenu = selectedMenuItems => {
  };

  onDisplayReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: '' });
  };

  onCloseReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: 'hide' });
  };

  onSaveReviewForm  = async review => {
     this.setState({ displayReviewForm: 'hide' });
    
    const user = {...JSON.parse(UserService.getUserLoggedin())}
    const meal ={...this.props.meal}
    delete user.email
    delete user.phone
    delete user.username
    review.byUser = user
    review.at = Date.now()
    meal.reviews = [...meal.reviews,review] 
    await this.props.add(meal)

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
            {this.props.meal.reviews &&    <ReviewList reviews={this.props.meal.reviews}></ReviewList>}
                <h3 id='location'>Location</h3>
                <MealMap location={meal.location}></MealMap>
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
