import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: loadTaskLists, completed: loadTaskListsSuccess, failed: loadTaskListsFail } =
  makeCommunicationActionCreators<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
    'TASK_LIST:LOAD', 'TASK_LIST:LOAD_SUCCESS', 'TASK_LIST:LOAD_FAIL',
  );

export const { execute: loadTasks, completed: loadTasksSuccess, failed: loadTasksFail } =
  makeCommunicationActionCreators<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
    'CRUD_TASK:LOAD', 'CRUD_TASK:LOAD_SUCCESS', 'CRUD_TASK:LOAD_FAIL',
  );
