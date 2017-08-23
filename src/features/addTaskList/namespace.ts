import { ITaskList } from 'services/api/types/responses';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: ITaskList;
  communication: {
    taskListCreating: ICommunicationState;
  };
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

export type Action =
  ICreateTaskList | ICreateTaskListSuccess | ICreateTaskListFail;
