export interface IGoogleTasksResponse extends IGoogleTasksResponseResult {
  result: IGoogleTasksResponseResult;
}

export interface IGoogleTasksResponseResult {
  etag: string;
  kind: string;
  items: ITasksList[];
}

export interface ITasksList {
  id: string;
  kind: string;
  title: string;
  updated: string;
  selfLink: string;
}