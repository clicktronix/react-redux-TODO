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
        taskLists: action.payload,
      };
    case 'TASK_LIST_CREATE_SUCCESS':
      return {
        ...state,
        taskLists: [
          ...state.taskLists,
          action.payload,
        ],
      };
    case 'TASKS_LOAD_SUCCESS':
      return {
        ...state,
        tasks: action.payload,
      };
    case 'TASK_UPDATE_STATUS_SUCCESS':
      const updateIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, updateIndex),
          {
            ...action.payload.data,
          },
          ...state.tasks.slice(updateIndex + 1),
        ],
      };
    case 'TASK_CREATE_SUCCESS':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload,
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
