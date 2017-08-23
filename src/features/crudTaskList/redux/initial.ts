import { IReduxState } from '../namespace';

export const initial: IReduxState = {
  data: {
    id: '',
    kind: 'tasks#taskList',
    title: '',
    updated: '',
    selfLink: '',
  },
  communication: {
    taskListUpdating: {
      error: '',
      isRequesting: false,
    },
    taskListDeleting: {
      error: '',
      isRequesting: false,
    },
  },
};
