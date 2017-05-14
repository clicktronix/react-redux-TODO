import { bind } from 'decko';

const CLIENT_ID = '922886431765-q1c7vvs5u4g9ehq80l1vsj5g1kvl62op.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

export interface IApi {
  handleClientLoad(): void;
  initClient(): void;
  authorize(params: any): void;
  getTaskLists(): void;
}

function updateSigninStatus(isSignedIn: boolean) {
  if (isSignedIn) {
    this.listTaskLists();
  }
}

class Api {
  public handleClientLoad() {
    gapi.load('client:auth2', this.initClient);
  }

  public initClient() {
    gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      (gapi as any).auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
      updateSigninStatus((gapi as any).auth2.getAuthInstance().isSignedIn.get());
    });
  }

  public authorize(params: any) {
    return new Promise((resolve, reject) => {
      (gapi as any).auth2.authorize(
        {
          client_id: CLIENT_ID,
          immediate: params.immediate,
          scope: SCOPES,
        },
        (authResult: any) => {
          if (authResult.error) {
            return reject(authResult.error);
          }
          return gapi.client.load('tasks', 'v1', () => resolve());
        },
      );
    });
  }

  public getTaskLists() {
    const request = (gapi as any).client.tasks.tasklists.list();

    return new Promise((resolve, reject) => {
      request.execute((resp: any) => resolve(resp));
    });
  }
}

export default Api;
