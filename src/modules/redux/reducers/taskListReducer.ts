import initialState from '../initial';
import { IReduxState, IAction } from 'shared/types/app';

const taskListReducer = (state: IReduxState = initialState, action: IAction) => {
  switch (action.type) {
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
    case 'TASK_LIST_UPDATE_SUCCESS':
      const updateTaskListIndex = state.taskLists.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        taskLists: [
          ...state.taskLists.slice(0, updateTaskListIndex),
          {
            ...action.payload.data,
          },
          ...state.taskLists.slice(updateTaskListIndex + 1),
        ],
      };
    case 'TASK_LIST_DELETE_SUCCESS':
      const deleteTaskListIndex = state.taskLists.findIndex((item) => item.id === action.payload.id);
      return {
        ...state,
        taskLists: [
          ...state.taskLists.slice(0, deleteTaskListIndex),
          ...state.taskLists.slice(deleteTaskListIndex + 1),
        ],
      };
    default:
      return state;
  }
};

export {taskListReducer};
