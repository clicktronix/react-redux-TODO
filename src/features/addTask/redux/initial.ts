import { IReduxState } from '../namespace';

export const initial: IReduxState = {
  data: {
    id: '',
    kind: 'tasks#taskList',
    etag: '',
    title: '',
    updated: '',
    selfLink: '',
    position: '',
    status: 'needsAction',
  },
  communication: {
    taskCreating: {
      error: '',
      isRequesting: false,
    },
  },
};
