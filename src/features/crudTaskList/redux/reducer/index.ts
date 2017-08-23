import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import editReducer from './edit';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  taskListUpdating: makeCommunicationReducer<NS.IUpdateTaskList, NS.IUpdateTaskListSuccess, NS.IUpdateTaskListFail>(
    'TASK_LIST:UPDATE',
    'TASK_LIST:UPDATE_SUCCESS',
    'TASK_LIST:UPDATE_FAIL',
    initial.communication.taskListUpdating,
  ),
  taskListDeleting: makeCommunicationReducer<NS.IDeleteTaskList, NS.IDeleteTaskListSuccess, NS.IDeleteTaskListFail>(
    'TASK_LIST:DELETE',
    'TASK_LIST:DELETE_SUCCESS',
    'TASK_LIST:DELETE_FAIL',
    initial.communication.taskListDeleting,
  ),
} as ReducersMap<NS.IReduxState['communication']>);

export default multiReducer(combineReducers<NS.IReduxState>({
  data: editReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>));
