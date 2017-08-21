import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import taskListReducer from './edit';

const reducer = combineReducers<NS.IReduxState>({
  data: taskListReducer,
  communication: combineReducers<NS.IReduxState['communication']>({
    taskListsLoading: makeCommunicationReducer<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
      'TASK_LIST:LOAD',
      'TASK_LIST:LOAD_SUCCESS',
      'TASK_LIST:LOAD_FAIL',
      initial.communication.taskListsLoading,
    ),
    taskListUpdating: makeCommunicationReducer<NS.IUpdateTaskList, NS.IUpdateTaskListSuccess, NS.IUpdateTaskListFail>(
      'TASK_LIST:UPDATE',
      'TASK_LIST:UPDATE_SUCCESS',
      'TASK_LIST:UPDATE_FAIL',
      initial.communication.taskListUpdating,
    ),
    taskListCreating: makeCommunicationReducer<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
      'TASK_LIST:CREATE',
      'TASK_LIST:CREATE_SUCCESS',
      'TASK_LIST:CREATE_FAIL',
      initial.communication.taskListCreating,
    ),
    taskListDeleting: makeCommunicationReducer<NS.IDeleteTaskList, NS.IDeleteTaskListSuccess, NS.IDeleteTaskListFail>(
      'TASK_LIST:DELETE',
      'TASK_LIST:DELETE_SUCCESS',
      'TASK_LIST:DELETE_FAIL',
      initial.communication.taskListDeleting,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
} as ReducersMap<NS.IReduxState>);

export default reducer;
