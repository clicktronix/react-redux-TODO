import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: createTask, completed: createTaskSuccess, failed: createTaskFail } =
  makeCommunicationActionCreators<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
    'CRUD_TASK:CREATE', 'CRUD_TASK:CREATE_SUCCESS', 'CRUD_TASK:CREATE_FAIL',
  );
