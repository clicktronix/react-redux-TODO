import * as NS from '../../namespace';
import { IReduxState, ITaskListState } from 'shared/types/app';
import { initial } from '../initial';

const taskListReducer = (state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] => {
  switch (action.type) {
    case 'TASK_LIST:LOAD_SUCCESS':
      return {
        ...state,
        taskLists: action.payload,
      };
    case 'TASK_LIST:CREATE_SUCCESS':
      return {
        ...state,
        taskLists: [
          ...state.taskLists,
          action.payload,
        ],
      };
    case 'TASK_LIST:UPDATE_SUCCESS':
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
    case 'TASK_LIST:DELETE_SUCCESS':
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

export default taskListReducer;
