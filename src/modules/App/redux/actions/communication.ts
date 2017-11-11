import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: loadTaskLists, completed: loadTaskListsSuccess, failed: loadTaskListsFail } =
  makeCommunicationActionCreators<NS.ILoadTaskList, NS.ILoadTaskListSuccess, NS.ILoadTaskListFail>(
    'TASK_MANAGER:LOAD_TASK_LIST', 'TASK_MANAGER:LOAD_TASK_LIST_SUCCESS', 'TASK_MANAGER:LOAD_TASK_LIST_FAIL',
  );

export const { execute: updateTaskList, completed: updateTaskListSuccess, failed: updateTaskListFail } =
  makeCommunicationActionCreators<NS.IUpdateTaskList, NS.IUpdateTaskListSuccess, NS.IUpdateTaskListFail>(
    'TASK_MANAGER:UPDATE_TASK_LIST', 'TASK_MANAGER:UPDATE_TASK_LIST_SUCCESS', 'TASK_MANAGER:UPDATE_TASK_LIST_FAIL',
  );

export const { execute: deleteTaskList, completed: deleteTaskListSuccess, failed: deleteTaskListFail } =
  makeCommunicationActionCreators<NS.IDeleteTaskList, NS.IDeleteTaskListSuccess, NS.IDeleteTaskListFail>(
    'TASK_MANAGER:DELETE_TASK_LIST', 'TASK_MANAGER:DELETE_TASK_LIST_SUCCESS', 'TASK_MANAGER:DELETE_TASK_LIST_FAIL',
  );

export const { execute: createTaskList, completed: createTaskListSuccess, failed: createTaskListFail } =
  makeCommunicationActionCreators<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
    'TASK_MANAGER:CREATE_TASK_LIST', 'TASK_MANAGER:CREATE_TASK_LIST_SUCCESS', 'TASK_MANAGER:CREATE_TASK_LIST_FAIL',
  );
