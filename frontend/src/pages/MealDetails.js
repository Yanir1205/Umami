import React, { Component } from 'react';
import { connect } from 'react-redux';

import Notification from '../components/Notification';
import { getById, add } from '../actions/MealActions';
import { getMealDetails } from '../reducers/MealSelector';

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
  state = { pageOverlayClass: 'hide', displayReviewForm: 'hide', occurrenceAttendees: {} };

  async componentDidMount() {
    const id = this.props.match.params.id;
    await this.props.getById(id);
    console.log('MealDetails -> componentDidMount',this.props.meal);
    const hostedId = this.props.meal.storeMeal.hostedBy._id
    
    this.signToSocketEvent(hostedId) 
    // console.log("hostedId->",hostedId);
    
    // SocketService.emit('newChannel',`onEventRegistration${hostedId}`);
    // SocketService.on('addMsg', this.addMsg);
  }

  signToSocketEvent = (hostedId) => {
    
    SocketService.setup();
    console.log('hostedId', hostedId);
    SocketService.emit('newChannel', `onEventRegistration${hostedId}`);
    SocketService.on('addMsg', this.addMsg);
  }

// componentWillUnmount(){
//   // debugger
//   // if(!this.props.loggedInUser){
//     this.unSignToSocketEvent()
//   // }
// }

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
      let meal = { ...this.props.meal.storeMeal };

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

      await this.props.add(meal);
      loggedInUser.titelHost = meal.title
      SocketService.emit('newMsg',{meal,loggedInUser})
    }
  };


  addMsg = newMsg => {
    console.log('TEST addMsg -> ',newMsg);
  };//

  onDisplayReviewForm = ev => {
    ev.preventDefault();
    if (this.props.loggedInUser) this.setState({ displayReviewForm: '', pageOverlayClass: 'page-overlay show-block' });
  };

  onCloseReviewForm = ev => {
    ev.preventDefault();
    this.setState({ displayReviewForm: 'hide', pageOverlayClass: 'hide' });
  };

  onSaveReviewForm = async review => {
    this.setState({ displayReviewForm: 'hide', pageOverlayClass: 'hide' });
    if (this.props.loggedInUser) {
      const { loggedInUser } = this.props;
      const meal = { ...this.props.meal };

      const newReview = {
        byUser: { _id: loggedInUser._id, fullName: loggedInUser.fullName, imgUrl: loggedInUser.imgUrl },
        txt: review.txt,
        rate: review.rate,
        at: Date.now(),
      };
      meal.reviews = [...meal.reviews, newReview];

      await this.props.add(meal);


    }
  };

  render() {
    if (!this.props.meal) return <div className='border-loading-indicator col-2 row-1'></div>;
    else {
      const { meal } = this.props;
      return (
        <div className='meal-details-page-container'>
          <div id='page-overlay' className={this.state.pageOverlayClass}></div>
          {meal && (
            <>
              <div className='container page-title'>
                <h2>{meal.title}</h2>
              </div>
              <ImageGallery images={meal.images}></ImageGallery>
              <div className='container meal-details-container flex'>
                <div className='left-box flex-shrink-70'>
                  <MealPageNav eventSetup={meal.eventSetup} hostRating={meal.hostRating}></MealPageNav>
                  <h3>A word about the experience</h3>
                  <ShowHideText text={meal.description} showRows={3}></ShowHideText>
                  <h3 id='menu'>Our menu</h3>
                  <MealMenu menu={meal.eventMenu} />
                  <h3>{meal.eventAttendees && meal.eventAttendees.length > 0 ? meal.messages.hasAttendees : meal.messages.noAttendees}</h3>
                  <AttendeesList attendees={meal.eventAttendees}></AttendeesList>
                  <div className='reviews-title-wrapper'>
                    <h3 id='reviews'>Reviews</h3>
                    <a title='Review Us' href='' onClick={this.onDisplayReviewForm}>
                      <i className='icon-large far fa-plus-square'></i>
                    </a>
                  </div>
                  <div className={this.state.displayReviewForm}>
                    <ReviewForm onSaveReviewForm={this.onSaveReviewForm} onCloseReviewForm={this.onCloseReviewForm}></ReviewForm>
                  </div>
                  {meal.hostReviews && <ReviewList reviews={meal.hostReviews}></ReviewList>}
                  <div  className='google-map-container'>
                  <h3 id='location'>Location</h3>
                  <MealMap   location={meal.location}></MealMap>
                  </div>
                </div>
                <div className='right-box flex-shrink-30'>
                  <MealPayment meal={meal} onEventRegistration={this.onEventRegistration}></MealPayment>
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
  meal: getMealDetails(state),

});

const mapDispatchToProps = {
  getById,
  add,
};

export default connect(mapStateToProps, mapDispatchToProps)(MealDetails);
