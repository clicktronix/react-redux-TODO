import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap } from 'shared/helpers/redux';
import { combineReducers } from 'redux';

const taskReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'CRUD_TASK:UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        ...action.payload.data, // rename action.payload.task
      };
    case 'CRUD_TASK:UPDATE_SUCCESS':
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};

export default taskReducer;
