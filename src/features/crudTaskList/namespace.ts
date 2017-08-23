import { ITaskList } from 'services/api/types/responses';
import { ICommunicationState } from 'shared/helpers/redux';
import { IMultiAction } from 'shared/helpers/redux/multiConnect';

export interface IReduxState {
  data: ITaskList;
  communication: {
    taskListUpdating: ICommunicationState;
    taskListDeleting: ICommunicationState;
  };
}

export interface IUpdateTaskList extends IMultiAction {
  type: 'TASK_LIST:UPDATE';
  payload: { taskListId: string; title: string; };
}

export interface IUpdateTaskListSuccess extends IMultiAction {
  type: 'TASK_LIST:UPDATE_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IUpdateTaskListFail extends IMultiAction {
  type: 'TASK_LIST:UPDATE_FAIL';
  error: string;
}

export interface IDeleteTaskList extends IMultiAction {
  type: 'TASK_LIST:DELETE';
  payload: string;
}

export interface IDeleteTaskListSuccess extends IMultiAction {
  type: 'TASK_LIST:DELETE_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IDeleteTaskListFail extends IMultiAction {
  type: 'TASK_LIST:DELETE_FAIL';
  error: string;
}

export type Action =
  IUpdateTaskList | IUpdateTaskListSuccess | IUpdateTaskListFail |
  IDeleteTaskList | IDeleteTaskListSuccess | IDeleteTaskListFail;
