import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: createTaskList, completed: createTaskListSuccess, failed: createTaskListFail } =
  makeCommunicationActionCreators<NS.ICreateTaskList, NS.ICreateTaskListSuccess, NS.ICreateTaskListFail>(
    'TASK_LIST:CREATE', 'TASK_LIST:CREATE_SUCCESS', 'TASK_LIST:CREATE_FAIL',
  );
