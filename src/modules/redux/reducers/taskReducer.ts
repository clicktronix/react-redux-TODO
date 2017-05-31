import { ITask } from '../namespace';
import { initialState } from '../initial';
import { IReduxState, IAction, ITaskReducer } from 'shared/types/app';

const tasksInit = {
  tasks: [],
};

const taskReducer = (state: ITaskReducer = tasksInit, action: IAction): ITaskReducer => {
  switch (action.type) {
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

export default taskReducer;
