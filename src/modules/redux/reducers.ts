import initialState from './initial';
import { IReduxState, IAction } from 'shared/types/app';

const rootReducer = (state: IReduxState = initialState, action: IAction) => {
  console.log(action.type, action);
  switch (action.type) {
    case 'SESSION_ATHORIZE_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
      };
    case 'SESSION_ATHORIZE_FAIL':
      return {
        ...state,
        isLoggedIn: false,
      };
    case 'TASK_LIST_LOAD_SUCCESS':
      return {
        ...state,
        tasksLists: action.payload,
      };
    case 'TASK_LIST_CREATE_SUCCESS':
      return {
        ...state,
        tasksLists: [
          ...state.tasksLists,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
