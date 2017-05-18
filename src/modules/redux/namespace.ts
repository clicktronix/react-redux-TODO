export interface IGoogleTasksResponse extends IGoogleTasksResponseResult {
  result: IGoogleTasksResponseResult;
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

export interface ITasks {
  kind: 'tasks#task';
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
  parent: string;
  position: string;
  notes: string;
  status: string;
  due: string;
  completed: string;
  deleted: boolean;
  hidden: boolean;
  links: ITasksLinks[];
}

export interface ITasksLinks {
  type: string;
  description: string;
  link: string;
}
