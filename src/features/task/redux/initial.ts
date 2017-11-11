import { IReduxState } from 'features/crudTask/namespace';

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
    taskUpdating: {
      error: '',
      isRequesting: false,
    },
    taskStatusUpdating: {
      error: '',
      isRequesting: false,
    },
    taskDeleting: {
      error: '',
      isRequesting: false,
    },
  },
};
