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
      const updateStatusTaskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, updateStatusTaskIndex),
          {
            ...action.payload.data,
          },
          ...state.tasks.slice(updateStatusTaskIndex + 1),
        ],
      };
    case 'TASK_UPDATE_SUCCESS':
      const updateTaskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, updateTaskIndex),
          {
            ...action.payload.data,
          },
          ...state.tasks.slice(updateTaskIndex + 1),
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
    case 'TASK_DELETE_SUCCESS':
      const deleteTaskIndex = state.tasks.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        tasks: [
          ...state.tasks.slice(0, deleteTaskIndex),
          ...state.tasks.slice(deleteTaskIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export default rootReducer;
