import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap } from 'shared/helpers/redux';
import { combineReducers } from 'redux';

const taskReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK:UPDATE_STATUS_SUCCESS':
      return {
        ...state,
        ...action.payload.data,
      };
    case 'TASK:UPDATE_SUCCESS':
      return {
        ...state,
        ...action.payload.data,
      };
    default:
      return state;
  }
};

export default taskReducer;
