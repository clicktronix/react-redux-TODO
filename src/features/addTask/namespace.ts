import { ITask } from 'services/api/types';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: ITask;
  communication: {
    taskCreating: ICommunicationState;
  };
}

export interface ICreateTask {
  type: 'CRUD_TASK:CREATE';
  payload: { taskListId: string; text: string; };
}

export interface ICreateTaskSuccess {
  type: 'CRUD_TASK:CREATE_SUCCESS';
  payload: ITask;
}

export interface ICreateTaskFail {
  type: 'CRUD_TASK:CREATE_FAIL';
  error: string;
}

export type Action =
  ICreateTask | ICreateTaskSuccess | ICreateTaskFail;
