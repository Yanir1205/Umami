const logger = require('../../services/logger.service');
const mealsService = require('./meal.service');

// TODO: needs error handling! try, catch

async function getMeals(req, res) {
  try {
    const meals = await mealsService.query(req.query);
    // console.log("Meal.Controller -> meal filter",meals)
    res.send(meals);
  } catch (err) {
    logger.error('Cannot get meals', err);
    res.status(500).send({ error: 'cannot get meals' });
  }
}
async function getById(req, res) {
  console.log('meal.controller -> getById',req.params.id);

  const meal = await mealsService.getById(req.params.id);
  try {
    res.send(meal);
  } catch (err) {
    logger.error('Cannot get meal by id', err);
    res.status(500).send({ error: 'cannot get meal by id ' });
  }
}
async function deleteMeal(req, res) {
  try {
    await mealsService.remove(req.params.id);
    res.end();
  } catch (error) {
    logger.error('Cannot cannot delete meal', err);
    res.status(500).send({ error: 'cannot delete meal' });
  }
}

async function addMeal(req, res) {
  debugger;
  try {
    var meal = req.body;

    // review.byUserId = req.session.user._id;  FOR SESSION
    meal = await mealsService.add(meal);
    // review.byUser = req.session.user;  FOR SESSION
    // TODO - need to find aboutUser
    // review.aboutUser = {}
    res.send(meal);
  } catch (error) {
    logger.error('Cannot cannot add meal', err);

    res.status(500).send({ error: 'cannot add meal' });
  }
}

async function editMeal(req, res) {
  try {
    
    const meal = req.body;
    const updatedMeal = await mealsService.edit(meal);
    res.send(updatedMeal);
  } catch (error) {
    logger.error('Cannot cannot edit meal', error);
    res.status(500).send({ error: 'cannot edit meal' });
  }
}

module.exports = {
  getMeals,
  deleteMeal,
  addMeal,
  getById,
  editMeal,
};
