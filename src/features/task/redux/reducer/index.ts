import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import taskReducer from './edit';

// tslint:disable:max-line-length
const reducer = combineReducers<NS.IReduxState>({
  data: taskReducer,
  communication: combineReducers<NS.IReduxState['communication']>({
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
    taskDeleting: makeCommunicationReducer<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
      'CRUD_TASK:DELETE',
      'CRUD_TASK:DELETE_SUCCESS',
      'CRUD_TASK:DELETE_FAIL',
      initial.communication.taskDeleting,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);
// tslint:enable:max-line-length

export default reducer;
