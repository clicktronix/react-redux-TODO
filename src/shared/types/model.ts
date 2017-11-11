export interface IGoogleTaskListsResponse {
  etag: string;
  kind: string;
  items: ITaskList[];
}

export interface IGoogleTasksResponse {
  etag: string;
  kind: string;
  items: ITask[];
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
