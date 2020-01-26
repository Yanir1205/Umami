const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {

  const criteria = buildCriteria(filterBy);
  const collection = await dbService.getCollection('meal');
  try {
    if (!filterBy.group) {
      const meals = await collection.find(criteria).toArray();

      const resultMeals = filterResults(meals, filterBy);
      console.log('meal.service -> query -> resultMeals',resultMeals);
      
      return resultMeals;
    } else {
      //meaning there is a group operation needed:
      if (!filterBy.meals) {
        const badges = await collection.aggregate([{ $group: { _id: filterBy.group } }]).toArray();
        return badges;
      } else {
        const meals = await collection.aggregate([{ $group: { _id: filterBy.group, meals: { $push: filterBy.meals } } }]).toArray();
        let mealsToReturn = [];

        //returning only 1 result per location:
        meals.forEach(meal => {
          mealsToReturn.push(meal.meals[0]);
        });
        return mealsToReturn;
      }
    }
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
  try {
    const meal = await collection.findOne({ _id: ObjectId(mealId) });
    console.log('meal.service -> getById -> ',meal);
    
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
    throw err;
  }
}

async function add(meal) {
  const collection = await dbService.getCollection('meal');
  try {
    await collection.insertOne(meal);
    return meal;
  } catch (err) {
    console.log(`ERROR: cannot insert user`);
    throw err;
  }
}

function filterMealsByUserId(userId, meals) {
  try {

    // const resultMeals = null
    const resultMeals = meals.filter(meal => {// for Hosted 
      if (meal.hostedBy._id == userId) {
        meal.objForHosted = true
        console.log('currMeal for HOSTED ->', meal);
        return meal;
      }
    });
    // resultMeals.push(currMeal)
    // console.log('currMeal for filterMealsByUserId -> ', currMeal);
    meals.forEach(async meal => {
      meal.occurrences.forEach(occurrence => {
        occurrence.attendees.forEach(async attendee => {
          if (attendee._id !== undefined) {
            const id = attendee._id;
            if (id == userId) {//for attendees
              const currMeal = { ...meal }
              currMeal.objForHosted = false
              delete currMeal.occurrences
              currMeal.occurensId = occurrence.id
              currMeal.date = occurrence.date
              currMeal.userId = attendee._id
              currMeal.userName = attendee.fullName
              currMeal.total = attendee.numOfAttendees
              
              delete currMeal.capacity
              delete currMeal.tags
              delete currMeal.location
              delete currMeal.imgUrls
              delete currMeal.description
              delete currMeal.reviews
              delete currMeal.menu

              console.log('currMeal for ATENDEES ->', currMeal);
              resultMeals.push(currMeal);
            }
          }
        });
      });
    });

    // console.log('meal.service -> currMeal ', currMeal);
    return resultMeals;
  } catch (err) {
    console.log('err', err);

  }
}

async function filterResults(meals, filterBy) {
  let resultMeals = [...meals];
  if (filterBy.userId) {
    resultMeals = await filterMealsByUserId(filterBy.userId, meals);
  }
  return resultMeals;
}

function buildCriteria(filterBy) {
  const criteria = {};

  // filtering by type of meal (working great!):
  if (filterBy.type) {
    criteria.cuisineType = { $regex: `.*${filterBy.type}.*` };
  }

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
    // criteria.location = { $in: { city: filterBy.location.city } };
    // criteria.location = { { "location.city" : { $eq: filterBy.location.city} } };
    criteria.location = { "location.city": { $eq: filterBy.location.city } }

    // db.inventory.find( { "item.name": { $eq: "ab" } } )
  }
  if (filterBy.country) {
    if (!criteria.location) criteria.location = {};
    criteria.location.country = filterBy.country;
  }
  return criteria;
}

module.exports = {
  query,
  getById,
  remove,
  add,
  edit,
};
