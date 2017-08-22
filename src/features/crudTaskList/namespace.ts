import { ITaskList } from 'services/api/types/responses';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: {
    taskLists: ITaskList[];
  };
  communication: {
    taskListUpdating: ICommunicationState;
    taskListCreating: ICommunicationState;
    taskListDeleting: ICommunicationState;
  };
}

export interface IUpdateTaskList {
  type: 'TASK_LIST:UPDATE';
  payload: { taskListId: string; title: string; };
}

export interface IUpdateTaskListSuccess {
  type: 'TASK_LIST:UPDATE_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IUpdateTaskListFail {
  type: 'TASK_LIST:UPDATE_FAIL';
  error: string;
}

export interface ICreateTaskList {
  type: 'TASK_LIST:CREATE';
  payload: { title: string; };
}

export interface ICreateTaskListSuccess {
  type: 'TASK_LIST:CREATE_SUCCESS';
  payload: ITaskList;
}

export interface ICreateTaskListFail {
  type: 'TASK_LIST:CREATE_FAIL';
  error: string;
}

export interface IDeleteTaskList {
  type: 'TASK_LIST:DELETE';
  payload: string;
}

export interface IDeleteTaskListSuccess {
  type: 'TASK_LIST:DELETE_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IDeleteTaskListFail {
  type: 'TASK_LIST:DELETE_FAIL';
  error: string;
}

export type Action =
  IUpdateTaskList | IUpdateTaskListSuccess | IUpdateTaskListFail |
  ICreateTaskList | ICreateTaskListSuccess | ICreateTaskListFail |
  IDeleteTaskList | IDeleteTaskListSuccess | IDeleteTaskListFail;