import { ITaskList } from 'services/api/types/responses';
import { ICommunicationState } from 'shared/helpers/redux';
import { ITask } from 'services/api/types';

export interface IReduxState {
  data: {
    taskLists: ITaskList[];
    tasks: ITask[];
  };
  communication: {
    taskListsLoading: ICommunicationState;
    tasksLoading: ICommunicationState;
  };
}

export interface ILoadTaskList {
  type: 'TASK_LIST:LOAD';
  payload: string;
}

export interface ILoadTaskListSuccess {
  type: 'TASK_LIST:LOAD_SUCCESS';
  payload: ITaskList[];
}

export interface ILoadTaskListFail {
  type: 'TASK_LIST:LOAD_FAIL';
  error: string;
}

export interface ILoadTasks {
  type: 'CRUD_TASK:LOAD';
  payload: string;
}

export interface ILoadTasksSuccess {
  type: 'CRUD_TASK:LOAD_SUCCESS';
  payload: ITask[];
}

export interface ILoadTasksFail {
  type: 'CRUD_TASK:LOAD_FAIL';
  error: string;
}

export type Action =
  ILoadTaskList | ILoadTaskListSuccess | ILoadTaskListFail |
  ILoadTasks | ILoadTasksSuccess | ILoadTasksFail;
