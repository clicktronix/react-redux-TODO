export interface IGoogleTasksResponse extends IGoogleTasksResponseResult {
  result: IGoogleTasksResponseResult;
}

export interface ITaskResponse {
  kind: 'tasks#task';
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent: string;
  position: string;
  notes: string;
  status: 'needsAction' | 'completed';
  due: string;
  completed: string;
  deleted: boolean;
  hidden: boolean;
  links: ITaskLink[];
}

export interface ITaskLink {
  type: string;
  description: string;
  link: string;
}

export interface IGoogleTasksResponseResult {
  etag: string;
  kind: string;
  items: ITaskList[];
}

export interface ITaskList {
  id: string;
  kind: 'tasks#taskList';
  title: string;
  updated: string;
  selfLink: string;
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
