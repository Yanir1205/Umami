import React, { Component } from 'react';
import { connect } from 'react-redux';

import { add } from '../actions/MealActions';
import { getMeal, changeSelectedOccurrance, updateMeal } from '../actions/OccurrenceActions'

import ImageGallery from '../components/ImageGallery';

import MealPageNav from '../components/MealPageNav';
import MealPayment from '../components/MealPayment';
import ShowHideText from '../components/ShowHideText';
import MealMenu from '../components/MealMenu';

import AttendeesList from '../components/AttendeesList';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import SocketService from '../services/SocketService';
import MealMap from '../components/MealMap';

class MealDetails extends Component {
  state = { displayReviewForm: 'hide', occurrenceAttendees: {} };


  async componentDidMount() {
    window.scrollTo(0,10)
    const id = this.props.match.params.id;
    await this.props.getMeal(id, this.props.loggedInUser)
    const hostedId = this.props.displayedMeal.storeMeal.hostedBy._id;

    this.signToSocketEvent(hostedId);

    SocketService.emit('newChannel', `onEventRegistration${hostedId}`);
    SocketService.on('addMsg', this.addMsg);
  }

  signToSocketEvent = hostedId => {
    SocketService.setup();
    SocketService.emit('newChannel', `onEventRegistration${hostedId}`);
    SocketService.on('addMsg', this.addMsg);
  };

  componentWillUnmount() {
    if (!this.props.loggedInUser) {
      this.unSignToSocketEvent()
    }
  }

  // componentWillUnmount() {
  //   SocketService.off('addMsg', this.addMsg);
  //   SocketService.terminate();
  // } //

  unSignToSocketEvent = () => {

    SocketService.off('addMsg', this.addMsg);
    SocketService.terminate();
  }

  onEventRegistration = async registration => {
    if (this.props.loggedInUser) {
      const { loggedInUser } = this.props;
      let meal = { ...this.props.displayedMeal.storeMeal };
      console.log('after spread', meal);

      let selectedOccurance = meal.occurrences.find(current => current.id === registration.id);
      if (!selectedOccurance) {
        console.log("onEventRegistration: couldn't find selected occurrence", registration);
        return;
      }

      let userReservation = selectedOccurance.attendees.find(attendee => attendee._id === loggedInUser._id);

      if (userReservation) {
        userReservation.numOfAttendees = parseInt(userReservation.numOfAttendees) + parseInt(registration.numOfAttendees);
      } else {
        selectedOccurance.attendees = [...selectedOccurance.attendees, { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl, numOfAttendees: registration.numOfAttendees }];
      }
      selectedOccurance.total = parseInt(selectedOccurance.total) + parseInt(registration.numOfAttendees);
      await this.props.updateMeal(meal, this.props.loggedInUser);

      loggedInUser.titleHost = meal.title;
      SocketService.emit('newMsg', { meal, loggedInUser });
    }
  };

  addMsg = newMsg => { };

  onToggleReviewForm = ev => {
    ev.preventDefault();
    // if (this.props.loggedInUser)
    this.setState({ displayReviewForm: this.state.displayReviewForm === 'hide' ? '' : 'hide' });
  };

  onSaveReviewForm = async review => {
    if (this.props.loggedInUser) {
      const { loggedInUser } = this.props;
      let meal = { ...this.props.displayedMeal.storeMeal };
      const newReview = {
        byUser: { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl },
        txt: review.txt,
        rate: review.rate,
        at: Date.now(),
      };

      if (meal.reviews.length > 0) {
        meal.reviews = [...meal.reviews, newReview];
      } else {
        meal.reviews = [newReview];
      }

      await this.props.updateMeal(meal, this.props.loggedInUser);
    }
    this.setState({ displayReviewForm: 'hide' });
  };

  onChangeDate = (occurrence) => {
    this.props.changeSelectedOccurrance(occurrence)
  }

  render() {
    if (!this.props.displayedMeal) return <div className='border-loading-indicator col-2 row-1'></div>;
    else {
      const meal = this.props.displayedMeal;
      return (
        <div className='meal-details-page-container'>
          {meal && (
            <>
              {meal.images && meal.images.length > 0 && <ImageGallery images={meal.images}></ImageGallery>}
              <div className='container page-title'>
                <h2>{meal.title}</h2>
              </div>
              <div className='container meal-details-container flex'>
                <div className='left-box'>
                  <MealPageNav eventSetup={meal.eventSetup} hostRating={meal.hostRating}></MealPageNav>
                  <ShowHideText text={meal.description} showRows={3}></ShowHideText>
                  <MealMenu menu={meal.eventMenu} />
                  <h3>{meal.eventAttendees && meal.eventAttendees.length > 0 ? meal.messages.hasAttendees : ''}</h3>
                  {meal.eventAttendees && meal.eventAttendees.length > 0 && <AttendeesList attendees={meal.eventAttendees} currOccurrance={meal.selectedOccurance}></AttendeesList>}
                  {/* <div className='right-box '>
                  <MealPayment meal={meal} onEventRegistration={this.onEventRegistration} onChangeDate={this.onChangeDate}></MealPayment>
                </div> */}
                  <div className='reviews-title-wrapper'>
                    <h3 id='reviews'>Reviews</h3>
                    <label title='Add a Review' onClick={this.onToggleReviewForm}>
                      <i className='icon-large far fa-plus-square'></i>
                    </label>
                  </div>

                  <div className={this.state.displayReviewForm}>
                    <ReviewForm onSaveReviewForm={this.onSaveReviewForm}></ReviewForm>
                  </div>
                  {meal.hostReviews && <ReviewList reviews={meal.hostReviews}></ReviewList>}
                  <div className='container google-map-container'>
                    <h3 id='location'>Location</h3>
                    <MealMap location={meal.location}></MealMap>
                  </div>
                </div>
                <div className='right-box '>
                  <MealPayment meal={meal} onEventRegistration={this.onEventRegistration} onChangeDate={this.onChangeDate}></MealPayment>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  displayedMeal: state.occurrance.displayedMeal
});

const mapDispatchToProps = {
  getMeal,
  add,
  updateMeal,
  changeSelectedOccurrance
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
