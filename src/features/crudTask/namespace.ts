import { ITask, ITaskResponse } from 'services/api/types';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: {
    tasks: ITask[];
  };
  communication: {
    tasksLoading: ICommunicationState;
    taskUpdating: ICommunicationState;
    taskStatusUpdating: ICommunicationState;
    taskCreating: ICommunicationState;
    taskDeleting: ICommunicationState;
  };
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

export interface IUpdateTaskStatus {
  type: 'CRUD_TASK:UPDATE_STATUS';
  payload: { taskListId: string; taskId: string; isCompleted: boolean; };
}

export interface IUpdateTaskStatusSuccess {
  type: 'CRUD_TASK:UPDATE_STATUS_SUCCESS';
  payload: { id: string, data: ITask };
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
  payload: { id: string, data: ITask };
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
  payload: ITask;
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
  payload: { id: string, data: ITask };
}

export interface IDeleteTaskFail {
  type: 'CRUD_TASK:DELETE_FAIL';
  error: string;
}

export type Action =
  ILoadTasks | ILoadTasksSuccess | ILoadTasksFail |
  IUpdateTaskStatus | IUpdateTaskStatusSuccess | IUpdateTaskStatusFail |
  IUpdateTask | IUpdateTaskSuccess | IUpdateTaskFail |
  ICreateTask | ICreateTaskSuccess | ICreateTaskFail |
  IDeleteTask | IDeleteTaskSuccess | IDeleteTaskFail;
