import * as NS from '../../namespace';
import { IReduxState } from 'shared/types/app';
import { initial } from '../initial';

const dataReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK_LIST:LOAD_SUCCESS':
      return {
        ...state,
        taskLists: action.payload,
      };
    case 'CRUD_TASK:LOAD_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
