import MealService from '../services/mealService';
import { getDisplayedMeal } from '../services/OccurranceUtils';

export default {
    changeSelectedOccurrance,
    updateMeal,
    getMeal
};

export function getMeal(id, loggedInUser) {
    //loads the meal by id from the service
    //stting the larger object 
    //storing it in the global state using the proper reducer
    return async dispatch => {
        const meal = await MealService.getById(id);
        const displayedMeal = getDisplayedMeal(meal, loggedInUser)
        dispatch({ type: 'LOAD_DISPLAYED_MEAL', displayedMeal });
    };
}

export function changeSelectedOccurrance(selectedOccurance) {
    // meal.selectedOccurance = selectedOccurrence
    return {
        type: 'SET_SELECTED_OCCURRANCE',
        selectedOccurance
    }
}

export function updateMeal(meal,loggedInUser) {
    return async dispatch => {
        const newStoreMeal = await MealService.update(meal);
        const displayedMeal = getDisplayedMeal(newStoreMeal, loggedInUser)
        dispatch({ type: 'LOAD_DISPLAYED_MEAL', displayedMeal });
    };
}