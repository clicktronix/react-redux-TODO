import { ITask } from 'shared/types/model';
import { ICommunicationState } from 'shared/helpers/redux';
import { IMultiAction } from 'shared/helpers/redux/multiConnect';

export interface IReduxState {
  data: ITask;
  communication: {
    taskUpdating: ICommunicationState;
    taskStatusUpdating: ICommunicationState;
    taskDeleting: ICommunicationState;
  };
}

export interface IUpdateTaskStatus extends IMultiAction {
  type: 'TASK:UPDATE_STATUS';
  payload: { taskListId: string; taskId: string; isCompleted: boolean; };
}

export interface IUpdateTaskStatusSuccess extends IMultiAction {
  type: 'TASK:UPDATE_STATUS_SUCCESS';
  payload: { id: string, data: ITask };
}

export interface IUpdateTaskStatusFail extends IMultiAction {
  type: 'TASK:UPDATE_STATUS_FAIL';
  error: string;
}

export interface IUpdateTask extends IMultiAction  {
  type: 'TASK:UPDATE';
  payload: { taskListId: string; taskId: string; text: string; };
}

export interface IUpdateTaskSuccess extends IMultiAction {
  type: 'TASK:UPDATE_SUCCESS';
  payload: { id: string, data: ITask };
}

export interface IUpdateTaskFail extends IMultiAction {
  type: 'TASK:UPDATE_FAIL';
  error: string;
}

export interface IDeleteTask extends IMultiAction {
  type: 'TASK:DELETE';
  payload: { taskListId: string; taskId: string; };
}

export interface IDeleteTaskSuccess extends IMultiAction {
  type: 'TASK:DELETE_SUCCESS';
  payload: { id: string, data: ITask };
}

export interface IDeleteTaskFail extends IMultiAction {
  type: 'TASK:DELETE_FAIL';
  error: string;
}

export type Action =
  IUpdateTaskStatus | IUpdateTaskStatusSuccess | IUpdateTaskStatusFail |
  IUpdateTask | IUpdateTaskSuccess | IUpdateTaskFail |
  IDeleteTask | IDeleteTaskSuccess | IDeleteTaskFail;
