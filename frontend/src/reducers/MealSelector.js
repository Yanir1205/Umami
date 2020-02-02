import { createSelector } from 'reselect';

import UtilitiesService from '../services/UtilitiesService';

const loggedInUserSelector = state => state.user.loggedInUser;
const selectedMealSelector = state => state.meal.selectedMeal;

export const getMealDetails = createSelector([selectedMealSelector, loggedInUserSelector], (selectedMeal, loggedInUser) => {
  let detailsMeal = {},
    availableOccurrences = [];

  if (!selectedMeal) return null;

  let meal = { ...selectedMeal };
  availableOccurrences = meal.occurrences && meal.occurrences.length > 0 ? UtilitiesService.getItemsInRange(meal.occurrences, new Date()) : [];
  if (!availableOccurrences || availableOccurrences.length < 1) return { errorMsg: 'There are no available events' };

  detailsMeal = {
    storeMeal: meal,
    id: meal._id,
    host: {
      _id: meal.hostedBy._id,
      fullName: meal.hostedBy.fullName,
      imgUrl: meal.hostedBy.imgUrl,
    },
    messages: {
      noAvailableOccurrence: 'We are sorry, It seems we made a mistake and this event is not active. You will be redirected to our events page to continue browsing.',
      eventSoldOut: 'We are sorry, It seems we made a mistake and this event is all sold out. You will be redirected to our events page to continue browsing.',
      hasAttendees: 'Meet the other guests',
      noAttendees: 'Be the first one to join.',
      userRegistered: 'You are booked to this event',
      pleaseLogin: 'Please login before proceeding.',
    },
    registrationCart: {},
    selectedOccurance: {},
    availableDates: {},
    isPromoted: meal.isPromoted,
    eventSetup: {
      capacity: parseInt(meal.capacity),
      cuisineType: meal.cuisineType,
      mealType: meal.mealType,
      startTime: meal.mealType === 'Dinner' ? '6:00PM' : meal.mealType === 'Lunch' ? '12:00PM' : '9:00AM',
      endTime: meal.mealType === 'Dinner' ? '9:00PM' : meal.mealType === 'Lunch' ? '4:00PM' : '11:00AM',
    },
    price: parseFloat(meal.price),
    currency: meal.currency,
    title: meal.title,
    description: meal.description,
    eventMenu: meal.menu,
    location: {
      country: meal.location.country,
      city: meal.location.city,
      address: meal.location.address,
      lat: meal.location.lat,
      lng: meal.location.lng,
    },
    images: meal.imgUrls,
    hostReviews: meal.reviews.map(review => {
      return {
        user: {
          _id: review.byUser._id,
          fullName: review.byUser.fullName,
          imgUrl: review.byUser.imgUrl,
        },
        date: review.at,
        txt: review.txt,
        rate: parseInt(review.rate),
      };
    }),
    occurrences: setOccurrences(availableOccurrences, meal.price, meal.capacity, loggedInUser ? loggedInUser._id : 0),
  };
  detailsMeal.occurrences.sort(UtilitiesService.sortByDate);
  detailsMeal.selectedOccurance = setSelectedOccurance(detailsMeal.occurrences);
  detailsMeal.availableDates = setAvailableDates(detailsMeal.occurrences, detailsMeal.selectedOccurance);
  detailsMeal.eventAttendees = getEventAttendees(detailsMeal.selectedOccurance);
  detailsMeal.hostRating = setHostRating(detailsMeal.hostReviews);

  return detailsMeal;
});

function setOccurrences(occurrences, price, capacity, userId) {
  return occurrences.map(occurrence => {
    let totalReservations = 0;
    return {
      id: occurrence.id,
      date: occurrence.date,
      reservations: occurrence.attendees.map(attendee => {
        totalReservations += parseInt(attendee.numOfAttendees);
        return {
          user: {
            _id: attendee._id,
            fullName: attendee.fullName,
            imgUrl: attendee.imgUrl,
          },
          occurrenceAttendees: parseInt(attendee.numOfAttendees),
          occurrenceTotalPrice: parseInt(attendee.numOfAttendees) * parseInt(price),
          isLoggedInUser: userId === attendee._id ? true : false,
        };
      }),
      totalReservations: totalReservations,
      seatsLeft: parseInt(capacity) - totalReservations,
    };
  });
}

function setSelectedOccurance(occurrences, selectedDate = null) {
  let selectedOccurance = null;
  if (selectedDate) return occurrences.find(occurrence => new Date(occurrence.date).getTime() === new Date(selectedDate).getTime());
  else {
    selectedOccurance = occurrences.find(occurrence => {
      let isLoggedIn = UtilitiesService.findAllByKey(occurrence, 'isLoggedInUser');
      return isLoggedIn === true;
    });
    if (!selectedOccurance) {
      selectedOccurance = occurrences.find(occurrence => occurrence.seatsLeft > 0);
    }

    if (!selectedOccurance && occurrences.length > 0) selectedOccurance = occurrences[0];

    return selectedOccurance;
  }
}

function setAvailableDates(occurrences, selectedOccurance) {
  var result = [];
  return occurrences.reduce((acc, occurrence) => {
    if (!result.includes(occurrence.date)) {
      result.push(occurrence.date);
      let isSelected = selectedOccurance && occurrence.id === selectedOccurance.id;
      acc.push({ date: occurrence.date, isSelected: isSelected });
    }
    return acc;
  }, []);
}

function setHostRating(reviews) {
  let totalRated = reviews ? reviews.length : 0;
  let avgRate = 0;
  if (totalRated > 0) {
    avgRate = reviews.reduce((result, current) => result + parseInt(current.rate), 0) / totalRated;
  }
  return { totalRated: totalRated, avgRate: avgRate > 0 ? avgRate.toFixed(1) : 0 };
}

function getEventAttendees(occurrence) {
  var result = [];
  if (!occurrence) return result;
  return occurrence.reservations.reduce((acc, reservation) => {
    if (!result.includes(reservation.user._id)) {
      result.push(reservation.user._id);
      acc.push(reservation.user);
    }
    return acc;
  }, []);
}

/*







  on Load: ==> 
            for both situations: 
                get eventId
                check/validate event & occurrences: 
                  1. all occurrences are greater then today
                  2. every occurrence has at least one available slot 
                      2.1. - for logged in users - will be able to see also - occurrences that have 
                             no more available seats but has still not passed

            if user is not logged in:
                load - data -> don't allow to register to an event or write a review
                set the nearest occurrence as the one which is displayed

            if user is logged in:

                check if the user is registered to one of the occurrences

                    if not registered  ->  set the nearest occurrence as the one which is displayed
                                           enable both registration form & review form

                    if registered to event -> populate data for the nearest registered event in the registration form 
                                              display a message to the user in the registration form - 
                                              that he registered to that event on - bla bla ...

  on change date ==> re-render the data that is relvent to the specific occurrence  + validate available slots

        --- perform process from load --- get only valid occurrences  + chk if user is registered to current event --> get data from DB ??
       
        --- populate the following:  number of available slots , registration form data

  on register to an event :
        maybe - change to one phase ? or add to another prop -->
            on input change -> save to -> 'add-to-cart' list 
            on button click -> if both fields are populated -> ask user to approve 
            on button click approve --> register user
                                        clear the 'add-to-cart' list  
  
  */
