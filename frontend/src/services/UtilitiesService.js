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

function findAllByKey(obj, keyToFind) {
  return Object.entries(obj).reduce((acc, [key, value]) => (key === keyToFind ? acc.concat(value) : typeof value === 'object' ? acc.concat(findAllByKey(value, keyToFind)) : acc), []);
}

function shuffleArray(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

function distinctArray(items, property) {
  const result = [];
  const map = new Map();
  for (const item of items) {
    if (!map.has(item[property])) {
      map.set(item[property], true);
      result.push({ ...item });
    }
  }
  return result;
}

function getRandomMeals(meals, displayCounter = 4) {
  let result = [...meals];
  if (result.length > 0) {
    result = shuffleArray(result);
    let length = result.length >= displayCounter ? displayCounter : result.length;
    return result.slice(0, length);
  }
  return [];
}

function _getImageByCategoryType(categoryType, categoryInstance) {
  let imgUrl = '';

  const mapCuisinesImages = {
    default: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/default-c.jpg',
    american: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/tex-mex.jpg',
    asian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/asian.jpg',
    spanish: 'https://res.cloudinary.com/contentexs/image/upload/v1580324681/barcelona.jpg',
    italian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/italian.jpg',
    greek: 'https://res.cloudinary.com/contentexs/image/upload/v1580326079/greek.jpg',
    moroccan: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/moroccan.jpg',
    indian: 'https://res.cloudinary.com/contentexs/image/upload/v1580322135/indian.jpg',
    jewish: 'https://res.cloudinary.com/contentexs/image/upload/v1580895267/jewish.jpg',
    israeli: 'https://res.cloudinary.com/contentexs/image/upload/v1580895267/jewish.jpg',
    latin: 'https://res.cloudinary.com/contentexs/image/upload/v1580895267/latin.jpg',
    caribbean: 'https://res.cloudinary.com/contentexs/image/upload/v1580897677/caribbean.jpg',
    british: 'https://res.cloudinary.com/contentexs/image/upload/v1580897912/british.jpg',
    mediterranian: 'https://res.cloudinary.com/contentexs/image/upload/v1580898100/mediterranian.jpg',
    filipino: 'https://res.cloudinary.com/contentexs/image/upload/v1580899463/filipino.jpg',
    balkan: 'https://res.cloudinary.com/contentexs/image/upload/v1580899630/balkan.jpg',
    egyptian: 'https://res.cloudinary.com/contentexs/image/upload/v1580900518/egyptian.jpg',
  };

  const mapCitiesImages = {
    default: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/default.jpg',
    dallas: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/dallas.jpg',
    barcelona: 'https://res.cloudinary.com/contentexs/image/upload/v1580894334/bkg-barcelona.jpg',
    duino: 'https://res.cloudinary.com/contentexs/image/upload/v1580322154/duino.jpg',
    athens: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/athens.jpg',
    marrakech: 'https://res.cloudinary.com/contentexs/image/upload/v1580322154/marrakech.jpg',
    delhi: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/delhi.jpg',
    bangkok: 'https://res.cloudinary.com/contentexs/image/upload/v1580322153/bangkok.jpg',
    'new-york': 'https://res.cloudinary.com/contentexs/image/upload/v1580894333/newyork.jpg',
    'tel-aviv': 'https://res.cloudinary.com/contentexs/image/upload/v1580894334/telaviv.jpg',
    london: 'https://res.cloudinary.com/contentexs/image/upload/v1580897254/london.jpg',
    sofia: 'https://res.cloudinary.com/contentexs/image/upload/v1580897254/sofia.jpg',
    cairo: 'https://res.cloudinary.com/contentexs/image/upload/v1580900443/cairo.jpg',
  };

  if (categoryType.type === 'Cuisine') {
    imgUrl = mapCuisinesImages[categoryInstance.toLowerCase()] ? mapCuisinesImages[categoryInstance.toLowerCase()] : mapCuisinesImages['default'];
  }

  if (categoryType.type === 'Location') {
    imgUrl = mapCitiesImages[categoryInstance.toLowerCase()] ? mapCitiesImages[categoryInstance.toLowerCase()] : mapCitiesImages['default'];
  }
  return imgUrl;
}

function getRandomCategories(meals, category, displayCounter = 4) {
  let result = [...meals];
  let categories = [];
  const categoryType = category === 'Cuisine' ? { type: category, property: 'cuisineType' } : { type: category, property: 'location.city' };

  result.forEach(current => {
    const categoryInstance = categoryType.property.split('.').reduce((result, value) => {
      return result ? result[value] : undefined;
    }, current);
    categories = [...categories, { name: categoryInstance, imgUrl: _getImageByCategoryType(categoryType, categoryInstance) }];
  });

  categories = distinctArray(categories, 'name');
  categories = shuffleArray(categories);

  let length = categories.length >= displayCounter ? displayCounter : categories.length;
  return categories.slice(0, length);
}

export default {
  getItemsInRange,
  findAllByKey,
  getRandomCategories,
  getRandomMeals,
};
