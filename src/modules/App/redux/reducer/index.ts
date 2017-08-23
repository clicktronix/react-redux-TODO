import { combineReducers } from 'redux';
import * as NS from '../../namespace';
import { initial } from '../initial';
import { ReducersMap, makeCommunicationReducer } from 'shared/helpers/redux';
import { multiReducer } from 'shared/helpers/redux/multiConnect';
import dataReducer from './data';

const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  taskListsLoading: makeCommunicationReducer<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
    'TASK_LIST:LOAD',
    'TASK_LIST:LOAD_SUCCESS',
    'TASK_LIST:LOAD_FAIL',
    initial.communication.taskListsLoading,
  ),
  tasksLoading: makeCommunicationReducer<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
    'CRUD_TASK:LOAD',
    'CRUD_TASK:LOAD_SUCCESS',
    'CRUD_TASK:LOAD_FAIL',
    initial.communication.tasksLoading,
  ),
} as ReducersMap<NS.IReduxState['communication']>);

export default multiReducer(combineReducers<NS.IReduxState>({
  data: dataReducer,
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>));
