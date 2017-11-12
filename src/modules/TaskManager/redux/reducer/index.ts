import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import dataReducer from './data';

const reducer = combineReducers<NS.IReduxState>({
  data: dataReducer,
  communication: combineReducers<NS.IReduxState['communication']>({
    taskListsLoading: makeCommunicationReducer<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
      'TASK_MANAGER:LOAD_TASK_LIST',
      'TASK_MANAGER:LOAD_TASK_LIST_SUCCESS',
      'TASK_MANAGER:LOAD_TASK_LIST_FAIL',
      initial.communication.taskListsLoading,
    ),
    taskListUpdating: makeCommunicationReducer<NS.IUpdateTaskList, NS.IUpdateTaskListSuccess, NS.IUpdateTaskListFail>(
      'TASK_MANAGER:UPDATE_TASK_LIST',
      'TASK_MANAGER:UPDATE_TASK_LIST_SUCCESS',
      'TASK_MANAGER:UPDATE_TASK_LIST_FAIL',
      initial.communication.taskListUpdating,
    ),
    taskListDeleting: makeCommunicationReducer<NS.IDeleteTaskList, NS.IDeleteTaskListSuccess, NS.IDeleteTaskListFail>(
      'TASK_MANAGER:DELETE_TASK_LIST',
      'TASK_MANAGER:DELETE_TASK_LIST_SUCCESS',
      'TASK_MANAGER:DELETE_TASK_LIST_FAIL',
      initial.communication.taskListDeleting,
    ),
    taskListCreating: makeCommunicationReducer<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
      'TASK_MANAGER:CREATE_TASK_LIST',
      'TASK_MANAGER:CREATE_TASK_LIST_SUCCESS',
      'TASK_MANAGER:CREATE_TASK_LIST_FAIL',
      initial.communication.taskListCreating,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);

export default reducer;
