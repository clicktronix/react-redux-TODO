import { IReduxState } from 'modules/App/namespace';

export const initial: IReduxState = {
  data: {
    // taskLists: {
    //   id: '',
    //   kind: 'tasks#taskList',
    //   title: '',
    //   updated: '',
    //   selfLink: '',
    // },
    // tasks: {
    //   id: '',
    //   kind: 'tasks#taskList',
    //   etag: '',
    //   title: '',
    //   updated: '',
    //   selfLink: '',
    //   position: '',
    //   status: 'needsAction',
    // },
    taskLists: [],
    tasks: [],
  },
  communication: {
    taskListsLoading: {
      error: '',
      isRequesting: false,
    },
    tasksLoading: {
      error: '',
      isRequesting: false,
    },
  },
};
