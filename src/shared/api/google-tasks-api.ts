import { bind } from 'decko';
import { ITaskList, ITaskResponse } from 'modules/redux/namespace';

const CLIENT_ID = '922886431765-q1c7vvs5u4g9ehq80l1vsj5g1kvl62op.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

class Api {
  public handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  public initClient() {
    (gapi as any).client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    });
  }

  public authorize(params: { immediate: boolean; }) {
    const authInstance = new Promise((resolve, reject) => {
      resolve((gapi as any).auth2.getAuthInstance().signIn());
    });
    return authInstance.then(
      (result) => {
        return gapi.client.load('tasks', 'v1');
      },
      (error) => {
        return error;
      });
  }

  public signOut() {
    (gapi as any).auth2.getAuthInstance().signOut();
  }

  public getTaskLists() {
    const request = (gapi as any).client.tasks.tasklists.list();

    return new Promise((resolve, reject) => {
      request.execute((resp: ITaskList[]) => resolve(resp));
    });
  }

  public insertTaskList({ title }: { title: string; }) {
    const request = (gapi as any).client.tasks.tasklists.insert({
      title,
    });

    return new Promise((resolve, reject) => {
        request.execute((resp: ITaskList) => resolve(resp));
    });
  }

  public deleteTaskList(taskListId: string) {
    const request = (gapi as any).client.tasks.tasklists.delete({
      tasklist: taskListId,
    });

    return new Promise((resolve, reject) => {
        request.execute((resp: ITaskList) => resolve(resp));
    });
  }

  public updateTaskList({ taskListId, title }: { taskListId: string; title: string; }) {
    const request = (gapi as any).client.tasks.tasklists.update({
      tasklist: taskListId,
      id: taskListId,
      title,
    });

    return new Promise((resolve, reject) => {
        request.execute((resp: ITaskList) => resolve(resp));
    });
  }

  public getTasksList(taskListId: string) {
    const request = (gapi as any).client.tasks.tasks.list({
        tasklist: taskListId,
    });

    return new Promise((resolve, reject) => {
        request.execute((resp: ITaskResponse[]) => resolve(resp));
    });
  }

  public insertTask({ taskListId, title }: { taskListId: string; title: string; }) {
    const request = (gapi as any).client.tasks.tasks.insert({
      tasklist: taskListId,
      title,
    });

    return new Promise((resolve, reject) => {
      request.execute((resp: ITaskResponse) => resolve(resp));
    });
  }

  public deleteTask({ taskListId, taskId }: { taskListId: string; taskId: string; }) {
    const request = (gapi as any).client.tasks.tasks.delete({
      tasklist: taskListId,
      task: taskId,
    });

    return new Promise((resolve, reject) => {
      request.execute((resp: ITaskResponse) => resolve(resp));
    });
  }

  public updateTask({ taskListId, taskId, ...params }: any) {
    const request = (gapi as any).client.tasks.tasks.update({
      tasklist: taskListId,
      task: taskId,
      id: taskId,
      ...params,
    });

    return new Promise((resolve, reject) => {
      request.execute((resp: ITaskResponse) => resolve(resp));
    });
  }
}

export default Api;
