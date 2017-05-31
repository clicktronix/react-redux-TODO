import sessionReducer from './sessionReducer';
import taskReducer from './taskReducer';
import taskListReducer from './taskListReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  auth: sessionReducer,
  taskLists: taskListReducer,
  tasks: taskReducer,
});
