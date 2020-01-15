import { combineReducers } from 'redux';

import FilterReducer from './FilterReducer';
import MealReducer from './MealReducer';
import UserReducer from './UserReducer';
import SystemReducer from './SystemReducer';

const rootReducer = combineReducers({
  system: SystemReducer,
  filter: FilterReducer,
  meal: MealReducer,
  user: UserReducer,
});

export default rootReducer;
