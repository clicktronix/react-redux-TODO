import * as NS from '../../namespace';
import { IAppReduxState } from 'shared/types/app';
import { initial } from '../initial';

const dataReducer =
  (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK_MANAGER:LOAD_TASK_LIST_SUCCESS':
      return {
        ...state,
        taskLists: action.payload,
      };
    default:
      return state;
  }
};

export default dataReducer;
