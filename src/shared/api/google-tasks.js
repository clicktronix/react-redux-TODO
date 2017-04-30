const CLIENT_ID = '922886431765-q1c7vvs5u4g9ehq80l1vsj5g1kvl62op.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/tasks';
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/tasks/v1/rest'];

class Api {
  handleClientLoad() {
    debugger;
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init({
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    }).then(() => {
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    });
  }

  authorize(params) {
    return new Promise((resolve, reject) => {
      gapi.auth2.authorize(
        {
          client_id: CLIENT_ID,
          immediate: params.immediate,
          scope: SCOPES,
        },
        (authResult) => {
          if (authResult.error) {
            return reject(authResult.error);
          }
          return gapi.client.load('tasks', 'v1', () => gapi.client.load('plus', 'v1', () => resolve()));
        },
      );
    });
  }

  updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      this.listTaskLists();
    }
  }

  handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
  }

  appendPre(message) {
    const pre = document.getElementById('content');
    const textContent = document.createTextNode(message + '\n');
    if (pre) {
      pre.appendChild(textContent);
    }
  }

  listTaskLists() {
    gapi.client.tasks.tasklists.list({
        maxResults: 10,
    }).then((response) => {
      this.appendPre('Task Lists:');
      const taskLists = response.result.items;
      if (taskLists && taskLists.length > 0) {
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
