import { ITaskList, ITask } from 'shared/types/model';
import { ICommunicationState } from 'shared/helpers/redux';

export interface IReduxState {
  data: {
    taskLists: ITaskList[];
  };
  communication: {
    taskListsLoading: ICommunicationState;
    taskListUpdating: ICommunicationState;
    taskListDeleting: ICommunicationState;
    taskListCreating: ICommunicationState;
  };
}

export interface ILoadTaskList {
  type: 'TASK_MANAGER:LOAD_TASK_LIST';
}

export interface ILoadTaskListSuccess {
  type: 'TASK_MANAGER:LOAD_TASK_LIST_SUCCESS';
  payload: ITaskList[];
}

export interface ILoadTaskListFail {
  type: 'TASK_MANAGER:LOAD_TASK_LIST_FAIL';
  error: string;
}

export interface IUpdateTaskList {
  type: 'TASK_MANAGER:UPDATE_TASK_LIST';
  payload: { taskListId: string; title: string; };
}

export interface IUpdateTaskListSuccess {
  type: 'TASK_MANAGER:UPDATE_TASK_LIST_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IUpdateTaskListFail {
  type: 'TASK_MANAGER:UPDATE_TASK_LIST_FAIL';
  error: string;
}

export interface IDeleteTaskList {
  type: 'TASK_MANAGER:DELETE_TASK_LIST';
  payload: string;
}

export interface IDeleteTaskListSuccess {
  type: 'TASK_MANAGER:DELETE_TASK_LIST_SUCCESS';
  payload: { id: string, data: ITaskList };
}

export interface IDeleteTaskListFail {
  type: 'TASK_MANAGER:DELETE_TASK_LIST_FAIL';
  error: string;
}

export interface ICreateTaskList {
  type: 'TASK_MANAGER:CREATE_TASK_LIST';
  payload: { title: string; };
}

export interface ICreateTaskListSuccess {
  type: 'TASK_MANAGER:CREATE_TASK_LIST_SUCCESS';
  payload: ITaskList;
}

export interface ICreateTaskListFail {
  type: 'TASK_MANAGER:CREATE_TASK_LIST_FAIL';
  error: string;
}

export type Action =
  ILoadTaskList | ILoadTaskListSuccess | ILoadTaskListFail |
  IUpdateTaskList | IUpdateTaskListSuccess | IUpdateTaskListFail |
  IDeleteTaskList | IDeleteTaskListSuccess | IDeleteTaskListFail |
  ICreateTaskList | ICreateTaskListSuccess | ICreateTaskListFail;
