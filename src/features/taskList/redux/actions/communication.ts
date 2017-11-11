import { makeCommunicationActionCreators } from 'shared/helpers/redux';
import * as NS from '../../namespace';

export const { execute: createTask, completed: createTaskSuccess, failed: createTaskFail } =
  makeCommunicationActionCreators<NS.ICreateTask, NS.ICreateTaskSuccess, NS.ICreateTaskFail>(
    'TASK_LIST:CREATE_TASK', 'TASK_LIST:CREATE_TASK_SUCCESS', 'TASK_LIST:CREATE_TASK_FAIL',
  );

export const { execute: loadTasks, completed: loadTasksSuccess, failed: loadTasksFail } =
  makeCommunicationActionCreators<NS.ILoadTasks, NS.ILoadTasksSuccess, NS.ILoadTasksFail>(
    'TASK_LIST:LOAD_TASKS', 'TASK_LIST:LOAD_TASKS_SUCCESS', 'TASK_LIST:LOAD_TASKS_FAIL',
  );
