import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import taskReducer from './edit';

const reducer = combineReducers<NS.IReduxState>({
  data: taskReducer,
  communication:  combineReducers<NS.IReduxState['communication']>({
    tasksLoading: makeCommunicationReducer<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
      'TASK_LIST:LOAD_TASKS',
      'TASK_LIST:LOAD_TASKS_SUCCESS',
      'TASK_LIST:LOAD_TASKS_FAIL',
      initial.communication.tasksLoading,
    ),
    taskCreating: makeCommunicationReducer<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
      'TASK_LIST:CREATE_TASK',
      'TASK_LIST:CREATE_TASK_SUCCESS',
      'TASK_LIST:CREATE_TASK_FAIL',
      initial.communication.taskCreating,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);

export default reducer;
