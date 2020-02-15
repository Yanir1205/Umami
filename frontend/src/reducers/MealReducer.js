let initialState = {
  meals: [],
  userMeals: [],
  selectedMeal: null,
  cities: [],
  cuisines: [],
  filteredMeal: null, //holds the meal for the registration CMP (contains only relevant occurrences)
};

export default function MealReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_MEALS':
      return {
        ...state,
        meals: action.meals,
      };
    case 'GET_MEAL_BY_ID':
      return {
        ...state,
        selectedMeal: action.meal,
      };
    case 'ADD_MEAL':
      return {
        ...state,
        meals: [...state.meals, action.meal],
        selectedMeal: action.meal,
      };
    case 'UPDATE_MEAL':
      return {
        ...state,
        meals: state.meals.map(meal => (action.meal._id === meal._id ? action.meal : meal)),
        selectedMeal: action.meal,
      };
    case 'REMOVE_MEAL':
      return { ...state, meals: state.meals.filter(meal => meal._id !== action.id) };
    case 'LOAD_CITIES':
      return { ...state, cities: [...action.citiesToReducer] };
    case 'LOAD_CUISINES':
      return { ...state, cuisines: [...action.cuisineTypesToReducer] };
    case 'LOAD_TAGS':
      return { ...state, tags: [...action.tags] };
    case 'LOAD_USER_MEAL':
      return {
        ...state,
        userMeals: action.userMeals,
      };
    case 'LOAD_MEAL_FOR_REGISTRATION':
      return {
        ...state,
        filteredMeal: action.filteredMeal,
      };
    case 'LOAD_HOME_MEALS':
      return {
        ...state,
        homeMeals: action.meals,
      };
    default:
      return state;
  }
}
