import { ITaskResponse } from 'modules/App/redux/namespace';

export interface ITask {
  id: string;
  kind: 'tasks#taskList';
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  position: string;
  status: 'needsAction' | 'completed';
}

export interface IUpdateTaskStatus {
  type: 'CRUD_TASK:UPDATE_STATUS';
  payload: { taskListId: string; taskId: string; isCompleted: boolean; };
}

export interface IUpdateTaskStatusSuccess {
  type: 'CRUD_TASK:UPDATE_STATUS_SUCCESS';
  payload: { id: string, data: ITaskResponse };
}

export interface IUpdateTaskStatusFail {
  type: 'CRUD_TASK:UPDATE_STATUS_FAIL';
  error: string;
}

export interface IUpdateTask {
  type: 'CRUD_TASK:UPDATE';
  payload: { taskListId: string; taskId: string; text: string; };
}

export interface IUpdateTaskSuccess {
  type: 'CRUD_TASK:UPDATE_SUCCESS';
  payload: { id: string, data: ITaskResponse };
}

export interface IUpdateTaskFail {
  type: 'CRUD_TASK:UPDATE_FAIL';
  error: string;
}

export interface ICreateTask {
  type: 'CRUD_TASK:CREATE';
  payload: { taskListId: string; text: string; };
}

export interface ICreateTaskSuccess {
  type: 'CRUD_TASK:CREATE_SUCCESS';
  payload: ITaskResponse;
}

export interface ICreateTaskFail {
  type: 'CRUD_TASK:CREATE_FAIL';
  error: string;
}

export interface IDeleteTask {
  type: 'CRUD_TASK:DELETE';
  payload: { taskListId: string; taskId: string; };
}

export interface IDeleteTaskSuccess {
  type: 'CRUD_TASK:DELETE_SUCCESS';
  payload: { id: string, data: ITaskResponse };
}

export interface IDeleteTaskFail {
  type: 'CRUD_TASK:DELETE_FAIL';
  error: string;
}

export type Action = IUpdateTaskStatus | IUpdateTaskStatusSuccess | IUpdateTaskStatusFail |
  IUpdateTask | IUpdateTaskSuccess | IUpdateTaskFail |
  ICreateTask | ICreateTaskSuccess | ICreateTaskFail |
  IDeleteTask | IDeleteTaskSuccess | IDeleteTaskFail;
