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
    taskListCreating: {
      error: '',
      isRequesting: false,
    },
  },
};
