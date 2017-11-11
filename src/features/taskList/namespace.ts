import { ITask } from 'shared/types/model';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: {
    tasks: ITask[];
  };
  communication: {
    taskCreating: ICommunicationState;
    tasksLoading: ICommunicationState;
  };
}

export interface ILoadTasks {
  type: 'TASK_LIST:LOAD_TASKS';
  payload: string;
}

export interface ILoadTasksSuccess {
  type: 'TASK_LIST:LOAD_TASKS_SUCCESS';
  payload: ITask[];
}

export interface ILoadTasksFail {
  type: 'TASK_LIST:LOAD_TASKS_FAIL';
  error: string;
}

export interface ICreateTask {
  type: 'TASK_LIST:CREATE_TASK';
  payload: { taskListId: string; text: string; };
}

export interface ICreateTaskSuccess {
  type: 'TASK_LIST:CREATE_TASK_SUCCESS';
  payload: ITask;
}

export interface ICreateTaskFail {
  type: 'TASK_LIST:CREATE_TASK_FAIL';
  error: string;
}

export type Action =
  ICreateTask | ICreateTaskSuccess | ICreateTaskFail |
  ILoadTasks | ILoadTasksSuccess | ILoadTasksFail;
