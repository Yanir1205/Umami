import UtilitiesService from './UtilitiesService';


export const getDisplayedMeal = (selectedMeal, loggedInUser) => {
  let detailsMeal = {},
    availableOccurrences = [];

  if (!selectedMeal) return null;

  let meal = { ...selectedMeal };
  availableOccurrences = meal.occurrences && meal.occurrences.length > 0 ? UtilitiesService.getItemsInRange(meal.occurrences, new Date()) : [];
  if (!availableOccurrences || meal.occurrences.length < 1) return { errorMsg: 'There are no available events' };

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
}

function setOccurrences(occurrences, price, capacity, userId) {
  if (!occurrences) return null
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