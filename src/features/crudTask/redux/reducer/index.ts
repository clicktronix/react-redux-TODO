import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import taskReducer from './edit';

// tslint:disable:max-line-length
const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  tasksLoading: makeCommunicationReducer<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
    'CRUD_TASK:LOAD',
    'CRUD_TASK:LOAD_SUCCESS',
    'CRUD_TASK:LOAD_FAIL',
    initial.communication.tasksLoading,
  ),
  taskUpdating: makeCommunicationReducer<NS.IUpdateTask, NS.IUpdateTaskSuccess, NS.IUpdateTaskFail>(
    'CRUD_TASK:UPDATE',
    'CRUD_TASK:UPDATE_SUCCESS',
    'CRUD_TASK:UPDATE_FAIL',
    initial.communication.taskUpdating,
  ),
  taskStatusUpdating: makeCommunicationReducer<NS.IUpdateTaskStatus, NS.IUpdateTaskStatusSuccess, NS.IUpdateTaskStatusFail>(
    'CRUD_TASK:UPDATE_STATUS',
    'CRUD_TASK:UPDATE_STATUS_SUCCESS',
    'CRUD_TASK:UPDATE_STATUS_FAIL',
    initial.communication.taskStatusUpdating,
  ),
  taskCreating: makeCommunicationReducer<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
    'CRUD_TASK:CREATE',
    'CRUD_TASK:CREATE_SUCCESS',
    'CRUD_TASK:CREATE_FAIL',
    initial.communication.taskCreating,
  ),
  taskDeleting: makeCommunicationReducer<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
    'CRUD_TASK:DELETE',
    'CRUD_TASK:DELETE_SUCCESS',
    'CRUD_TASK:DELETE_FAIL',
    initial.communication.taskDeleting,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
// tslint:enable:max-line-length

export default multiReducer(combineReducers<NS.IReduxState>({
  data: taskReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>));
