import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: loadTaskList, completed: loadTaskListSuccess, failed: loadTaskListFail } =
  makeCommunicationActionCreators<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
    'TASK_LIST:LOAD', 'TASK_LIST:LOAD_SUCCESS', 'TASK_LIST:LOAD_FAIL',
  );

export const { execute: updateTaskList, completed: updateTaskListSuccess, failed: updateTaskListFail } =
  makeCommunicationActionCreators<NS.IUpdateTaskList, NS.IUpdateTaskListSuccess, NS.IUpdateTaskListFail>(
    'TASK_LIST:UPDATE', 'TASK_LIST:UPDATE_SUCCESS', 'TASK_LIST:UPDATE_FAIL',
  );

export const { execute: createTaskList, completed: createTaskListSuccess, failed: createTaskListFail } =
  makeCommunicationActionCreators<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
    'TASK_LIST:CREATE', 'TASK_LIST:CREATE_SUCCESS', 'TASK_LIST:CREATE_FAIL',
  );

export const { execute: deleteTaskList, completed: deleteTaskListSuccess, failed: deleteTaskListFail } =
  makeCommunicationActionCreators<NS.IDeleteTaskList, NS.IDeleteTaskListSuccess, NS.IDeleteTaskListFail>(
    'TASK_LIST:DELETE', 'TASK_LIST:DELETE_SUCCESS', 'TASK_LIST:DELETE_FAIL',
  );
