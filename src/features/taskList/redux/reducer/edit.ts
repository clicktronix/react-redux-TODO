import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap } from 'shared/helpers/redux';
import { combineReducers } from 'redux';

const taskReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK_LIST:CREATE_TASK_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default taskReducer;
