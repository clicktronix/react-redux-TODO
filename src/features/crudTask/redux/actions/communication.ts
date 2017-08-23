import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from 'features/crudTask/namespace';

export const { execute: updateTaskStatus, completed: updateTaskStatusSuccess, failed: updateTaskStatusFail } =
  makeCommunicationActionCreators<NS.IUpdateTaskStatus, NS.IUpdateTaskStatusSuccess, NS.IUpdateTaskStatusFail>(
    'CRUD_TASK:UPDATE_STATUS', 'CRUD_TASK:UPDATE_STATUS_SUCCESS', 'CRUD_TASK:UPDATE_STATUS_FAIL',
  );

export const { execute: updateTask, completed: updateTaskSuccess, failed: updateTaskFail } =
  makeCommunicationActionCreators<NS.IUpdateTask, NS.IUpdateTaskSuccess, NS.IUpdateTaskFail>(
    'CRUD_TASK:UPDATE', 'CRUD_TASK:UPDATE_SUCCESS', 'CRUD_TASK:UPDATE_FAIL',
  );

export const { execute: deleteTask, completed: deleteTaskSuccess, failed: deleteTaskFail } =
  makeCommunicationActionCreators<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
    'CRUD_TASK:DELETE', 'CRUD_TASK:DELETE_SUCCESS', 'CRUD_TASK:DELETE_FAIL',
  );
