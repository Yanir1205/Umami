function sortByDate(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}

function getCategoriesInfo(mealsArray, type) {
  let categories = {};

  /*
  {
    'Cuisine':{
      'Italian' : {},
      'Mexican' : {}
    },
    'Location':{
      'Berlin' :{country: 'Germany'}
    }
  }
  */

  // let category = {
  //   img: img,
  //   name: name,
  //   cuisines: [],
  //   locations:[{city:'',country:''}]
  //   toggleIcon: toggleIcon,
  //   toggleTxt: toggleTxt, -> either sums - # of different cuisines or # of different cities
  //   hostedTxt: hostedTxt,
  //   nextAvailableDate: nextAvailableDate,
  //   avgPrice: avgPrice,
  //   type: type,
  // };

  //categories =
  const categoryType = type === 'Cuisine' ? { type: type, field: 'cuisineType' } : { type: type, field: 'location[city]', fieldTwo: 'location[country]' };

  categories = {};
  //const startDateRange = new Date().getTime();
  // const endDateRange = new Date().setDate(new Date().getDate() + 7);
  mealsArray.reduce(function(result, meal) {

    if (!result[meal[categoryType.field]]) {
  
      result[meal[categoryType.field]] = {
        name: meal[categoryType.field],
        cuisines: [].push({
          cuisine: meal[categoryType.field],
          location: [].push({
            city: meal.location.city,
            country: meal.location.country,
            events: meal.occurrences.length,
            // eventsThisWeek: meal.occurrences.reduce((result, event) => {
            //   if (new Date(event.date).getTime() >= startDateRange && new Date(event.date).getTime() <= endDateRange) return result++;
            // }, 0),
            nextAvailableDate: meal.occurrences.sort(sortByDate)[0],
            price: meal.price,
            priceAvg: meal.price,
          }),
        }),
        locations: [].push({
          city: meal.location.city,
          country: meal.location.country,
          cuisines: [].push({
            cuisine: meal.cuisine,
            events: meal.occurrences.length,
            eventsThisWeek: '',
            nextAvailableDate: '',
            price: meal.price,
            priceAvg: meal.price,
          }),
        }),
      };
    } else {
    }

    //if (!current['Location'].includes({ city: meal.Location.city, country: meal.location.country })) current['Location'] = { city: meal.Location.city, country: meal.location.country };
  }, categories);

  return categories;
}

export default {
  sortByDate,
  getCategoriesInfo,
};
