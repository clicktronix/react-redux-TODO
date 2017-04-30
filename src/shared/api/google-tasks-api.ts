const CLIENT_ID = '922886431765-q1c7vvs5u4g9ehq80l1vsj5g1kvl62op.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

export interface IApi {
  handleClientLoad(): void;
  initClient(): void;
  authorize(params: any): void;
  updateSigninStatus(isSignedIn: boolean): void;
  handleAuthClick(event: Event): void;
  handleAuthClick(event: Event): void;
  appendPre(message: string): void;
  listTaskLists(): void;
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
      (gapi as any).auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSigninStatus((gapi as any).auth2.getAuthInstance().isSignedIn.get());
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

  public updateSigninStatus = (isSignedIn: boolean) => {
    if (isSignedIn) {
      this.listTaskLists();
    }
  }

  public handleAuthClick(event: Event) {
    (gapi as any).auth2.getAuthInstance().signIn();
  }

  public handleSignoutClick(event: Event) {
    (gapi as any).auth2.getAuthInstance().signOut();
  }

  public appendPre(message: string) {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    if (pre) {
      pre.appendChild(textContent);
    }
  }

  public listTaskLists() {
    (gapi as any).client.tasks.tasklists.list({
        maxResults: 10,
    }).then((response: any) => {
      this.appendPre('Task Lists:');
      const taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < taskLists.length; i++) {
          const taskList = taskLists[i];
          this.appendPre(taskList.title + ' (' + taskList.id + ')');
        }
      } else {
        this.appendPre('No task lists found.');
      }
    });
  }
}

export default Api;