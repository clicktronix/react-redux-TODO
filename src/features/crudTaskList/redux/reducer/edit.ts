import * as NS from '../../namespace';
import { IReduxState } from 'shared/types/app';
import { initial } from '../initial';

const editReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK_LIST:UPDATE_SUCCESS':
      return {
        ...state,
        ...action.payload.data, // rename action.payload.taskList
      };
    default:
      return state;
  }
};

export default editReducer;
