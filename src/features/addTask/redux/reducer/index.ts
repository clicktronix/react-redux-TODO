import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import taskReducer from './edit';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  taskCreating: makeCommunicationReducer<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
    'CRUD_TASK:CREATE',
    'CRUD_TASK:CREATE_SUCCESS',
    'CRUD_TASK:CREATE_FAIL',
    initial.communication.taskCreating,
  ),
} as ReducersMap<NS.IReduxState['communication']>);

export default multiReducer(combineReducers<NS.IReduxState>({
  data: taskReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>));
