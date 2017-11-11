import { IReduxState } from '../namespace';

export const initial: IReduxState = {
  data: {
    tasks: [],
  },
  communication: {
    taskCreating: {
      error: '',
      isRequesting: false,
    },
    tasksLoading: {
      error: '',
      isRequesting: false,
    },
  },
};
