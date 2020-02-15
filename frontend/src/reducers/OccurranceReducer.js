let initialState = {
  displayedMeal: null
}

export default function OccurrenceReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD_DISPLAYED_MEAL':
      return {
        displayedMeal: {...action.displayedMeal},
      };
    case 'SET_SELECTED_OCCURRANCE':
      return {
        displayedMeal: { ...state.displayedMeal, selectedOccurance: action.selectedOccurance }
      };
    default:
      return state;
  }
}
