
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy = {}) {
    // const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('meal')
    console.log("meal.service ->> query -> collection", collection);
    try {
        const meal = await collection.find().toArray();
        console.log("meal.service ->> query ->", meal);
        return meal
    } catch (err) {
        console.log('ERROR: cannot find Meals')
        throw err;
    }
}

async function remove(mealId) {
    const collection = await dbService.getCollection('meal')
    try {
        await collection.deleteOne({ "_id": ObjectId(mealId) })
    } catch (err) {
        console.log(`ERROR: cannot remove meal ${mealId}`)
        throw err;
    }
}

async function getById(mealId) {
    const collection = await dbService.getCollection('meal')
    console.log('meal.service -> getById', mealId);
    try {
        const meal = await collection.findOne({ "_id": ObjectId(mealId) })
        return meal;
    } catch (err) {
        console.log(`ERROR: cannot find meal ${mealId}`)
        throw err;
    }
}

async function edit(meal) {
    // console.log('meal.service -> edit', meal);
    const collection = await dbService.getCollection('meal')
    console.log('meal.service -> collection', collection);
    try {
        var id = meal._id
        delete meal._id
        console.log('meal.service -> edit _id', meal);
        
     await collection.updateOne({ "_id": ObjectId(id) }, { $set: meal  })
        meal._id = id 
        
        return meal
    } catch (err) {
        
        console.log(`ERROR: cannot update meal ${meal._id} err-> `,err)
        // throw err;
    }
}

async function add(meal) {
    meal.byUserId = ObjectId(meal.byUserId);
    meal.aboutUserId = ObjectId(meal.aboutUserId);

    const collection = await dbService.getCollection('meal')
    try {
        await collection.insertOne(meal);
        return meal;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    return criteria;
}

module.exports = {
    query,
    getById,
    remove,
    add,
    edit
}


