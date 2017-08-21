export interface IGoogleTasksResponse extends IGoogleTasksResponseResult {
  result: IGoogleTasksResponseResult;
}

export interface IGoogleTasksResponseResult {
  etag: string;
  kind: string;
  items: ITaskList[];
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

export interface ITaskList {
  id: string;
  kind: 'tasks#taskList';
  title: string;
  updated: string;
  selfLink: string;
}

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
