const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  const criteria = buildCriteria(filterBy);
  const collection = await dbService.getCollection('meal');
  try {
    const meal = await collection.find(criteria).toArray();
    const resultMeals = filterResults(meal, filterBy);
    return resultMeals;
  } catch (err) {
    console.log('ERROR: cannot find Meals');
    throw err;
  }
}

async function remove(mealId) {
  const collection = await dbService.getCollection('meal');
  try {
    await collection.deleteOne({ _id: ObjectId(mealId) });
  } catch (err) {
    console.log(`ERROR: cannot remove meal ${mealId}`);
    throw err;
  }
}

async function getById(mealId) {
  const collection = await dbService.getCollection('meal');
  console.log('meal.service -> getById', mealId);
  try {
    const meal = await collection.findOne({ _id: ObjectId(mealId) });
    return meal;
  } catch (err) {
    console.log(`ERROR: cannot find meal ${mealId}`);
    throw err;
  }
}

async function edit(meal) {
  const collection = await dbService.getCollection('meal');
  try {
    var id = meal._id;
    delete meal._id;
    await collection.updateOne({ _id: ObjectId(id) }, { $set: meal });
    meal._id = id;

    return meal;
  } catch (err) {
    console.log(`ERROR: cannot update meal ${meal._id} err-> `, err);
    // throw err;
  }
}

async function add(meal) {
  // meal.byUserId = ObjectId(meal.byUserId);
  // meal.aboutUserId = ObjectId(meal.aboutUserId);

  const collection = await dbService.getCollection('meal');
  try {
    await collection.insertOne(meal);
    return meal;
  } catch (err) {
    console.log(`ERROR: cannot insert meal`);
    throw err;
  }
}

function filterMealsByUserId(userId, meals) {
  //this function gets a given userId and the meal and uses map reduce to filter the results
  let resultMeals = meals.reduce((acc, meal) => {
    return meal.hostedBy._id === userId ? meal : acc;
  }, []);
  meals.forEach(meal => {
    if (
      meal.attendees.find(user => {
        return user._id === userId;
      })
    ) {
      resultMeals.push(meal);
    }
  });
  return resultMeals;
}

function filterResults(meals, filterBy) {
  let resultMeals = [...meals];
  if (filterBy.userId) {
    resultMeals = filterMealsByUserId(filterBy.userId, meals);
  }
  return resultMeals;
}

function buildCriteria(filterBy) {
  const criteria = {};

  // filtering by type of meal (working great!):
  if (filterBy.type) {
    criteria.cuisineType = { $regex: `.*${filterBy.type}.*` };
  }

  //filtering by host or attendees userId:
  // if (filterBy.userId) {
  //     console.log('inside filter user id');
  //     // const criteria1 = {};
  //     // criteria1.hostedBy.id = filterBy.userId
  //     // const criteria2 = {};
  //     // criteria2.attendees.id = filterBy.userIdb
  //     // criteria.hostedBy
  //     // criteria.attendees
  //     // criteria.user = { $or: [{ hostedBy: filterBy.userId }, { attendees: filterBy.userId }] }

  //     /*
  //     criteria.hostedBy = {};
  //     criteria.hostedBy.id = filterBy.userId
  //     */

  //     // criteria.attendees = filterBy.userId
  //     // db.inventory.find( { $or: [ { status: "A" }, { qty: { $lt: 30 } } ] } ) //mongoDB help query

  //     criteria['$or'] = [{ "hostedBy.id": filterBy.userId }, { "attendees.id": filterBy.userId }]
  //     // criteria['$or'] = [{ "hostedBy.id": filterBy.userId }, { "attendees": { "$elemMatch": { "id": filterBy.userId } } }]
  //     console.log('after filter user id');

  // }

  //filtering by date: (working great!)
  if (filterBy.at) {
    const msPerDay = 86400 * 1000;
    let begining = filterBy.at - (filterBy.at % msPerDay);
    begining += new Date().getTimezoneOffset() * 60 * 1000;
    const ending = begining + msPerDay - 1;
    criteria.date = { $gt: begining, $lt: ending };
  }

  //filtering by location:
  if (filterBy.city) {
    criteria.location = { $in: { city: filterBy.location.city } };
  }
  if (filterBy.country) {
    if (!criteria.location) criteria.location = {};
    criteria.location.country = filterBy.country;
  }

  console.log('criteria after building: ', criteria);
  return criteria;
}

module.exports = {
  query,
  getById,
  remove,
  add,
  edit,
};
