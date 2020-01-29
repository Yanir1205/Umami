const express = require('express')
// const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const { addMeal, getMeals, getById, deleteMeal, editMeal } = require('./meal.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getMeals)
router.get('/:id', getById)
router.post('/', addMeal)
router.delete('/:id', deleteMeal)
router.put('/:id', editMeal)

module.exports = router