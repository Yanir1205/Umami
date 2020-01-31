let initialState = {
  meals: [],
  userMeals: [],
  selectedMeal: null,
  cities: [],
  cuisines: [],
};

export default function MealReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        meals: action.meals,
      };
    case 'GET_BY_ID':
      return {
        ...state,
        selectedMeal: action.meal,
      };
    case 'ADD':
      return {
        ...state,
        meals: [...state.meals, action.meal],
        selectedMeal: action.meal,
      };
    case 'UPDATE':
      return {
        ...state,
        meals: state.meals.map(meal => (action.meal._id === meal._id ? action.meal : meal)),
        selectedMeal: action.meal,
      };
    case 'REMOVE':
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

    default:
      return state;
  }
}
