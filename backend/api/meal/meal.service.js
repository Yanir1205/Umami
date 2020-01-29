const dbService = require('../../services/db.service');
const ObjectId = require('mongodb').ObjectId;

async function query(filterBy = {}) {
  const criteria = buildCriteria(filterBy);
  const collection = await dbService.getCollection('meal');
  try {
    if (!filterBy.group && !filterBy.distinct) {
      const meals = await collection.find(criteria).toArray();
      
      const resultMeals = filterResults(meals, filterBy);

      return resultMeals;
    } else if (!filterBy.distinct) {
      if (!filterBy.meals) {
        const badges = await collection.aggregate([{ $group: { _id: filterBy.group } }]).toArray();
        return badges;
      } else {
        const meals = await collection.aggregate([{ $group: { _id: filterBy.group, meals: { $push: filterBy.meals } } }]).toArray();
        let mealsToReturn = [];

        meals.forEach(meal => {
          mealsToReturn.push(meal.meals[0]);
        });
        return mealsToReturn;
      }
    } else {
      const tags = await collection.distinct(filterBy.distinct);
      return tags;
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
    const resultMeals = meals.filter(meal => {
      // for Hosted
      if (meal.hostedBy._id == userId) {
        meal.objForHosted = true;
        return meal;
      }
    });


    meals.forEach( meal => {
      meal.occurrences.forEach(occurrence => {
        occurrence.attendees.forEach( attendee => {
          // if (attendee._id !== undefined) {
            // const id = attendee._id;
            if (attendee._id == userId) {
              //for attendees             
              const currMeal = { ...meal };
              currMeal.objForHosted = false;
              delete currMeal.occurrences;
              currMeal.occurensId = occurrence.id;
              currMeal.date = occurrence.date;
              currMeal.userId = attendee._id;
              currMeal.userName = attendee.fullName;
              currMeal.total = attendee.numOfAttendees;
              delete currMeal.capacity;
              delete currMeal.tags;
              delete currMeal.imgUrls;
              delete currMeal.description;
              delete currMeal.reviews;
              delete currMeal.menu;
              resultMeals.push(currMeal);
            }
          // }
        });
      });
    });
    
    return resultMeals;
  } catch (err) {
    console.log('err', err);
  }
}

async function filterResults(meals, filterBy) {
  let resultMeals = [...meals];
  if (filterBy.userId) {
    // console.log('query -> resultMeals ->',resultMeals);

    resultMeals = await filterMealsByUserId(filterBy.userId, resultMeals);
  }
  return resultMeals;
}

function buildCriteria(filterBy) {
  if (filterBy.city) console.log('inside build criteria! filter:');
  const criteria = {};

  if (filterBy.type) {
    criteria.cuisineType = { $regex: `.*${filterBy.type}.*`, $options: 'i' };
  }

  if (filterBy.at) {
    const msPerDay = 86400 * 1000;
    let begining = filterBy.at - (filterBy.at % msPerDay);
    begining += new Date().getTimezoneOffset() * 60 * 1000;
    const ending = begining + msPerDay - 1;
    criteria.date = { $gt: begining, $lt: ending };
  }

  if (filterBy.city) {
    criteria['location.city'] = { $eq: filterBy.city };
  }
  if (filterBy.country) {
    criteria['location.country'] = { $eq: filterBy.country };
  }
  if (filterBy.tags) {
    criteria['tags'] = { $regex: `.*${filterBy.tags}.*`, $options: 'i' };
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
