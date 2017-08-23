import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import editReducer from './edit';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  taskListCreating: makeCommunicationReducer<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
    'TASK_LIST:CREATE',
    'TASK_LIST:CREATE_SUCCESS',
    'TASK_LIST:CREATE_FAIL',
    initial.communication.taskListCreating,
  ),
} as ReducersMap<NS.IReduxState['communication']>);

export default multiReducer(combineReducers<NS.IReduxState>({
  data: editReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>));
