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
      'TASK:UPDATE',
      'TASK:UPDATE_SUCCESS',
      'TASK:UPDATE_FAIL',
      initial.communication.taskUpdating,
    ),
    taskStatusUpdating: makeCommunicationReducer<NS.IUpdateTaskStatus, NS.IUpdateTaskStatusSuccess, NS.IUpdateTaskStatusFail>(
      'TASK:UPDATE_STATUS',
      'TASK:UPDATE_STATUS_SUCCESS',
      'TASK:UPDATE_STATUS_FAIL',
      initial.communication.taskStatusUpdating,
    ),
    taskDeleting: makeCommunicationReducer<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
      'TASK:DELETE',
      'TASK:DELETE_SUCCESS',
      'TASK:DELETE_FAIL',
      initial.communication.taskDeleting,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);
// tslint:enable:max-line-length

export default reducer;
