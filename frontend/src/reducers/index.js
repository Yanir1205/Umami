import { combineReducers } from 'redux';

import FilterReducer from './FilterReducer';
import MealReducer from './MealReducer';
import UserReducer from './UserReducer';
import SystemReducer from './SystemReducer';
import SocketReducer from './SocketReducer';
import OccurranceReducer from './OccurranceReducer';

const rootReducer = combineReducers({
  system: SystemReducer,
  filter: FilterReducer,
  meal: MealReducer,
  user: UserReducer,
  socket: SocketReducer,
  occurrance: OccurranceReducer
});

export default rootReducer;
