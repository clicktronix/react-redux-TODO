import {sessionReducer} from './sessionReducer';
import {taskReducer} from './taskReducer';
import {taskListReducer} from './taskListReducer';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  sessionReducer,
  taskListReducer,
  taskReducer,
});
