import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: updateTaskStatus, completed: updateTaskStatusSuccess, failed: updateTaskStatusFail } =
  makeCommunicationActionCreators<NS.IUpdateTaskStatus, NS.IUpdateTaskStatusSuccess, NS.IUpdateTaskStatusFail>(
    'TASK:UPDATE_STATUS', 'TASK:UPDATE_STATUS_SUCCESS', 'TASK:UPDATE_STATUS_FAIL',
  );

export const { execute: updateTask, completed: updateTaskSuccess, failed: updateTaskFail } =
  makeCommunicationActionCreators<NS.IUpdateTask, NS.IUpdateTaskSuccess, NS.IUpdateTaskFail>(
    'TASK:UPDATE', 'TASK:UPDATE_SUCCESS', 'TASK:UPDATE_FAIL',
  );

export const { execute: deleteTask, completed: deleteTaskSuccess, failed: deleteTaskFail } =
  makeCommunicationActionCreators<NS.IDeleteTask, NS.IDeleteTaskSuccess, NS.IDeleteTaskFail>(
    'TASK:DELETE', 'TASK:DELETE_SUCCESS', 'TASK:DELETE_FAIL',
  );
