function sortByDate(a, b) {
  var dateA = new Date(a.date).getTime();
  var dateB = new Date(b.date).getTime();
  return dateA > dateB ? 1 : -1;
}

function addDaysToDate(date, days) {
  const copy = new Date(Number(date));
  copy.setDate(date.getDate() + days);
  return copy;
}

function formatDate(date) {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
}

function findAllByKey(obj, keyToFind) {
  return Object.entries(obj).reduce((acc, [key, value]) => (key === keyToFind ? acc.concat(value) : typeof value === 'object' ? acc.concat(findAllByKey(value, keyToFind)) : acc), []);
}

function getItemsInRange(items, startDate, endDate = null) {
  if (endDate === null)
    return items.filter(item => {
      return item.date > startDate;
    });
  else
    return items.filter(item => {
      return item.date > startDate && item.date <= endDate;
    });
}

function _addCategoryInstanceVariety(instance, categoryType, cuisine, city) {
  let variations = [];

  if (categoryType.type === 'Cuisine') {
    variations = instance.variations.includes(city) ? [...instance.variations, city] : instance.variations;
  }

  if (categoryType.type === 'Location') {
    variations = instance.variations.includes(cuisine) ? [...instance.variations, cuisine] : instance.variations;
  }

  return variations;
}

function _getImageByCategoryType(categoryType, categoryInstance) {
  let imgUrl = '';

  const mapCuisinesImages = {
    default: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/default-c.jpg',
    'tex-mex': 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/tex-mex.jpg',
    asian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/asian.jpg',
    spanish: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/barcelona.jpg',
    italian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/italian.jpg',
    greek: 'https://res.cloudinary.com/contentexs/image/upload/v1580326079/greek.jpg',
    moroccan: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/moroccan.jpg',
    indian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/indian.jpg',
  };

  const mapCitiesImages = {
    default: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/default.jpg',
    dallas: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/dallas.jpg',
    barcelona: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/barcelona.jpg',
    duino: 'https://res.cloudinary.com/contentexs/image/upload/v1580322154/duino.jpg',
    athens: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/athens.jpg',
    marrakech: 'https://res.cloudinary.com/contentexs/image/upload/v1580322154/marrakech.jpg',
    delhi: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/delhi.jpg',
    bangkok: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/bangkok.jpg',
  };

  if (categoryType.type === 'Cuisine') {
    imgUrl = mapCuisinesImages[categoryInstance.toLowerCase()] ? mapCuisinesImages[categoryInstance.toLowerCase()] : mapCuisinesImages['default'];
  }

  if (categoryType.type === 'Location') {
    imgUrl = mapCitiesImages[categoryInstance.toLowerCase()] ? mapCitiesImages[categoryInstance.toLowerCase()] : mapCitiesImages['default'];
  }
  return imgUrl;
}

function getNextOccurrenceDate(occurrences) {
  const today = new Date();
  return occurrences.reduce((result, value) => (result.date - today < value.date - today ? result.date : value.date), today);
}

function getAttendeesCounter(occurrences) {
  return occurrences.reduce((result, value) => (result += parseInt(value.total)), 0);
}

function getOccurrencesInRange(occurrences, startDate, endDate) {
  return occurrences.reduce((result, value) => {
    return value.date > startDate && value.date <= endDate ? (result += 1) : result;
  }, 0);
}

function getOccurrencesCounter(occurrences, minDate) {
  return occurrences.reduce((result, value) => {
    return value.date > minDate ? (result += 1) : result;
  }, 0);
}

function getCategoriesInfo(meals, category) {
  let categories = [];
  const categoryType = category === 'Cuisine' ? { type: category, property: 'cuisineType' } : { type: category, property: 'location.city' };
  const startDate = addDaysToDate(new Date(), -1);
  const endDate = addDaysToDate(startDate, 9);

  meals.forEach(current => {
    //categoryInstance -> Berlin / Italian
    const categoryInstance = categoryType.property.split('.').reduce((result, value) => {
      return result ? result[value] : undefined;
    }, current);
    if (!categoryInstance) return;

    let nextDate = getNextOccurrenceDate(current.occurrences);
    let totalAttendees = getAttendeesCounter(current.occurrences);
    if (parseInt(totalAttendees) < parseInt(current.capacity) && nextDate < new Date()) return;

    let currentWeekOccurrences = getOccurrencesInRange(current.occurrences, startDate, endDate);
    let totalOccurrences = getOccurrencesCounter(current.occurrences, new Date());
    let instance = categories.find(current => current.name === categoryInstance);

    if (instance) {
      instance.nextAvailableDate = {
        date: instance.nextAvailableDate.date > nextDate ? formatDate(nextDate) : formatDate(instance.nextAvailableDate.date),
        city: current.location.city,
        country: current.location.country,
        cuisine: current.cuisineType,
      };
      instance.variations = _addCategoryInstanceVariety(instance, categoryType, current.cuisineType, current.location.city);
      instance.totalOccurrences += parseInt(totalOccurrences);
      instance.currentWeekOccurrences += parseInt(currentWeekOccurrences);
      instance.totalEvents += 1;
      instance.totalPrice += parseFloat(current.price);
      instance.priceAvg = Math.floor(parseFloat(instance.totalPrice) / parseInt(instance.totalEvents));
    } else {
      instance = {
        name: categoryInstance,
        nextAvailableDate: { date: formatDate(nextDate), city: current.location.city, country: current.location.country, cuisine: current.cuisineType },
        variations: categoryType === 'Cuisine' ? [current.location.city] : [current.cuisineType],
        totalOccurrences: parseInt(totalOccurrences),
        currentWeekOccurrences: parseInt(currentWeekOccurrences),
        totalEvents: 1,
        totalPrice: parseFloat(current.price),
        priceAvg: Math.floor(parseFloat(current.price)),
        imgUrl: _getImageByCategoryType(categoryType, categoryInstance),
      };

      categories = [...categories, instance];
    }
  });
  return categories;
}

export default {
  sortByDate,
  getCategoriesInfo,
  getItemsInRange,
  findAllByKey,
  addDaysToDate,
  formatDate,
};
