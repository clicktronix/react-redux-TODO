import { ITask, Action } from '../../namespace';
import { tasksInitialState } from '../initial';
import { IReduxState, ITaskState } from 'shared/types/app';

const taskReducer = (state: ITaskState = tasksInitialState, action: Action): ITaskState => {
  switch (action.type) {
    case 'CRUD_TASK:UPDATE_STATUS_SUCCESS':
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
    case 'CRUD_TASK:UPDATE_SUCCESS':
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
    case 'CRUD_TASK:CREATE_SUCCESS':
      return {
        ...state,
        tasks: [
          ...state.tasks,
          action.payload,
        ],
      };
    case 'CRUD_TASK:DELETE_SUCCESS':
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

export default taskReducer;
