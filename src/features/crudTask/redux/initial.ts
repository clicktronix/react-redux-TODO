import { IReduxState } from 'features/crudTask/namespace';

export const initial: IReduxState = {
  data: {
    tasks: [],
  },
  communication: {
    tasksLoading: {
      error: '',
      isRequesting: false,
    },
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
    taskCreating: {
      error: '',
      isRequesting: false,
    },
  },
};
