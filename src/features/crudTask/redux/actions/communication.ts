import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from 'features/crudTask/namespace';

export const { execute: loadTasks, completed: loadTasksSuccess, failed: loadTasksFail } =
  makeCommunicationActionCreators<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
    'CRUD_TASK:LOAD', 'CRUD_TASK:LOAD_SUCCESS', 'CRUD_TASK:LOAD_FAIL',
  );

export const { execute: updateTaskStatus, completed: updateTaskStatusSuccess, failed: updateTaskStatusFail } =
  makeCommunicationActionCreators<NS.IUpdateTaskStatus, NS.IUpdateTaskStatusSuccess, NS.IUpdateTaskStatusFail>(
    'CRUD_TASK:UPDATE_STATUS', 'CRUD_TASK:UPDATE_STATUS_SUCCESS', 'CRUD_TASK:UPDATE_STATUS_FAIL',
  );

export const { execute: updateTask, completed: updateTaskSuccess, failed: updateTaskFail } =
  makeCommunicationActionCreators<NS.IUpdateTask, NS.IUpdateTaskSuccess, NS.IUpdateTaskFail>(
    'CRUD_TASK:UPDATE', 'CRUD_TASK:UPDATE_SUCCESS', 'CRUD_TASK:UPDATE_FAIL',
  );

export const { execute: createTask, completed: createTaskSuccess, failed: createTaskFail } =
  makeCommunicationActionCreators<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
    'CRUD_TASK:CREATE', 'CRUD_TASK:CREATE_SUCCESS', 'CRUD_TASK:CREATE_FAIL',
  );

export const { execute: deleteTask, completed: deleteTaskSuccess, failed: deleteTaskFail } =
  makeCommunicationActionCreators<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
    'CRUD_TASK:DELETE', 'CRUD_TASK:DELETE_SUCCESS', 'CRUD_TASK:DELETE_FAIL',
  );
